package iu.wadproject.ims.service;

import iu.wadproject.ims.entity.Category;
import iu.wadproject.ims.repository.CategoryRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CategoryService {
    private final CategoryRepository repository;

    public List<Category> getAllCategories() {
        return repository.findAll();
    }

    public Category saveCategory(Category category) {
        return repository.save(category);
    }

    public Category getCategoryById(UUID id) {
        return repository.findById(id).orElseThrow();
    }

    public Category updateCategoryById(UUID id, Category detail) {
        Category category = this.getCategoryById(id);

        category.setCategoryName(detail.getCategoryName());
        category.setUnit(detail.getUnit());

        return this.saveCategory(category);
    }    

    public void deleteCategoryById(UUID id) {
        repository.deleteById(id);
    }
}
