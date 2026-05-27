package iu.wadproject.ims.service;

import iu.wadproject.ims.entity.Supplier;
import iu.wadproject.ims.repository.SupplierRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class SupplierService {
    private final SupplierRepository repository;

    public List<Supplier> getAllSuppliers() {
        return repository.findAll();
    }

    public Supplier getSupplierById(UUID id) {
        return repository.findById(id).orElseThrow();
    }

    public Supplier saveSupplier(Supplier supplier) {
        return repository.save(supplier);
    }

    public void deleteSupplierById(UUID id) {
        repository.deleteById(id);
    }
}