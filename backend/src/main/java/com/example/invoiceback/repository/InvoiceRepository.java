package com.example.invoiceback.repository;

import com.example.invoiceback.model.Invoice;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Component;

@Component
public interface InvoiceRepository extends CrudRepository<Invoice, String> {
}
