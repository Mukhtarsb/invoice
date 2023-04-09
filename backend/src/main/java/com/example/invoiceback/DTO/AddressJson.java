package com.example.invoiceback.DTO;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class AddressJson {
    private String street;
    private String city;
    private String postCode;
    private String country;

    @JsonCreator
    public AddressJson(@JsonProperty("street") String street, @JsonProperty("city") String city,
                       @JsonProperty("postCode") String postCode, @JsonProperty("country") String country) {
        this.street = street;
        this.city = city;
        this.postCode = postCode;
        this.country = country;
    }
}
