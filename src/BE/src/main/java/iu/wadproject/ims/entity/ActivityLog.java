package iu.wadproject.ims.entity;

import iu.wadproject.ims.entity.enums.LogType;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "activity_logs")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class ActivityLog {
    @Id
    @Column(name = "activity_id")
    private String activityId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    private String description;

    @Enumerated(EnumType.STRING)
    private LogType type;

    private LocalDateTime timestamp = LocalDateTime.now();
}