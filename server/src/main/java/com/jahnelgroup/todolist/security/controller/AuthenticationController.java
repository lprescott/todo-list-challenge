package com.jahnelgroup.todolist.security.controller;

import com.jahnelgroup.todolist.security.JsonWebToken;
import com.jahnelgroup.todolist.user.model.User;
import com.jahnelgroup.todolist.user.service.UserService;
import io.jsonwebtoken.Claims;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/auth")
@Slf4j
@RequiredArgsConstructor
public class AuthenticationController {

    @NonNull
    private UserService userService;

    @GetMapping("/login/{username}")
    public ResponseEntity<String> login(@PathVariable String username) {

        String jwtToken;
        List<User> all = this.userService.findAll();
        if (all.size() == 0) {
            log.info("Username " + username + " does not exist.");
            return new ResponseEntity<>("Unauthorized", HttpStatus.UNAUTHORIZED);
        }

        for (User u : all) {
            if (u.getName().equals(username)) {
                jwtToken = JsonWebToken.createJWT("todolist.jahnelgroup.com", "" + u.getId(), 0);
                return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body("{\"user\":{\"id\":" + u.getId()
                        + ",\"name\":\"" + u.getName() + "\"},\"jwt\":\"" + jwtToken + "\"}");
            }
        }

        log.info("Username " + username + " does not exist.");
        return new ResponseEntity<>("Unauthorized", HttpStatus.UNAUTHORIZED);
    }

    @GetMapping("/{jwt}")
    public ResponseEntity<String> authenticate(@PathVariable String jwt) {

        try {
            Claims claims = JsonWebToken.decodeJWT(jwt);
            String userID = claims.getSubject();
            return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body("{\"uid\":" + userID + "}");

        } catch (Exception e) {
            return new ResponseEntity<>("Unauthorized", HttpStatus.UNAUTHORIZED);
        }
    }
}
