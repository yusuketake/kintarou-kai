package com.benkyo.service;

import com.benkyo.dao.DepartmentDao;
import com.benkyo.dao.UsersDao;
import com.benkyo.entity.gen.Users;
import com.benkyo.model.dto.User;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class UsersService {
    private UsersDao usersDao;
    private DepartmentDao departmentDao;

    public UsersService(UsersDao usersDao, DepartmentDao departmentDao) {
        this.usersDao = usersDao;
        this.departmentDao = departmentDao;
    }

    public User getUser(int id) {
        return this.of(usersDao.getUser(id));
    }

    public List<User> getUserList() {
        List<User> userList = new ArrayList<>();
        var userEntityList = usersDao.getUserList();
        userEntityList.stream().forEach(userEntity -> {
            userList.add(this.of(userEntity));
        });

        return userList;
    }

    private User of(Users userEntity) {
        User user = new User();
        user.setId(userEntity.getId());
        user.setName(userEntity.getName());
        user.setLoginId(userEntity.getLoginId());
        user.setPassword(userEntity.getPassword());

        var department = departmentDao.getDepartment(userEntity.getDepartmentId());
        user.setDepartment(department.getName());
        
        return user;
    }
}
