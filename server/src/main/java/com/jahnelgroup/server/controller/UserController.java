package com.jahnelgroup.server.controller;

import com.jahnelgroup.server.models.MyUserDetails;
import com.jahnelgroup.server.models.User;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/user")
@Slf4j
@RequiredArgsConstructor
public class UserController {

    @NonNull
    private UserDetailsService userDetailsService;

    @GetMapping
    public ResponseEntity<User> getCurrentUser(@AuthenticationPrincipal MyUserDetails myUserDetails) {
        return ResponseEntity.ok(myUserDetails.toUser());
    }
}
