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
    public ResponseEntity<ApiResponse> getProductById(@RequestParam UUID id) {
        return ResponseEntity.ok(new ApiResponse("Success", service.getProductById(id)));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<ApiResponse> updateProductById(@RequestParam UUID id, @RequestBody Product detail) {
        return ResponseEntity.ok(new ApiResponse("Buyer updated successfully", service.updateProductById(id, detail)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteProduct(@RequestParam UUID id) {
        service.deleteProductById(id);
        return ResponseEntity.ok(new ApiResponse("Product deleted successfully", null));
    }
}