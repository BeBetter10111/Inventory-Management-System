package iu.wadproject.ims.entity;

import java.util.UUID;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class Buyer {
    @Id @GeneratedValue
    private UUID buyerId;

    @Column(length = 200, nullable = false)
    private String fullName;

    @Column(length = 300, nullable = false)
    private String address;
}
