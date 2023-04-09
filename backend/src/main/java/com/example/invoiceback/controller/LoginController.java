package com.example.invoiceback.controller;

import antlr.Token;
import com.example.invoiceback.DTO.LoginUserJson;
import com.example.invoiceback.DTO.TokenJson;
import com.example.invoiceback.service.AuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/login")
public class LoginController {
    private AuthenticationService authenticationService;
    @Autowired
    public LoginController(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    @PostMapping
    public ResponseEntity<?> loginUser(@RequestBody LoginUserJson loginUserJson) {
        try {
            String token = authenticationService.authenticate(loginUserJson);
            return ResponseEntity.ok(new TokenJson(token));
        } catch(Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}
