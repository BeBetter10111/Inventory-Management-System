package iu.wadproject.ims.controller;

import iu.wadproject.ims.entity.Category;
import iu.wadproject.ims.dto.response.ApiResponse;
import iu.wadproject.ims.service.CategoryService;

import lombok.RequiredArgsConstructor;

import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/category")
@RequiredArgsConstructor
public class CategoryController {
    private final CategoryService service;

    @GetMapping
    public ResponseEntity<ApiResponse> getAllCategories() {
        return ResponseEntity.ok(new ApiResponse("Success", service.getAllCategories()));
    }

    @PutMapping
    public ResponseEntity<ApiResponse> saveCategory(@RequestBody Category category) {
        return ResponseEntity.ok(new ApiResponse("Category saved successfully", service.saveCategory(category)));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> getCategoryById(@PathVariable String id) {
        return ResponseEntity.ok(new ApiResponse("Success", service.getCategoryById(UUID.fromString(id))));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<ApiResponse> updateCategoryById(@PathVariable String id, @RequestBody Category detail) {
        return ResponseEntity.ok(new ApiResponse("Category updated successfully", service.updateCategoryById(UUID.fromString(id), detail)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteCategory(@PathVariable String id) {
        service.deleteCategoryById(UUID.fromString(id));
        return ResponseEntity.ok(new ApiResponse("Category deleted successfully", null));
    }
}