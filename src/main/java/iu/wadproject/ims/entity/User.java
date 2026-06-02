package iu.wadproject.ims.entity;

import java.util.UUID;

import iu.wadproject.ims.entity.enums.RoleType;
import iu.wadproject.ims.entity.enums.StatusType;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class User {
    @Id @GeneratedValue
    private UUID userId;

    @Column(unique = true, nullable = false, length = 100)
    private String username;

    @Column(nullable = false, length = 255)
    private String password;

    @Column(length = 200, nullable = false)
    private String fullName;

    @Column(length = 20, nullable = false)
    private String phoneNumber;

    @Column(length = 150, nullable = false)
    private String email = null;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private StatusType statusType = StatusType.Pending;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private RoleType roleType = RoleType.Staff;

    @Column(name = "reset_token")
    private String resetToken;
}
