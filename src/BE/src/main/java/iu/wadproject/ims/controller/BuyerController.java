package iu.wadproject.ims.controller;

import iu.wadproject.ims.entity.Buyer;
import iu.wadproject.ims.dto.response.ApiResponse;
import iu.wadproject.ims.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/buyers")
@RequiredArgsConstructor
public class BuyerController {
    private final UserService userService;

    @GetMapping
    public ResponseEntity<ApiResponse> getAllBuyers() {
        return ResponseEntity.ok(new ApiResponse("Success", userService.findAllBuyers()));
    }

    @PostMapping
    public ResponseEntity<ApiResponse> createBuyer(@RequestBody Buyer buyer) {
        return ResponseEntity.ok(new ApiResponse("Buyer created successfully", userService.saveBuyer(buyer)));
    }
}