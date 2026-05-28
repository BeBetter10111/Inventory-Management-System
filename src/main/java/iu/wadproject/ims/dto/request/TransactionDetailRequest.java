package iu.wadproject.ims.dto.request;

import iu.wadproject.ims.entity.Product;
import iu.wadproject.ims.entity.enums.UnitPriceType;
import lombok.Data;

@Data
public class TransactionDetailRequest {
    private Product product;
    private Integer quantity;
    private UnitPriceType unitPriceType;
}