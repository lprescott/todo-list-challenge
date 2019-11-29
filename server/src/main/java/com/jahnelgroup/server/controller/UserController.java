package com.jahnelgroup.server.controller;

import com.jahnelgroup.server.models.MyUserDetails;
import com.jahnelgroup.server.models.User;
import com.jahnelgroup.server.service.MyUserDetailsService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/user")
@Slf4j
@RequiredArgsConstructor
public class UserController {

    private MyUserDetailsService myUserDetailsService;

    @Autowired
    public UserController(MyUserDetailsService myUserDetailsService) {
        this.myUserDetailsService = myUserDetailsService;
    }


    @GetMapping
    public ResponseEntity<User> getCurrentUser(@AuthenticationPrincipal MyUserDetails myUserDetails) {
        return ResponseEntity.ok(myUserDetails.toUser());
    }
}
