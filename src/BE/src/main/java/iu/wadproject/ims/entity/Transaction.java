package iu.wadproject.ims.entity;

import iu.wadproject.ims.entity.enums.TransactionType;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "transactions")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class Transaction {
    @Id
    @Column(name = "transaction_id")
    private String transactionId;

    @Enumerated(EnumType.STRING)
    private TransactionType type;

    private java.time.LocalDateTime date;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "supplier_id")
    private Supplier supplier;

    @Column(name = "buyer_name")
    private String buyerName;

    private String note;
}