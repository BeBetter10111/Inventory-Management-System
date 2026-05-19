package iu.wadproject.ims.dto.request;

import iu.wadproject.ims.entity.Buyer;
import iu.wadproject.ims.entity.enums.UnitPriceType;
import lombok.Data;

@Data
public class TransactionDetailRequest {
    private String productId;
    private Integer quantity;
    private UnitPriceType unitPriceType;
    private Buyer userId;
}