package iu.wadproject.ims.controller;

import iu.wadproject.ims.entity.User;
import iu.wadproject.ims.dto.request.UpdatePasswordRequest;
import iu.wadproject.ims.dto.response.ApiResponse;
import iu.wadproject.ims.service.UserService;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {
    private final UserService service;

    @GetMapping
    public ResponseEntity<ApiResponse> getAllUsers() {
        return ResponseEntity.ok(new ApiResponse("Success", service.getAllUsers()));
    }

    @GetMapping("/{username}")
    public ResponseEntity<ApiResponse> getUserByUsername(@PathVariable String username) {
        return ResponseEntity.ok(new ApiResponse("Success", service.getUserByUsername(username)));
    }

    @PatchMapping("/{username}")
    public ResponseEntity<ApiResponse> updateUserByUsername(@PathVariable String username, @RequestBody User detail) {
        return ResponseEntity.ok(new ApiResponse("User updated successfully", service.updateUserByUsername(username, detail)));
    }

    @PatchMapping("/update-password")
    public ResponseEntity<ApiResponse> updatePasswordByUsername(@RequestBody UpdatePasswordRequest request) {
        return ResponseEntity.ok(new ApiResponse("Password updated successfully", service.updatePassword(request)));
    }
}