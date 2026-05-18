package com.service;

import com.dto.request.LoginRequest;
import com.dto.request.RegisterRequest;
import com.entity.User;
import com.entity.enums.RoleType;
import com.entity.enums.StatusType;
import com.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public User register(RegisterRequest request) {
        User user = new User();
        user.setUserId(java.util.UUID.randomUUID().toString());
        user.setUsername(request.getUsername());
        user.setPassword(request.getPassword());
        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());
        user.setPhoneNumber(request.getPhoneNumber());
        user.setRoleType(RoleType.User);
        user.setStatusType(StatusType.Active);
        return userRepository.save(user);
    }

    public String authenticate(LoginRequest request) {
        return "dummy-jwt-token";
    }

    public User updateProfile(User userDetails) {
        User user = userRepository.findByUsername(userDetails.getUsername()).orElseThrow();
        user.setFullName(userDetails.getFullName());
        user.setPhoneNumber(userDetails.getPhoneNumber());
        user.setEmail(userDetails.getEmail());
        return userRepository.save(user);
    }

    public User findByUsername(String username) {
        return userRepository.findByUsername(username).orElseThrow();
    }

    public User getCurrentUser() {
        return userRepository.findAll().stream().findFirst().orElse(null);
    }
}