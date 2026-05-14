package com.controller;

import com.dto.request.TransactionRequest;
import com.dto.response.ApiResponse;
import com.service.TransactionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/transactions")
@RequiredArgsConstructor
public class TransactionController {
    private final TransactionService transactionService;

    @GetMapping
    public ResponseEntity<ApiResponse> getMyTransactions() {
        return ResponseEntity.ok(new ApiResponse("Success", transactionService.getCurrentUserTransactions()));
    }

    @PostMapping("/import")
    public ResponseEntity<ApiResponse> importInventory(@RequestBody TransactionRequest request) {
        return ResponseEntity.ok(new ApiResponse("Inventory imported", transactionService.processImport(request)));
    }

    @PostMapping("/export")
    public ResponseEntity<ApiResponse> exportInventory(@RequestBody TransactionRequest request) {
        return ResponseEntity.ok(new ApiResponse("Inventory exported", transactionService.processExport(request)));
    }
}