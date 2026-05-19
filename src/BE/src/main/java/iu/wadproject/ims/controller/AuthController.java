package iu.wadproject.ims.controller;

import iu.wadproject.ims.dto.request.LoginRequest;
import iu.wadproject.ims.dto.request.RegisterRequest;
import iu.wadproject.ims.dto.response.ApiResponse;
import iu.wadproject.ims.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final UserService userService;

    @PostMapping("/login")
    public ResponseEntity<ApiResponse> login(@RequestBody LoginRequest request) {
        return ResponseEntity.ok(new ApiResponse("Login successful", userService.authenticate(request)));
    }

    @PostMapping("/register")
    public ResponseEntity<ApiResponse> register(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(new ApiResponse("Registration successful", userService.register(request)));
    }
}