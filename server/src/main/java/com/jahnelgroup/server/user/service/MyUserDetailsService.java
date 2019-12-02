package com.jahnelgroup.server.user.service;

import com.jahnelgroup.server.user.repository.UserRepository;
import com.jahnelgroup.server.user.model.MyUserDetails;
import com.jahnelgroup.server.user.model.User;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MyUserDetailsService implements UserDetailsService {

    private UserRepository userRepository;

    /*
        Lazy Injection to avoid circular dependency
        Allowed SecurityConfiguration to init the password encoder
     */
    @Autowired  @Lazy
    private PasswordEncoder passwordEncoder;

    @Autowired
    public MyUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> findAll() {
        return userRepository.findAll();
    }

    public Optional<User> findById(Integer id) {
        return userRepository.findById(id);
    }

    public User save(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public void deleteById(Integer id) {
        userRepository.deleteById(id);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException{
        Optional<User> user = userRepository.findByUsername(username);

        user.orElseThrow(() -> new UsernameNotFoundException("Not found: " + username));

        return user.map(MyUserDetails::new).get();
    }
}
