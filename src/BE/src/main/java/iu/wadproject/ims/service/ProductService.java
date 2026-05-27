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

    public Product saveProduct(Product product) {
        return repository.save(product);
    }

    public Product getProductById(UUID id) {
        return repository.findById(id).orElseThrow();
    }

    public Product updateProductById(UUID id, Product detail) {
        Product product = this.getProductById(id);

        product.setCategory(detail.getCategory());
        product.setDescription(detail.getDescription());
        product.setPrice(detail.getPrice());
        product.setProductName(detail.getProductName());
        product.setStockQuantity(detail.getStockQuantity());
        
        return this.saveProduct(product);
    }

    public void deleteProductById(UUID id) {
        repository.deleteById(id);
    }
}