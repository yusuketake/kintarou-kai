package com.benkyo.restcontroller;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.RestController;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.benkyo.model.dto.User;
import com.benkyo.model.dto.request.LoginRequest;
import com.benkyo.service.UsersService;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@CrossOrigin
public class LoginController {
    private DaoAuthenticationProvider daoAuthenticationProvider;
    private UsersService usersService;

    public LoginController(DaoAuthenticationProvider daoAuthenticationProvider, UsersService usersService) {
        this.daoAuthenticationProvider = daoAuthenticationProvider;
        this.usersService = usersService;
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest request) {
        try {
            daoAuthenticationProvider.authenticate(new UsernamePasswordAuthenticationToken(
                    request.getUsername(), request.getPassword()));
            User user = usersService.getUserByUsername(request.getUsername());
            String token = JWT.create().withClaim("id", user.getId())
                    .sign(Algorithm.HMAC256("__secret__"));
            HttpHeaders httpHeaders = new HttpHeaders();
            httpHeaders.add("x-auth-token", token);
            return new ResponseEntity(httpHeaders, HttpStatus.OK);
        } catch (AuthenticationException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

}
