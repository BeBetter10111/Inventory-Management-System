package iu.wadproject.ims.entity;

import java.util.UUID;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class Supplier {
    @Id @GeneratedValue
    private UUID supplierId;

    @Column(nullable = false)
    private String supplierName;

    @Column(nullable = false)
    private String contact;

    @Column(nullable = false)
    private String address;
}