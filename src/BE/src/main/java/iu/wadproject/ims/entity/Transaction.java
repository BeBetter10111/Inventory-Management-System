package iu.wadproject.ims.entity;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

import iu.wadproject.ims.entity.enums.TransactionType;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class Transaction {
    @Id @GeneratedValue
    private UUID transactionId;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private TransactionType type;

    @Column(nullable = false)
    private LocalDate date = LocalDate.now();

    @ManyToOne
    @JoinColumn(name = "userId", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "supplierId")
    private Supplier supplier = null;

    @ManyToOne
    @JoinColumn(name = "buyerId")
    private Buyer buyer = null;

    private String note = null;

    @OneToMany(mappedBy = "transaction")
    private List<TransactionDetail> transactionDetails;
}