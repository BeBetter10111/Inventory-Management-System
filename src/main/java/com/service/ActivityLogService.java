package com.service;

import com.entity.ActivityLog;
import com.repository.ActivityLogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ActivityLogService {
    private final ActivityLogRepository repository;
    public void saveLog(ActivityLog log) {
        repository.save(log);
    }
}