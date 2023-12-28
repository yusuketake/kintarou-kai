package com.benkyo.restcontroller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.benkyo.service.UsersService;
import com.benkyo.model.dto.User;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;



@RequestMapping("api/users")
@RestController
public class UsersController {

    private UsersService usersService;

    public UsersController(UsersService usersService) {
        this.usersService = usersService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUser(@PathVariable int id) {
        try {
            return ResponseEntity.ok().body(usersService.getUser(id));
        } catch (Exception e) {
            // 存在しないUserIDのリクエストが投げられたとき
            return ResponseEntity.badRequest().body(null);
        }
        
    }

    @GetMapping("")
    public List<User> getUserList() {
        return usersService.getUserList();
    }
    
}
