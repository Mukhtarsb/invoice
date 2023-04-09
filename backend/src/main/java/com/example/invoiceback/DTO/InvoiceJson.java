package com.example.invoiceback.DTO;


import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class InvoiceJson {
    private String id;
    private String createdAt;
    private String paymentDue;
    private String description;
    private int paymentTerms;
    private String clientName;
    private String clientEmail;
    private String status;
    private AddressJson senderAddress;
    private AddressJson clientAddress;
    private List<ItemJson> items;
    private double total;

    @JsonCreator
    public InvoiceJson(@JsonProperty("id") String id, @JsonProperty("createdAt") String createdAt,
                       @JsonProperty("paymentDue") String paymentDue, @JsonProperty("description") String description,
                       @JsonProperty("paymentTerms") int paymentTerms, @JsonProperty("clientName") String clientName,
                       @JsonProperty("clientEmail") String clientEmail, @JsonProperty("status") String status,
                       @JsonProperty("senderAddress") AddressJson senderAddress, @JsonProperty("clientAddress") AddressJson clientAddress,
                       @JsonProperty("items") List<ItemJson> items, @JsonProperty("total") double total) {
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
        this.items = items;
        this.total = total;
    }
}
