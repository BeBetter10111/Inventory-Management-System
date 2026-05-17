package com.service;

import com.dto.request.TransactionRequest;
import com.entity.*;
import com.entity.enums.TransactionType;
import com.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TransactionService {
    private final TransactionRepository transactionRepository;
    private final TransactionDetailRepository detailRepository;
    private final ProductRepository productRepository;
    private final SupplierRepository supplierRepository;
    private final BuyerRepository buyerRepository;

    public List<Transaction> findAll() {
        return transactionRepository.findAll();
    }

    public List<Transaction> getCurrentUserTransactions() {
        return transactionRepository.findAll();
    }

    @Transactional
    public Transaction processImport(TransactionRequest request) {
        Transaction tx = new Transaction();
        tx.setTransactionId(request.getTransactionId());
        tx.setType(TransactionType.Import);
        tx.setDate(LocalDateTime.now());
        tx.setSupplier(supplierRepository.findById(request.getSupplierId()).orElse(null));
        tx.setNote(request.getNote());

        transactionRepository.save(tx);

        request.getItems().forEach(item -> {
            Product product = productRepository.findById(item.getProductId()).orElseThrow();
            product.setStockQuantity(product.getStockQuantity() + item.getQuantity());
            productRepository.save(product);

            TransactionDetail detail = new TransactionDetail();
            detail.setTransaction(tx);
            detail.setProduct(product);
            detail.setQuantity(item.getQuantity());
            detail.setPriceAtTransaction(product.getPrice());
            detail.setUnitPriceType(item.getUnitPriceType());
            detailRepository.save(detail);
        });
        return tx;
    }

    @Transactional
    public Transaction processExport(TransactionRequest request) {
        Transaction tx = new Transaction();
        tx.setTransactionId(request.getTransactionId());
        tx.setType(TransactionType.Export);
        tx.setDate(LocalDateTime.now());

        buyerRepository.findById(request.getBuyerId()).ifPresent(buyer -> tx.setBuyerName(buyer.getUserName()));

        tx.setNote(request.getNote());
        transactionRepository.save(tx);

        request.getItems().forEach(item -> {
            Product product = productRepository.findById(item.getProductId()).orElseThrow();
            if (product.getStockQuantity() < item.getQuantity()) {
                throw new RuntimeException("Insufficient stock for: " + product.getProductName());
            }
            product.setStockQuantity(product.getStockQuantity() - item.getQuantity());
            productRepository.save(product);

            TransactionDetail detail = new TransactionDetail();
            detail.setTransaction(tx);
            detail.setProduct(product);
            detail.setQuantity(item.getQuantity());
            detail.setPriceAtTransaction(product.getPrice());
            detail.setUnitPriceType(item.getUnitPriceType());
            detailRepository.save(detail);
        });
        return tx;
    }
}