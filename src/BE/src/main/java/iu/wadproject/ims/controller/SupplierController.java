package iu.wadproject.ims.controller;

import iu.wadproject.ims.entity.Supplier;
import iu.wadproject.ims.dto.response.ApiResponse;
import iu.wadproject.ims.service.SupplierService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/suppliers")
@RequiredArgsConstructor
public class SupplierController {
    private final SupplierService supplierService;

    @GetMapping
    public ResponseEntity<ApiResponse> getAllSuppliers() {
        return ResponseEntity.ok(new ApiResponse("Success", supplierService.findAll()));
    }

    @PostMapping
    public ResponseEntity<ApiResponse> createSupplier(@RequestBody Supplier supplier) {
        return ResponseEntity.ok(new ApiResponse("Supplier created successfully", supplierService.save(supplier)));
    }
}