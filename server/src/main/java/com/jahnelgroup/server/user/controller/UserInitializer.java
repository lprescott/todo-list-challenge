package com.jahnelgroup.server.user.controller;

import com.jahnelgroup.server.user.service.MyUserDetailsService;
import com.jahnelgroup.server.user.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;

/**
 * this function adds three default users to the database,
 */
@Component
public class UserInitializer {

    private MyUserDetailsService myUserDetailsService;
    private PasswordEncoder passwordEncoder;

    @Autowired
    public UserInitializer(MyUserDetailsService myUserDetailsService, PasswordEncoder passwordEncoder) {
        this.myUserDetailsService = myUserDetailsService;
        this.passwordEncoder = passwordEncoder;
    }

    @PostConstruct
    private void postConstruct() {

        if (!myUserDetailsService.findById(1).isPresent()) {
            User user1 = new User();
            user1.setId(1);
            user1.setUsername("user1");
            user1.setPassword(passwordEncoder.encode("pass"));
            user1.setActive(true);
            user1.setRoles("ROLE_USER");
            myUserDetailsService.save(user1);
        }

        if (!myUserDetailsService.findById(2).isPresent()) {
            User user2 = new User();
            user2.setId(2);
            user2.setUsername("user2");
            user2.setPassword(passwordEncoder.encode("pass"));
            user2.setActive(true);
            user2.setRoles("ROLE_USER");
            myUserDetailsService.save(user2);
        }

        if (!myUserDetailsService.findById(3).isPresent()) {
            User user3 = new User();
            user3.setId(3);
            user3.setUsername("user3");
            user3.setPassword(passwordEncoder.encode("pass"));
            user3.setActive(true);
            user3.setRoles("ROLE_USER");
            myUserDetailsService.save(user3);
        }
    }
}
