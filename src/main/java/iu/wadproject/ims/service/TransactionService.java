package iu.wadproject.ims.service;

import iu.wadproject.ims.dto.request.TransactionRequest;
import iu.wadproject.ims.entity.*;
import iu.wadproject.ims.entity.enums.LogType;
import iu.wadproject.ims.entity.enums.TransactionType;
import iu.wadproject.ims.repository.*;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class TransactionService {
    private final TransactionRepository repository;

    @Autowired
    private ProductService productService;

    @Autowired
    private TransactionDetailService transactionDetailService;

    @Autowired
    private ActivityLogService activityLogService;

    @Autowired
    private UserService userService;

    public List<Transaction> getAllTransactions() {
        return repository.findAll();
    }

    @Transactional
    public void processTransaction(TransactionRequest request) {
        Transaction transaction = new Transaction();

        transaction.setType(request.getTransactionType());
        transaction.setUser(userService.getCurrentUser());
        transaction.setSupplier(request.getSupplier());
        transaction.setBuyer(request.getBuyer());
        transaction.setNote(request.getNote());

        Transaction savedTransaction = repository.save(transaction);

        request.getDetails().forEach(detail -> {
            Product productInDb = productService.getProductById(detail.getProduct().getProductId());

            productInDb.setStockQuantity(productInDb.getStockQuantity() + detail.getQuantity());
            productService.saveProduct(productInDb);

            TransactionDetail transactionDetail = new TransactionDetail();

            transactionDetail.setTransaction(savedTransaction);
            transactionDetail.setProduct(detail.getProduct());
            transactionDetail.setQuantity(detail.getQuantity());
            transactionDetail.setUnitPriceType(detail.getUnitPriceType());

            transactionDetailService.saveTransactionDetail(transactionDetail);
        });

        this.saveLog(savedTransaction);
    }

    public Transaction getTransactionById(UUID id) {
        return repository.findById(id).orElseThrow();
    }

    private void saveLog(Transaction transaction) {
        String name = "";
        String suffix = "";

        if (transaction.getType() == TransactionType.Import) {
            name = "imported";
            suffix = "from Supplier " + transaction.getSupplier().getSupplierName();
        } else {
            name = "exported";
            suffix = "to Buyer " + transaction.getBuyer().getFullName();
        }

        int productAmounts = transaction.getTransactionDetails().size();

        String description = name + " " + productAmounts + " products " + suffix;

        activityLogService.saveLog(
            LogType.Transaction,
            description
        );
    }
}