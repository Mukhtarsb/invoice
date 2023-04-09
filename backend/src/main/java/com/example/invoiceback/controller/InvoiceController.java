package com.example.invoiceback.controller;

import com.example.invoiceback.DTO.StatusJson;
import com.example.invoiceback.exception.IdNotProvidedException;
import com.example.invoiceback.exception.NotFoundException;
import com.example.invoiceback.DTO.InvoiceJson;
import com.example.invoiceback.model.Invoice;
import com.example.invoiceback.service.InvoiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.relational.core.sql.In;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/invoice")
public class InvoiceController {

    private InvoiceService invoiceService;

    @Autowired
    public InvoiceController(InvoiceService invoiceService) {
        this.invoiceService = invoiceService;
    }

    @PostMapping
    public ResponseEntity<String> saveInvoice(@RequestBody InvoiceJson invoice) {
        try {
            invoiceService.save(invoice);
            return ResponseEntity.ok("invoice saved successfully!");
        } catch (Exception exception) {
            return ResponseEntity.badRequest().body(exception.getMessage());
        }
    }

    @GetMapping("/{invoiceID}")
    public ResponseEntity<?> getInvoiceById(@PathVariable String invoiceID) {
        try {
            Invoice invoice = invoiceService.getById(invoiceID);
            return ResponseEntity.ok(invoice);
        } catch (NotFoundException notFoundException) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(notFoundException.getMessage());
        } catch (Exception exception) {
            return ResponseEntity.badRequest().body(exception.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<?> getAllInvoices(@RequestParam(name = "limit", required = false) String limit, @RequestParam(name = "status", required = false) String status) {
        try {
            List<Invoice> invoices = invoiceService.getAll(limit, status);
            return ResponseEntity.ok(invoices);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PatchMapping()
    public ResponseEntity<?> updateInvoice(@RequestBody InvoiceJson invoiceJson) {
        try {
            invoiceService.update(invoiceJson);
            return ResponseEntity.ok("Invoice updated successfully!");
        } catch (IdNotProvidedException | NotFoundException idNotProvidedException) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(idNotProvidedException.getMessage());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @CrossOrigin
    @DeleteMapping("/{invoiceID}")
    public ResponseEntity<?> deleteInvoice(@PathVariable String invoiceID) {
        try {
            invoiceService.delete(invoiceID);
            return ResponseEntity.ok("Invoice deleted successfully!");
        } catch (NotFoundException notFoundException) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(notFoundException.getMessage());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
