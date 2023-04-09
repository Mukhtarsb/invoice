package com.example.invoiceback.DTO;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class StatusJson {
    private String status;

    public StatusJson(@JsonProperty("status") String status) {
        this.status = status;
    }
}
