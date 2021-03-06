package com.jahnelgroup.server.user.model;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

public class MyUserDetails implements UserDetails {

    private static final long serialVersionUID = 1L;

    private int id;
    private String username;
    private String password;
    private boolean active;
    private List<GrantedAuthority> authorities;

    /**
     * converts a passed user into a MyUserDetails class
     *
     * @param user the passed user object
     */
    public MyUserDetails(User user) {
        this.id = user.getId();
        this.username = user.getUsername();
        this.password = user.getPassword();
        this.active = user.getActive();
        this.authorities = Arrays.stream(user.getRoles().split(","))
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());
    }

    /**
     * converts a MyUserDetails class to a User class
     *
     * @return a user object
     */
    public User toUser() {
        User temp = new User();
        temp.setId(this.id);
        temp.setActive(this.active);
        temp.setUsername(this.username);
        temp.setPassword(this.password);
        temp.setRoles(this.authorities.get(0).toString());
        return temp;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
