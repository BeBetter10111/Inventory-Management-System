package iu.wadproject.ims.service;

import iu.wadproject.ims.entity.ActivityLog;
import iu.wadproject.ims.repository.ActivityLogRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ActivityLogService {
    private final ActivityLogRepository repository;

    public List<ActivityLog> getAllLogs() {
        return repository.findAll();
    }

    public ActivityLog saveLog(ActivityLog log) {
        return repository.save(log);
    }
}