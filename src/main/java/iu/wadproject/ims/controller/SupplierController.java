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
    public ResponseEntity<ApiResponse> getSupplierById(@RequestParam UUID id) {
        return ResponseEntity.ok(new ApiResponse("Success", service.getSupplierById(id)));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<ApiResponse> updateSupplierById(@RequestParam UUID id, @RequestBody Supplier detail) {
        return ResponseEntity.ok(new ApiResponse("Buyer updated successfully", service.updateSupplierById(id, detail)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteSupplier(@RequestParam UUID id) {
        service.deleteSupplierById(id);
        return ResponseEntity.ok(new ApiResponse("Buyer deleted successfully", null));
    }
}