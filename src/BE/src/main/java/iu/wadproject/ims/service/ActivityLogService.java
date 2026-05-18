package iu.wadproject.ims.service;

import iu.wadproject.ims.entity.ActivityLog;
import iu.wadproject.ims.repository.ActivityLogRepository;
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