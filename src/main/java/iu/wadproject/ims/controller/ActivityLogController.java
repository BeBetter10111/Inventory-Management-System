package iu.wadproject.ims.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import iu.wadproject.ims.dto.response.ApiResponse;
import iu.wadproject.ims.service.ActivityLogService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/log")
@RequiredArgsConstructor
public class ActivityLogController {
    private final ActivityLogService service;

    @GetMapping
    public ResponseEntity<ApiResponse> getAllLogs() {
        return ResponseEntity.ok(new ApiResponse("Success", service.getAllLogs()));
    }
}
