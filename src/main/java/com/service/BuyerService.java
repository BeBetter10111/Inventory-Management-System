package com.service;

import com.entity.Buyer;
import com.repository.BuyerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
class BuyerService {
    private final BuyerRepository repository;
    public List<Buyer> findAll() { return repository.findAll(); }
    public Buyer save(Buyer buyer) { return repository.save(buyer); }
}