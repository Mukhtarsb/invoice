package com.example.invoiceback.DTO;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class RegisterUserJson {
    private String email;
    private String login;
    private String password;

    public RegisterUserJson(@JsonProperty("email") String email, @JsonProperty("username") String login, @JsonProperty("password") String password) {
        this.email = email;
        this.login = login;
        this.password = password;
    }
}
