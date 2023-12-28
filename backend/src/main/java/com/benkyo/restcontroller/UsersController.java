package com.benkyo.restcontroller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.benkyo.mapper.gen.UsersMapper;
import com.benkyo.entity.gen.Users;
import com.benkyo.entity.gen.UsersExample;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;


@RequestMapping("api/users")
@RestController
public class UsersController {

    private UsersMapper usersMapper;

    public UsersController(UsersMapper usersMapper) {
        this.usersMapper = usersMapper;
    }

    @GetMapping("/{id}")
    public Users getUser(@PathVariable int id) {
        var example = new UsersExample();
        example.createCriteria().andIdEqualTo(id);
        return usersMapper.selectByExample(example).get(0);
    }
    
}
