package iu.wadproject.ims.service;

import iu.wadproject.ims.entity.Category;
import iu.wadproject.ims.entity.enums.LogType;
import iu.wadproject.ims.repository.CategoryRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CategoryService {
    private final CategoryRepository repository;

    @Autowired
    private ActivityLogService activityLogService;

    public List<Category> getAllCategories() {
        return repository.findAll();
    }

    public Category saveCategory(Category category) {
        this.saveLog("added", category);

        return repository.save(category);
    }

    public Category getCategoryById(UUID id) {
        return repository.findById(id).orElseThrow();
    }

    public Category updateCategoryById(UUID id, Category detail) {
        Category category = this.getCategoryById(id);

        category.setCategoryName(detail.getCategoryName());
        category.setUnit(detail.getUnit());

        this.saveLog("updated", category);

        return repository.save(category);
    }    

    public void deleteCategoryById(UUID id) {
        Category category = this.getCategoryById(id);

        this.saveLog("deleted", category);

        repository.delete(category);
    }

    private void saveLog(String name, Category category) {
        activityLogService.saveLog(
            LogType.AdjustCategory,
            name + " Category \"" + category.getCategoryName() + "\""
        );
    }
}
