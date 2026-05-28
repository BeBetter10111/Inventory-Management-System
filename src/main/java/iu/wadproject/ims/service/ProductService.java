package iu.wadproject.ims.service;

import iu.wadproject.ims.entity.Product;
import iu.wadproject.ims.entity.enums.LogType;
import iu.wadproject.ims.repository.ProductRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepository repository;

    @Autowired
    private ActivityLogService activityLogService;

    public List<Product> getAllProducts() {
        return repository.findAll();
    }

    public Product saveProduct(Product product) {
        this.saveLog("added", product);

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

        this.saveLog("updated", product);
        
        return this.saveProduct(product);
    }

    public void deleteProductById(UUID id) {
        Product product = this.getProductById(id);

        this.saveLog("deleted", product);

        repository.delete(product);
    }

    private void saveLog(String name, Product product) {
        activityLogService.saveLog(
            LogType.AdjustProduct,
            name + " Product \"" + product.getProductName() + "\""
        );
    }
}