package com.example.invoiceback.DTO;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ItemJson {
    private String name;
    private int quantity;
    private double price;
    private double total;

    @JsonCreator
    public ItemJson(@JsonProperty("name") String name, @JsonProperty("quantity") int quantity,
                    @JsonProperty("price") double price, @JsonProperty("total") double total) {
        this.name = name;
        this.quantity = quantity;
        this.price = price;
        this.total = total;
    }
}
