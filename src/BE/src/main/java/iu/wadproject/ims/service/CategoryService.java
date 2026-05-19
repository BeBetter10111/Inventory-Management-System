package iu.wadproject.ims.service;

import iu.wadproject.ims.entity.Category;
import iu.wadproject.ims.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryService {
    private final CategoryRepository repository;
    public List<Category> findAll() { return repository.findAll(); }
    public Category save(Category c) { return repository.save(c); }
}
