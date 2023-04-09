package com.example.invoiceback.controller;

import com.example.invoiceback.DTO.RegisterUserJson;
import com.example.invoiceback.exception.UserAlreadyExistsException;
import com.example.invoiceback.service.RegistrationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/register")
public class RegistrationController {
    private RegistrationService registrationService;
    @Autowired
    public RegistrationController(RegistrationService registrationService) {
        this.registrationService = registrationService;
    }

    @PostMapping
    public ResponseEntity<?> registerUser(@RequestBody RegisterUserJson registerUserJson) {
        try {
            registrationService.save(registerUserJson);
            return ResponseEntity.ok("user registered successfully!");
        } catch (UserAlreadyExistsException userAlreadyExistsException) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(userAlreadyExistsException.getMessage());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
