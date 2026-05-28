package iu.wadproject.ims.service;

import iu.wadproject.ims.dto.request.LoginRequest;
import iu.wadproject.ims.dto.request.RegisterRequest;
import iu.wadproject.ims.entity.User;
import iu.wadproject.ims.repository.UserRepository;

import lombok.RequiredArgsConstructor;

import java.security.InvalidParameterException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository repository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;

    public List<User> getAllUsers() {
        return repository.findAll();
    }

    public User saveUser(User user) {
        return repository.save(user);
    }

    public User registerUser(RegisterRequest request) {
        User user = new User();

        user.setUsername(request.getUsername());

        // IMPORTANT: Encrypt password before storing into the database!
        user.setPassword(this.encodePassword(request.getPassword()));

        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());
        user.setPhoneNumber(request.getPhoneNumber());
        user.setRoleType(request.getRoleType());

        return this.saveUser(user);
    }

    public User getUserByUsername(String username) {
        return repository.findByUsername(username).orElseThrow();
    }

    public User authenticate(LoginRequest request) {
        User user = this.getUserByUsername(request.getUsername());

        if (!isPasswordValid(request.getPassword(), user.getPassword())) {
            throw new InvalidParameterException("Invalid password");
        }

        return user;
    }

    public User updateUserByUsername(String username, User detail) {
        User user = this.getUserByUsername(username);

        user.setEmail(detail.getEmail());
        user.setFullName(detail.getFullName());
        user.setPhoneNumber(detail.getPhoneNumber());
        user.setUsername(detail.getUsername());

        return this.saveUser(user);
    }

    public User updatePasswordByUsername(String username, String rawPassword) {
        User user = this.getUserByUsername(username);

        user.setPassword(passwordEncoder.encode(rawPassword));

        return this.saveUser(user);
    }

    public User getCurrentUser() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (principal instanceof UserDetails) {
            String username = ((UserDetails) principal).getUsername();
            return this.getUserByUsername(username);
        }

        throw new InvalidParameterException("No authenticated user found");
    }

    private boolean isPasswordValid(String rawPassword, String encodedPassword) {
        return passwordEncoder.matches(rawPassword, encodedPassword);
    }

    private String encodePassword(String rawPassword) {
        return passwordEncoder.encode(rawPassword);
    }
}