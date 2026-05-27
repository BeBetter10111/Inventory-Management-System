package iu.wadproject.ims.entity;

import java.util.UUID;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class Category {
    @Id @GeneratedValue
    private UUID categoryId;

    @Column(length = 200, nullable = false)
    private String categoryName;

    @Column(length = 50, nullable = false)
    private String unit;
}
