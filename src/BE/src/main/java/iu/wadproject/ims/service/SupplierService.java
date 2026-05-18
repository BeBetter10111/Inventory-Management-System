package iu.wadproject.ims.service;

import iu.wadproject.ims.entity.Supplier;
import iu.wadproject.ims.repository.SupplierRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SupplierService {
    private final SupplierRepository repository;
    public List<Supplier> findAll() { return repository.findAll(); }
    public Supplier save(Supplier s) { return repository.save(s); }
}