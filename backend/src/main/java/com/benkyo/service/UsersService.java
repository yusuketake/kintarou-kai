package com.benkyo.service;

import java.util.ArrayList;
import java.util.List;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.benkyo.dao.DepartmentDao;
import com.benkyo.dao.UsersDao;
import com.benkyo.entity.gen.Users;
import com.benkyo.model.dto.User;

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
        usersDao.getUserList().stream().forEach(userEntity -> {
            userList.add(this.of(userEntity));
        });

        return userList;
    }

    public int createUser(Users user) {
        PasswordEncoder encoder = PasswordEncoderFactories.createDelegatingPasswordEncoder();
        user.setPassword(encoder.encode(user.getPassword()));
        return usersDao.createUser(user);
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
