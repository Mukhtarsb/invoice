package com.example.invoiceback.service;

import com.example.invoiceback.DTO.StatusJson;
import com.example.invoiceback.exception.NotFoundException;
import com.example.invoiceback.DTO.AddressJson;
import com.example.invoiceback.DTO.InvoiceJson;
import com.example.invoiceback.DTO.ItemJson;
import com.example.invoiceback.model.Address;
import com.example.invoiceback.model.Invoice;
import com.example.invoiceback.model.Item;
import com.example.invoiceback.repository.InvoiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.relational.core.sql.In;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class InvoiceService {
    private InvoiceRepository invoiceRepository;
    private ItemService itemService;
    private AddressService addressService;
    @Autowired
    public InvoiceService(InvoiceRepository invoiceRepository, ItemService itemService, AddressService addressService) {
        this.invoiceRepository = invoiceRepository;
        this.itemService = itemService;
        this.addressService = addressService;
    }
    public void save(InvoiceJson invoiceJson) throws Exception {
        Invoice invoice = convertToInvoice(invoiceJson);
        addressService.save(invoice.getSenderAddress());
        addressService.save(invoice.getClientAddress());
        invoiceRepository.save(invoice);
    }

    public Invoice getById(String id) throws Exception {
        Optional<Invoice> result = invoiceRepository.findById(id);
        if (result.isEmpty()) {
            throw new NotFoundException("invoice not found");
        }
        return result.get();
    }

    public List<Invoice> getAll(String limit, String status) throws Exception {
        Iterable<Invoice> result = invoiceRepository.findAll();
        List<Invoice> invoicesList = new ArrayList<>();
        result.forEach(invoicesList::add);
        List<Invoice> invoices = new ArrayList<>();
        int bound = -1;
        if (limit != null) {
            bound = Integer.parseInt(limit);
        }
        for (int i = 0; i < invoicesList.size(); ++i) {
            if (status != null) {
                if (!invoicesList.get(i).getStatus().equals(status)) continue;
            }
            if (bound != -1) {
                if (bound == i) break;
            }
            invoices.add(invoicesList.get(i));
        }
        return invoices;
    }
    public void update(InvoiceJson invoiceJson) throws Exception {
        save(invoiceJson);
    }

    public void delete(String invoiceID) throws Exception {
        Optional<Invoice> res = invoiceRepository.findById(invoiceID);
        if (res.isEmpty()) {
            throw new NotFoundException("invoice not found!");
        }
        invoiceRepository.delete(res.get());
    }
    private Invoice convertToInvoice(InvoiceJson invoiceJson) {
        AddressJson jsonSenderAddress = invoiceJson.getSenderAddress();
        AddressJson jsonClientAddress = invoiceJson.getClientAddress();
        Invoice invoice = getInvoice(invoiceJson, jsonSenderAddress, jsonClientAddress);
        List<Item> items = convertToItems(invoiceJson.getItems());
        for (Item item : items) {
            invoice.addItem(item);
        }
        return invoice;
    }

    private Invoice getInvoice(InvoiceJson invoiceJson, AddressJson jsonSenderAddress, AddressJson jsonClientAddress) {
        return new Invoice(invoiceJson.getId(), invoiceJson.getCreatedAt(),
                invoiceJson.getPaymentDue(), invoiceJson.getDescription(),
                invoiceJson.getPaymentTerms(), invoiceJson.getClientName(),
                invoiceJson.getClientEmail(), invoiceJson.getStatus(),
                convertToAddress(jsonSenderAddress), convertToAddress(jsonClientAddress),
                invoiceJson.getTotal());
    }

    private Address convertToAddress(AddressJson addressJson) {
        return new Address(addressJson.getStreet(), addressJson.getCity(), addressJson.getPostCode(), addressJson.getCountry());
    }

    private List<Item> convertToItems(List<ItemJson> jsonItems) {
        List<Item> items = new ArrayList<>();
        for (ItemJson itemJson : jsonItems) {
            items.add(new Item(itemJson.getName(), itemJson.getQuantity(), itemJson.getPrice(), itemJson.getTotal()));
        }
        return items;
    }
}
