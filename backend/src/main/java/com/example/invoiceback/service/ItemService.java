package com.example.invoiceback.service;

import com.example.invoiceback.model.Item;
import com.example.invoiceback.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ItemService {
    private ItemRepository itemRepository;

    @Autowired
    public ItemService(ItemRepository itemRepository) {
        this.itemRepository = itemRepository;
    }

    private void save(Item item) throws Exception {
        itemRepository.save(item);
    }

    public void saveItems(List<Item> items) throws Exception {
        for (Item item : items) {
            save(item);
        }
    }
}
