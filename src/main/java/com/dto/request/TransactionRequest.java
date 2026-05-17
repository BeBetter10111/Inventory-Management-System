package com.dto.request;

import lombok.Data;
import java.util.List;

@Data
public class TransactionRequest {
    private String transactionId;
    private String supplierId; // Import
    private String buyerId;    // Export
    private String note;
    private List<TransactionDetailRequest> items;
}