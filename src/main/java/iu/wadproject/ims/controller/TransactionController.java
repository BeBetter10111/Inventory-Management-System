package iu.wadproject.ims.controller;

import iu.wadproject.ims.dto.request.TransactionRequest;
import iu.wadproject.ims.dto.response.ApiResponse;
import iu.wadproject.ims.service.TransactionService;

import lombok.RequiredArgsConstructor;

import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/transaction")
@RequiredArgsConstructor
public class TransactionController {
    private final TransactionService service;

    @GetMapping
    public ResponseEntity<ApiResponse> getAllTransactions() {
        return ResponseEntity.ok(new ApiResponse("Success", service.getAllTransactions()));
    }

    @PostMapping("/process")
    public ResponseEntity<ApiResponse> processTransaction(@RequestBody TransactionRequest request) {
        service.processTransaction(request);

        return ResponseEntity.ok(new ApiResponse("Inventory processed successfully", null));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> getTransactionById(@RequestParam UUID id) {
        return ResponseEntity.ok(new ApiResponse("Success", service.getTransactionById(id)));
    }
}