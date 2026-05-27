package iu.wadproject.ims.entity;

import java.util.UUID;

import iu.wadproject.ims.entity.enums.UnitPriceType;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class TransactionDetail {
    @Id @GeneratedValue
    private UUID detailId;

    @ManyToOne
    @JoinColumn(name = "transactionId", nullable = false)
    private Transaction transaction;

    @ManyToOne
    @JoinColumn(name = "productId", nullable = false)
    private Product product;

    @Column(nullable = false)
    private Integer quantity = 0;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private UnitPriceType unitPriceType;
}