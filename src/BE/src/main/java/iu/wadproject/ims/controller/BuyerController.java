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
    public ResponseEntity<ApiResponse> getBuyerById(@RequestParam UUID id) {
        return ResponseEntity.ok(new ApiResponse("Success", service.getBuyerById(id)));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<ApiResponse> updateBuyerById(@RequestParam UUID id, @RequestBody Buyer detail) {
        return ResponseEntity.ok(new ApiResponse("Buyer updated successfully", service.updateBuyerById(id, detail)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteBuyer(@RequestParam UUID id) {
        service.deleteBuyerById(id);
        return ResponseEntity.ok(new ApiResponse("Buyer deleted successfully", null));
    }
}