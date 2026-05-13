package com.entity;

import com.entity.enums.UnitPriceType;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "transaction_details")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class TransactionDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "transaction_id")
    private Transaction transaction;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    private Integer quantity;

    @Column(name = "unit_price")
    private UnitPriceType unitPrice;
}