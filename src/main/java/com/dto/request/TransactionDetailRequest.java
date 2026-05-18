package com.dto.request;

import com.entity.Buyer;
import com.entity.enums.UnitPriceType;
import lombok.Data;

@Data
public class TransactionDetailRequest {
    private String productId;
    private Integer quantity;
    private UnitPriceType unitPriceType;
    private Buyer userId;
}