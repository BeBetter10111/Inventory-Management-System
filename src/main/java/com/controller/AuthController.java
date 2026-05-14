package com.controller;

import com.dto.request.LoginRequest;
import com.dto.request.RegisterRequest;
import com.dto.response.ApiResponse;
import com.service.UserService;
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
        return ResponseEntity.ok(new ApiResponse("User registered successfully", userService.register(request)));
    }
}