package com.jahnelgroup.server.controller;

import com.jahnelgroup.server.models.User;
import com.jahnelgroup.server.service.MyUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;

@Component
public class DBController {

    @Autowired
    private MyUserDetailsService myUserDetailsService;

    @PostConstruct
    private void postConstruct() {

        if(!myUserDetailsService.findById(1).isPresent()) {
            User user1 = new User();
            user1.setId(1);
            user1.setUsername("user1");
            user1.setPassword("pass");
            user1.setActive(true);
            user1.setRoles("ROLE_USER");
            myUserDetailsService.save(user1);
        }

        if(!myUserDetailsService.findById(2).isPresent()) {
            User user2 = new User();
            user2.setId(2);
            user2.setUsername("user2");
            user2.setPassword("pass");
            user2.setActive(true);
            user2.setRoles("ROLE_USER");
            myUserDetailsService.save(user2);
        }

        if(!myUserDetailsService.findById(3).isPresent()) {
            User user3 = new User();
            user3.setId(3);
            user3.setUsername("user3");
            user3.setPassword("pass");
            user3.setActive(true);
            user3.setRoles("ROLE_USER");
            myUserDetailsService.save(user3);
        }
    }
}
