package iu.wadproject.ims.repository;

import iu.wadproject.ims.entity.ActivityLog;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ActivityLogRepository extends JpaRepository<ActivityLog, UUID> {
    
}