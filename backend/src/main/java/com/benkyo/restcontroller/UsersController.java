package com.benkyo.restcontroller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.benkyo.service.UsersService;
import com.benkyo.model.dto.User;

import java.util.List;

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
    public User getUser(@PathVariable int id) {
        return usersService.getUser(id);
    }

    @GetMapping("")
    public List<User> getUserList() {
        return usersService.getUserList();
    }
    
}
