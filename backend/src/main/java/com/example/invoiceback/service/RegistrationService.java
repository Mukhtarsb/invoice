package com.example.invoiceback.service;

import com.example.invoiceback.DTO.RegisterUserJson;
import com.example.invoiceback.exception.UserAlreadyExistsException;
import com.example.invoiceback.model.User;
import com.example.invoiceback.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class RegistrationService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    @Autowired
    public RegistrationService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public void save(RegisterUserJson registerUserJson) throws Exception {
        String email = registerUserJson.getEmail(), username = registerUserJson.getLogin(), password = registerUserJson.getPassword();
        Optional<User> result = userRepository.findByUsername(username);
        if (result.isPresent()) {
            throw new UserAlreadyExistsException("username already exists!");
        }
        String encodedPassword = passwordEncoder.encode(password);
        userRepository.save(new User(email, username, encodedPassword));
    }
}
