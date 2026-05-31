package iu.wadproject.ims.controller;

import iu.wadproject.ims.entity.Supplier;
import iu.wadproject.ims.dto.response.ApiResponse;
import iu.wadproject.ims.service.SupplierService;

import lombok.RequiredArgsConstructor;

import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/supplier")
@RequiredArgsConstructor
public class SupplierController {
    private final SupplierService service;

    @GetMapping
    public ResponseEntity<ApiResponse> getAllSuppliers() {
        return ResponseEntity.ok(new ApiResponse("Success", service.getAllSuppliers()));
    }

    @PutMapping
    public ResponseEntity<ApiResponse> saveSupplier(@RequestBody Supplier supplier) {
        return ResponseEntity.ok(new ApiResponse("Supplier saved successfully", service.saveSupplier(supplier)));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> getSupplierById(@PathVariable String id) {
        return ResponseEntity.ok(new ApiResponse("Success", service.getSupplierById(UUID.fromString(id))));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<ApiResponse> updateSupplierById(@PathVariable String id, @RequestBody Supplier detail) {
        return ResponseEntity.ok(new ApiResponse("Buyer updated successfully", service.updateSupplierById(UUID.fromString(id), detail)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteSupplier(@PathVariable String id) {
        service.deleteSupplierById(UUID.fromString(id));
        return ResponseEntity.ok(new ApiResponse("Buyer deleted successfully", null));
    }
}