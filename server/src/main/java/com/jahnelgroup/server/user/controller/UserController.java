package com.jahnelgroup.server.user.controller;

import com.jahnelgroup.server.security.JwtUtil;
import com.jahnelgroup.server.user.model.MyUserDetails;
import com.jahnelgroup.server.user.repository.UserRepository;
import com.jahnelgroup.server.user.service.MyUserDetailsService;
import com.jahnelgroup.server.user.model.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.annotation.RegisteredOAuth2AuthorizedClient;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@Slf4j
@RequiredArgsConstructor
public class UserController {

    private MyUserDetailsService myUserDetailsService;
    private PasswordEncoder passwordEncoder;
    private JwtUtil jwtUtil;

    @Autowired
    public UserController(MyUserDetailsService myUserDetailsService, PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.myUserDetailsService = myUserDetailsService;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    @GetMapping(path = "/user/current")
    public ResponseEntity<Object> getCurrentUser(Model model,
                                                 @RegisteredOAuth2AuthorizedClient OAuth2AuthorizedClient authorizedClient,
                                                 @AuthenticationPrincipal OAuth2User oauth2User) {

        if (myUserDetailsService.findById(oauth2User.getAttribute("id")).isEmpty()) {
            User temp = new User(oauth2User.getAttribute("id"), oauth2User.getAttribute("login"), "null", true, "ROLE_USER");
            myUserDetailsService.save(temp);
        }

        return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(
                "{\"user\": {\"id\": "+oauth2User.getAttribute("id")+", \"username\":\""+oauth2User.getAttribute("login")+"\", \"password\":\"null\", \"active\": \"true\", \"roles\":\"ROLE_USER\"}, \"jwt\": \"" + this.jwtUtil.generateToken(oauth2User) + "\"}"
        );

    }

    @GetMapping("/users")
    public ResponseEntity<List<User>> findAll() {
        return ResponseEntity.ok(myUserDetailsService.findAll());
    }

    @PostMapping("/users")
    public ResponseEntity<Object> create(@Valid @RequestBody User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return ResponseEntity.ok(myUserDetailsService.save(user));
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<User> findById(@PathVariable Integer id) {
        Optional<User> user = myUserDetailsService.findById(id);
        if (user.isEmpty()) {
            log.error("Id " + id + " is not existed");
            return ResponseEntity.badRequest().build();
        } else {
            return ResponseEntity.ok(user.get());
        }
    }

    @PutMapping("/users/{id}")
    public ResponseEntity<User> update(@PathVariable Integer id, @Valid @RequestBody User user) {
        if (myUserDetailsService.findById(id).isEmpty()) {
            log.error("Id " + id + " is not existed");
            ResponseEntity.badRequest().build();
        }

        return ResponseEntity.ok(myUserDetailsService.save(user));
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<Object> delete(@PathVariable Integer id) {
        if (myUserDetailsService.findById(id).isEmpty()) {
            log.error("Id " + id + " is not existed");
            ResponseEntity.badRequest().build();
        }

        myUserDetailsService.deleteById(id);

        return ResponseEntity.ok().build();
    }
}
