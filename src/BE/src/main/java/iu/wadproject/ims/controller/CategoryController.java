package iu.wadproject.ims.controller;

import iu.wadproject.ims.entity.Category;
import iu.wadproject.ims.dto.response.ApiResponse;
import iu.wadproject.ims.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/categories")
@RequiredArgsConstructor
public class CategoryController {
    private final CategoryService categoryService;

    @GetMapping
    public ResponseEntity<ApiResponse> getAllCategories() {
        return ResponseEntity.ok(new ApiResponse("Success", categoryService.findAll()));
    }

    @PostMapping
    public ResponseEntity<ApiResponse> createCategory(@RequestBody Category category) {
        return ResponseEntity.ok(new ApiResponse("Category created successfully", categoryService.save(category)));
    }
}