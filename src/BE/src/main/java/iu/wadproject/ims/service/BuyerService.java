package iu.wadproject.ims.service;

import iu.wadproject.ims.entity.Buyer;
import iu.wadproject.ims.repository.BuyerRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class BuyerService {
    private final BuyerRepository repository;

    public List<Buyer> getAllBuyers() {
        return repository.findAll();
    }

    public Buyer getBuyerById(UUID id) {
        return repository.findById(id).orElseThrow();
    }

    public Buyer saveBuyer(Buyer buyer) {
        return repository.save(buyer);
    }

    public void deleteBuyerById(UUID id) {
        repository.deleteById(id);
    }
}