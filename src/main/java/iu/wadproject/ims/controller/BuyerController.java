package iu.wadproject.ims.controller;

import iu.wadproject.ims.entity.Buyer;
import iu.wadproject.ims.dto.response.ApiResponse;
import iu.wadproject.ims.service.BuyerService;

import lombok.RequiredArgsConstructor;

import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/buyer")
@RequiredArgsConstructor
public class BuyerController {
    private final BuyerService service;

    @GetMapping
    public ResponseEntity<ApiResponse> getAllBuyers() {
        return ResponseEntity.ok(new ApiResponse("Success", service.getAllBuyers()));
    }

    @PutMapping
    public ResponseEntity<ApiResponse> createBuyer(@RequestBody Buyer buyer) {
        return ResponseEntity.ok(new ApiResponse("Buyer saved successfully", service.saveBuyer(buyer)));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> getBuyerById(@RequestParam String id) {
        return ResponseEntity.ok(new ApiResponse("Success", service.getBuyerById(UUID.fromString(id))));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<ApiResponse> updateBuyerById(@RequestParam String id, @RequestBody Buyer detail) {
        return ResponseEntity.ok(new ApiResponse("Buyer updated successfully", service.updateBuyerById(UUID.fromString(id), detail)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteBuyer(@RequestParam String id) {
        service.deleteBuyerById(UUID.fromString(id));
        return ResponseEntity.ok(new ApiResponse("Buyer deleted successfully", null));
    }
}