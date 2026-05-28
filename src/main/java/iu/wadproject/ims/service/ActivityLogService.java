package iu.wadproject.ims.service;

import iu.wadproject.ims.entity.ActivityLog;
import iu.wadproject.ims.entity.enums.LogType;
import iu.wadproject.ims.repository.ActivityLogRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ActivityLogService {
    private final ActivityLogRepository repository;

    @Autowired
    private UserService userService;

    public List<ActivityLog> getAllLogs() {
        return repository.findAll();
    }

    public ActivityLog saveLog(LogType type, String description) {
        ActivityLog log = new ActivityLog();

        log.setUser(userService.getCurrentUser());
        log.setDescription(
            userService.getCurrentUser().getFullName() + "has " + description + "."
        );
        log.setType(type);

        return repository.save(log);
    }
}