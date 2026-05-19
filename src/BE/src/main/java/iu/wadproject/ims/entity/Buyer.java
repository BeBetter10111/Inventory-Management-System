package iu.wadproject.ims.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "buyers")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class Buyer {
    @Id
    @Column(name = "user_id")
    private String userId;

    @Column(name = "user_name")
    private String userName;

    private String address;
}
