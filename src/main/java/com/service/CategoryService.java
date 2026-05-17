package com.service;

import com.entity.Category;
import com.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
class CategoryService {
    private final CategoryRepository repository;
    public List<Category> findAll() { return repository.findAll(); }
    public Category save(Category c) { return repository.save(c); }
}
