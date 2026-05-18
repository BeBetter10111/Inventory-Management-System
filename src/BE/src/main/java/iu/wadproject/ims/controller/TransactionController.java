package iu.wadproject.ims.controller;

import iu.wadproject.ims.dto.request.TransactionRequest;
import iu.wadproject.ims.dto.response.ApiResponse;
import iu.wadproject.ims.service.TransactionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/transactions")
@RequiredArgsConstructor
public class TransactionController {
    private final TransactionService transactionService;

    @GetMapping
    public ResponseEntity<ApiResponse> getAllTransactions() {
        return ResponseEntity.ok(new ApiResponse("Success", transactionService.findAll()));
    }

    @GetMapping("/current-user")
    public ResponseEntity<ApiResponse> getCurrentUserTransactions() {
        return ResponseEntity.ok(new ApiResponse("Success", transactionService.getCurrentUserTransactions()));
    }

    @PostMapping("/import")
    public ResponseEntity<ApiResponse> importInventory(@RequestBody TransactionRequest request) {
        return ResponseEntity.ok(new ApiResponse("Inventory imported successfully", transactionService.processImport(request)));
    }

    @PostMapping("/export")
    public ResponseEntity<ApiResponse> exportInventory(@RequestBody TransactionRequest request) {
        return ResponseEntity.ok(new ApiResponse("Inventory exported successfully", transactionService.processExport(request)));
    }
}