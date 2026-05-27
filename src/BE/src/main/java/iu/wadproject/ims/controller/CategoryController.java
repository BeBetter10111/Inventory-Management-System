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
    public ResponseEntity<ApiResponse> getCategoryById(@RequestParam UUID id) {
        return ResponseEntity.ok(new ApiResponse("Success", service.getCategoryById(id)));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<ApiResponse> updateCategoryById(@RequestParam UUID id, @RequestBody Category detail) {
        return ResponseEntity.ok(new ApiResponse("Category updated successfully", service.updateCategoryById(id, detail)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteCategory(@RequestParam UUID id) {
        service.deleteCategoryById(id);
        return ResponseEntity.ok(new ApiResponse("Category deleted successfully", null));
    }
}