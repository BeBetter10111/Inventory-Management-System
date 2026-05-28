package iu.wadproject.ims.controller;

import iu.wadproject.ims.entity.Product;
import iu.wadproject.ims.dto.response.ApiResponse;
import iu.wadproject.ims.service.ProductService;

import lombok.RequiredArgsConstructor;

import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/product")
@RequiredArgsConstructor
public class ProductController {
    private final ProductService service;

    @GetMapping
    public ResponseEntity<ApiResponse> getAllProducts() {
        return ResponseEntity.ok(new ApiResponse("Success", service.getAllProducts()));
    }

    @PutMapping
    public ResponseEntity<ApiResponse> saveProduct(@RequestBody Product product) {
        return ResponseEntity.ok(new ApiResponse("Product saved successfully", service.saveProduct(product)));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> getProductById(@PathVariable String id) {
        return ResponseEntity.ok(new ApiResponse("Success", service.getProductById(UUID.fromString(id))));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<ApiResponse> updateProductById(@PathVariable String id, @RequestBody Product detail) {
        return ResponseEntity.ok(new ApiResponse("Buyer updated successfully", service.updateProductById(UUID.fromString(id), detail)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteProduct(@PathVariable String id) {
        service.deleteProductById(UUID.fromString(id));
        return ResponseEntity.ok(new ApiResponse("Product deleted successfully", null));
    }
}