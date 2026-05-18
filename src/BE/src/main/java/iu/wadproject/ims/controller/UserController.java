package iu.wadproject.ims.controller;

import iu.wadproject.ims.entity.User;
import iu.wadproject.ims.dto.response.ApiResponse;
import iu.wadproject.ims.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping("/profile")
    public ResponseEntity<ApiResponse> getProfile() {
        return ResponseEntity.ok(new ApiResponse("Success", userService.getCurrentUser()));
    }

    @PutMapping("/profile")
    public ResponseEntity<ApiResponse> updateProfile(@RequestBody User user) {
        return ResponseEntity.ok(new ApiResponse("Profile updated successfully", userService.updateProfile(user)));
    }
}