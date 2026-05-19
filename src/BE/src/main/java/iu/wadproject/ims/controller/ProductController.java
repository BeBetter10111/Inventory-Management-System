package iu.wadproject.ims.controller;

import iu.wadproject.ims.entity.Product;
import iu.wadproject.ims.dto.response.ApiResponse;
import iu.wadproject.ims.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {
    private final ProductService productService;

    @GetMapping
    public ResponseEntity<ApiResponse> getAllProducts() {
        List<Product> products = productService.findAll();
        return ResponseEntity.ok(new ApiResponse("Success", products));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> getProductById(@PathVariable String id) {
        return ResponseEntity.ok(new ApiResponse("Success", productService.findById(id)));
    }

    @PostMapping
    public ResponseEntity<ApiResponse> createProduct(@RequestBody Product product) {
        return ResponseEntity.ok(new ApiResponse("Product created", productService.save(product)));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse> updateProduct(@PathVariable String id, @RequestBody Product product) {
        return ResponseEntity.ok(new ApiResponse("Product updated", productService.update(id, product)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteProduct(@PathVariable String id) {
        productService.delete(id);
        return ResponseEntity.ok(new ApiResponse("Product deleted", null));
    }
}