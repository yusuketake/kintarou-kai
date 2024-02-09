package com.benkyo.restcontroller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.benkyo.entity.gen.Users;
import com.benkyo.model.dto.User;
import com.benkyo.service.UsersService;



@RequestMapping("api/users")
@RestController
@CrossOrigin
public class UsersController {

    private UsersService usersService;

    public UsersController(UsersService usersService) {
        this.usersService = usersService;
    }

    @GetMapping("")
    public ResponseEntity<User> getUser() {
        Integer id = Integer.parseInt(
                (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal());
        try {
            return ResponseEntity.ok().body(usersService.getUser(id));
        } catch (Exception e) {
            // 存在しないusernameのリクエストが投げられたとき
            return ResponseEntity.badRequest().body(null);
        }
    }

    @GetMapping("/getList")
    public ResponseEntity<List<User>> getUserList() {
        return ResponseEntity.ok().body(usersService.getUserList());
    }

    // 返り値どうするか悩みどころ
    @PostMapping("/create")
    public ResponseEntity<Users> createUser(@RequestBody Users user) {
        usersService.createUser(user);
        return ResponseEntity.ok().body(user);
    }

}
