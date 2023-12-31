package com.benkyo.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.benkyo.entity.gen.Users;
import com.benkyo.entity.gen.UsersExample;
import com.benkyo.mapper.gen.UsersMapper;

@Repository
public class UsersDao {
    private UsersMapper usersMapper;

    public UsersDao(UsersMapper usersMapper) {
        this.usersMapper = usersMapper;
    }

    public Users getUser(int id) {
        Users user = usersMapper.selectByPrimaryKey(id);
        

        return user;
    }

    public List<Users> getUserList() {
        var example = new UsersExample();
        return usersMapper.selectByExample(example);
    }

    public int createUser(Users user) {
        return usersMapper.insertSelective(user);
    }
}
