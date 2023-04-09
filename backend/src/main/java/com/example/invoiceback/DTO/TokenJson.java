package com.example.invoiceback.DTO;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class TokenJson {
    private String token;

    public TokenJson(@JsonProperty("token") String token) {
        this.token = token;
    }
}
