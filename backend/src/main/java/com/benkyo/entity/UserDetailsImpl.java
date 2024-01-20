package com.benkyo.entity;

import java.util.Collection;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import com.benkyo.entity.gen.Users;

public class UserDetailsImpl implements UserDetails {
    private Users user;

    public UserDetailsImpl(Users user) {
        this.user = user;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public String getPassword() {
        // TODO Auto-generated method stub
        return this.user.getPassword();
    }

    @Override
    public String getUsername() {
        // TODO Auto-generated method stub
        return this.user.getLoginId();
    }

    @Override
    public boolean isAccountNonExpired() {
        // TODO Auto-generated method stub
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        // TODO Auto-generated method stub
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        // TODO Auto-generated method stub
        return true;
    }

    @Override
    public boolean isEnabled() {
        // TODO Auto-generated method stub
        return true;
    }

    public int getId() {
        return this.user.getId();
    }

    // LoginIDではなく、名前
    public String getName() {
        return this.user.getName();
    }

    public int getDepartmentId() {
        return this.user.getDepartmentId();
    }


}
