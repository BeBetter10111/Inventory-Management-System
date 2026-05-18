package com.service;

import com.entity.Supplier;
import com.repository.SupplierRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
class SupplierService {
    private final SupplierRepository repository;
    public List<Supplier> findAll() { return repository.findAll(); }
    public Supplier save(Supplier s) { return repository.save(s); }
}