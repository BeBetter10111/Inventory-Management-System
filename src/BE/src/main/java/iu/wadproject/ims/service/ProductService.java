package iu.wadproject.ims.service;

import iu.wadproject.ims.entity.Product;
import iu.wadproject.ims.repository.ProductRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepository repository;

    public List<Product> getAllProducts() {
        return repository.findAll();
    }

    public Product getProductById(UUID id) {
        return repository.findById(id).orElseThrow();
    }

    public Product saveProduct(Product product) {
        return repository.save(product);
    }

    public void deleteProductById(UUID id) {
        repository.deleteById(id);
    }
}