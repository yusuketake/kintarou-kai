package com.benkyo.service;

import com.benkyo.dao.UsersDao;
import com.benkyo.entity.gen.Users;

import org.springframework.stereotype.Service;

@Service
public class UsersService {
    private UsersDao usersDao;

    public UsersService(UsersDao usersDao) {
        this.usersDao = usersDao;
    }

    public Users getUser(int id) {
        return usersDao.getUser(id);
    }
}
