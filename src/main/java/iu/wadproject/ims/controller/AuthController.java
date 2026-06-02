package iu.wadproject.ims.controller;

import iu.wadproject.ims.dto.request.LoginRequest;
import iu.wadproject.ims.dto.request.RegisterRequest;
import iu.wadproject.ims.dto.response.ApiResponse;
import iu.wadproject.ims.dto.response.UserResponse;
import iu.wadproject.ims.entity.enums.RoleType;
import iu.wadproject.ims.service.UserService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletRequestWrapper;
import jakarta.servlet.http.HttpServletResponse;

import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.RememberMeServices;
import org.springframework.security.web.context.SecurityContextRepository;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class AuthController {
    private final UserService userService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private SecurityContextRepository securityContextRepository;

    @Autowired
    private RememberMeServices rememberMeServices;

    @PostMapping("/login")
    public ResponseEntity<ApiResponse> login(@RequestBody LoginRequest request, HttpServletRequest httpRequest,
            HttpServletResponse httpResponse) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getUsername(),
                            request.getPassword()));

            SecurityContextHolder.getContext().setAuthentication(authentication);

            // Explicitly save the security context to the session
            securityContextRepository.saveContext(SecurityContextHolder.getContext(), httpRequest, httpResponse);

            // Wrap request parameters for RememberMeServices since it does not accept raw
            // JSON
            HttpServletRequest wrappedRequest = new HttpServletRequestWrapper(httpRequest) {
                @Override
                public String getParameter(String name) {
                    if ("rememberMe".equals(name)) {
                        return String.valueOf(request.isRememberMe());
                    }

                    return super.getParameter(name);
                }
            };

            // Generate the remember me cookie on success
            rememberMeServices.loginSuccess(wrappedRequest, httpResponse, authentication);

            UserDetails userDetails = (UserDetails) authentication.getPrincipal();

            String role = userDetails.getAuthorities()
                    .stream()
                    .map(GrantedAuthority::getAuthority)
                    .findFirst()
                    .orElse(RoleType.Staff.toString());

            UserResponse userResponse = new UserResponse(userDetails.getUsername(), role);

            return ResponseEntity.ok(new ApiResponse("Login successful", userResponse));
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ApiResponse("Invalid username or password", null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ApiResponse("User not found or authentication failed: " + e.getMessage(), null));
        }
    }

    @PostMapping("/register")
    public ResponseEntity<ApiResponse> register(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(new ApiResponse("Registration successful", userService.registerUser(request)));
    }

    @GetMapping("/logout")
    public ResponseEntity<ApiResponse> logout(HttpServletRequest request) {
        SecurityContextHolder.clearContext();

        return ResponseEntity.ok(new ApiResponse("Logout successful", null));
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        try {
            String uuid = userService.processForgotPassword(email);

            Map<String, String> response = new HashMap<>();
            response.put("message", "Mã xác minh đã được gửi qua email.");
            response.put("uuid", uuid);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }

    @GetMapping("/me")
    public ResponseEntity<ApiResponse> getCurrentUser() {
        return ResponseEntity.ok(new ApiResponse("Success", userService.getCurrentUser()));
    }
}