package com.example.invoiceback.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@Table(name = "invoice")
public class Invoice {
    @Id
    private String id;
    private String createdAt;
    private String paymentDue;
    private String description;
    private int paymentTerms;
    private String clientName;
    private String clientEmail;
    private String status;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sender_address_id")
    private Address senderAddress;
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "client_address_id")
    private Address clientAddress;
    @OneToMany(mappedBy = "invoice", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<Item> items = new ArrayList<>();

    private double total;

    private void setItems(List<Item> items) {
        this.items = items;
    }
    public void addItem(Item item) {
        items.add(item);
        item.setInvoice(this);
    }
    public void removeItem(Item item) {
        items.remove(item);
        item.setInvoice(null);
    }


    public Invoice(String id, String createdAt, String paymentDue, String description, int paymentTerms, String clientName, String clientEmail, String status, Address senderAddress, Address clientAddress, double total) {
        this.id = id;
        this.createdAt = createdAt;
        this.paymentDue = paymentDue;
        this.description = description;
        this.paymentTerms = paymentTerms;
        this.clientName = clientName;
        this.clientEmail = clientEmail;
        this.status = status;
        this.senderAddress = senderAddress;
        this.clientAddress = clientAddress;
        this.total = total;
    }
}
