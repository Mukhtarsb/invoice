package com.example.invoiceback.repository;

import com.example.invoiceback.model.Invoice;
import com.example.invoiceback.model.Item;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Component;

@Component
public interface ItemRepository extends CrudRepository<Item, Long> {
}
