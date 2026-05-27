package iu.wadproject.ims.dto.request;

import lombok.Data;

import java.util.List;

import iu.wadproject.ims.entity.Buyer;
import iu.wadproject.ims.entity.Supplier;
import iu.wadproject.ims.entity.User;
import iu.wadproject.ims.entity.enums.TransactionType;

@Data
public class TransactionRequest {
    private TransactionType transactionType;
    private User user;
    private Supplier supplier;  // Import
    private Buyer buyer;        // Export
    private String note;
    private List<TransactionDetailRequest> details;
}