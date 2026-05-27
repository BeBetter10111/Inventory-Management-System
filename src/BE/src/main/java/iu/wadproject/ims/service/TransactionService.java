package iu.wadproject.ims.service;

import iu.wadproject.ims.dto.request.TransactionRequest;
import iu.wadproject.ims.entity.*;
import iu.wadproject.ims.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class TransactionService {
    private final TransactionRepository repository;

    private final ProductService productService;
    private final TransactionDetailService transactionDetailService;

    public List<Transaction> getAllTransactions() {
        return repository.findAll();
    }

    public Transaction getTransactionById(UUID id) {
        return repository.findById(id).orElseThrow();
    }

    @Transactional
    public void processTransaction(TransactionRequest request) {
        Transaction transaction = new Transaction();

        transaction.setType(request.getTransactionType());
        transaction.setUser(request.getUser());
        transaction.setSupplier(request.getSupplier());
        transaction.setBuyer(request.getBuyer());
        transaction.setNote(request.getNote());

        repository.save(transaction);

        request.getDetails().forEach(detail -> {
            Product productInDb = productService.getProductById(detail.getProduct().getProductId());

            productInDb.setStockQuantity(productInDb.getStockQuantity() + detail.getQuantity());
            productService.saveProduct(productInDb);

            TransactionDetail transactionDetail = new TransactionDetail();

            transactionDetail.setTransaction(detail.getTransaction());
            transactionDetail.setProduct(detail.getProduct());
            transactionDetail.setQuantity(detail.getQuantity());
            transactionDetail.setUnitPriceType(detail.getUnitPriceType());

            transactionDetailService.saveTransactionDetail(transactionDetail);
        });
    }
}