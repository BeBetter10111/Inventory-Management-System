package iu.wadproject.ims.service;

import java.util.List;

import org.springframework.stereotype.Service;

import iu.wadproject.ims.entity.TransactionDetail;
import iu.wadproject.ims.repository.TransactionDetailRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TransactionDetailService {
    private final TransactionDetailRepository repository;

    public List<TransactionDetail> getAllDetails() {
        return repository.findAll();
    }

    public TransactionDetail saveTransactionDetail(TransactionDetail transactionDetail) {
        return repository.save(transactionDetail);
    }
}