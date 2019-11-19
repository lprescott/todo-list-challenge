package com.jahnelgroup.todolist.user.controller;

import com.jahnelgroup.todolist.security.JWT;
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

import javax.servlet.http.HttpSession;
import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "/users")
@Slf4j
@RequiredArgsConstructor
public class UserController {

    @NonNull
    private UserService userService;

    @GetMapping
    public ResponseEntity<List<User>> findAll() {
        return ResponseEntity.ok(userService.findAll());
    }

    @PostMapping
    public ResponseEntity<Object> create(@Valid @RequestBody User user) {
        return ResponseEntity.ok(userService.save(user));
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> findById(@PathVariable Long id) {
        Optional<User> user = userService.findById(id);
        if (!user.isPresent()) {
            log.error("Id " + id + " is not existed");
            ResponseEntity.badRequest().build();
        }

        return ResponseEntity.ok(user.get());
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> update(@PathVariable Long id, @Valid @RequestBody User user) {
        if (!userService.findById(id).isPresent()) {
            log.error("Id " + id + " is not existed");
            ResponseEntity.badRequest().build();
        }

        return ResponseEntity.ok(userService.save(user));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> delete(@PathVariable Long id) {
        if (!userService.findById(id).isPresent()) {
            log.error("Id " + id + " is not existed");
            ResponseEntity.badRequest().build();
        }

        userService.deleteById(id);

        return ResponseEntity.ok().build();
    }

    @GetMapping("/login/{username}")
    public ResponseEntity<String> login(@PathVariable String username) {

        String jwtToken;
        List<User> all = this.userService.findAll();
        if(all.size() == 0) {
            log.info("Username " + username + " does not exist.");
            return new ResponseEntity<>("Unauthorized", HttpStatus.UNAUTHORIZED);
        }

        for(User u : all) {
            if(u.getName().equals(username)) {
                jwtToken = JWT.createJWT("todolist.jahnelgroup.com",  "" + u.getId(), 0);
                return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body("{\"user\":{\"id\":" + u.getId()
                        + ",\"name\":\"" + u.getName() + "\"},\"jwt\":\"" + jwtToken + "\"}");
            }
        }

        log.info("Username " + username + " does not exist.");
        return new ResponseEntity<>("Unauthorized", HttpStatus.UNAUTHORIZED);
    }

    @GetMapping("/authenticate/{jwt}")
    public ResponseEntity<String> authenticate(@PathVariable String jwt) {

        try{
            Claims claims = JWT.decodeJWT(jwt);
            String userID = claims.getSubject();
            return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body("{\"uid\":" + userID + "}");

        } catch (Exception e) {
            System.out.println("Failure");
            return new ResponseEntity<>("Unauthorized", HttpStatus.UNAUTHORIZED);
        }
    }
}
