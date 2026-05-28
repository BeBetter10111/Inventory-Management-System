package iu.wadproject.ims.service;

import iu.wadproject.ims.entity.Buyer;
import iu.wadproject.ims.entity.enums.LogType;
import iu.wadproject.ims.repository.BuyerRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class BuyerService {
    private final BuyerRepository repository;

    @Autowired
    private ActivityLogService activityLogService;

    public List<Buyer> getAllBuyers() {
        return repository.findAll();
    }

    public Buyer saveBuyer(Buyer buyer) {
        this.saveLog("added", buyer);

        return repository.save(buyer);
    }

    public Buyer getBuyerById(UUID id) {
        return repository.findById(id).orElseThrow();
    }

    public Buyer updateBuyerById(UUID id, Buyer detail) {
        Buyer buyer = this.getBuyerById(id);

        buyer.setFullName(detail.getFullName());
        buyer.setAddress(detail.getAddress());

        this.saveLog("updated", buyer);

        return repository.save(buyer);
    }

    public void deleteBuyerById(UUID id) {
        Buyer buyer = this.getBuyerById(id);

        this.saveLog("deleted", buyer);

        repository.delete(buyer);
    }

    private void saveLog(String name, Buyer buyer) {
        activityLogService.saveLog(
            LogType.AdjustBuyer,
            name + " Buyer \"" + buyer.getFullName() + "\""
        );
    }
}