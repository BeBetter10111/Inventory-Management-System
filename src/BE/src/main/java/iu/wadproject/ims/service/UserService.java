package iu.wadproject.ims.service;

import iu.wadproject.ims.dto.request.LoginRequest;
import iu.wadproject.ims.dto.request.RegisterRequest;
import iu.wadproject.ims.entity.User;
import iu.wadproject.ims.entity.Buyer;
import iu.wadproject.ims.entity.enums.RoleType;
import iu.wadproject.ims.entity.enums.StatusType;
import iu.wadproject.ims.repository.UserRepository;
import iu.wadproject.ims.repository.BuyerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final BuyerRepository buyerRepository;

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

    public List<Buyer> findAllBuyers() {
        return buyerRepository.findAll();
    }

    public Buyer saveBuyer(Buyer buyer) {
        return buyerRepository.save(buyer);
    }
}