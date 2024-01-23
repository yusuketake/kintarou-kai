package com.benkyo.service;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import com.benkyo.dao.UsersDao;
import com.benkyo.entity.UserDetailsImpl;
import com.benkyo.entity.gen.Users;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    private UsersDao usersDao;

    public UserDetailsServiceImpl(UsersDao usersDao) {
        this.usersDao = usersDao;
    }

    @Override
    public UserDetails loadUserByUsername(String loginId) throws UsernameNotFoundException {
        // TODO Auto-generated method stub
        Users user = usersDao.getUserByLoginId(loginId);
        if (user == null) {
            throw new UsernameNotFoundException(loginId);
        }
        return new UserDetailsImpl(user);
    }


}
