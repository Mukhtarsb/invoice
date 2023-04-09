package com.example.invoiceback.service;

import com.example.invoiceback.DTO.LoginUserJson;
import com.example.invoiceback.exception.InvalidUsernameOrPasswordException;
import com.example.invoiceback.exception.NotFoundException;
import com.example.invoiceback.model.User;
import com.example.invoiceback.repository.UserRepository;
import io.jsonwebtoken.Jwt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthenticationService {
    private AuthenticationManager authenticationManager;
    private JwtService jwtService;
    private UserRepository userRepository;
    @Autowired
    public AuthenticationService(AuthenticationManager authenticationManager, JwtService jwtService, UserRepository userRepository) {
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
        this.userRepository = userRepository;
    }

    public String authenticate(LoginUserJson loginUserJson) throws UsernameNotFoundException {
        String username = loginUserJson.getUsername(), password = loginUserJson.getPassword();
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        username,
                        password
                )
        );
        Optional<User> res = userRepository.findByUsername(username);
        if (res.isEmpty()) {
            throw new UsernameNotFoundException("username not found!");
        }
        User user = res.get();
        return jwtService.generateToken(user);
    }
}
