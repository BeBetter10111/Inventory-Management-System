package iu.wadproject.ims.service;

import iu.wadproject.ims.entity.Supplier;
import iu.wadproject.ims.entity.enums.LogType;
import iu.wadproject.ims.repository.SupplierRepository;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class SupplierService {
    private final SupplierRepository repository;

    @Autowired
    private ActivityLogService activityLogService;

    public List<Supplier> getAllSuppliers() {
        return repository.findAll();
    }

    public Supplier saveSupplier(Supplier supplier) {
        this.saveLog("added", supplier);

        return repository.save(supplier);
    }

    public Supplier getSupplierById(UUID id) {
        return repository.findById(id).orElseThrow();
    }

    public Supplier updateSupplierById(UUID id, Supplier detail) {
        Supplier supplier = this.getSupplierById(id);

        supplier.setAddress(detail.getAddress());
        supplier.setContact(detail.getContact());
        supplier.setSupplierName(detail.getSupplierName());

        this.saveLog("updated", supplier);

        return this.saveSupplier(supplier);
    }

    public void deleteSupplierById(UUID id) {
        Supplier supplier = this.getSupplierById(id);

        repository.delete(supplier);

        this.saveLog("deleted", supplier);
    }

    private void saveLog(String name, Supplier supplier) {
        activityLogService.saveLog(
            LogType.AdjustSupplier,
            name + " Supplier \"" + supplier.getSupplierName() + "\""
        );
    }
}