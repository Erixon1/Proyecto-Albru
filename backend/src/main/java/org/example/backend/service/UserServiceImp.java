package org.example.backend.service;

import org.example.backend.entity.Authority;
import org.example.backend.entity.User;
import org.example.backend.repository.AuthorityRepository;
import org.example.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImp implements UserService {
    private final PasswordEncoder passwordEncoder;
    private UserRepository userRepository;
    private final AuthorityRepository authorityRepository;

    @Autowired
    public UserServiceImp(UserRepository userRepository, PasswordEncoder passwordEncoder, AuthorityRepository authorityRepository){
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authorityRepository = authorityRepository;
    }

    @Override
    public List<User> findAll() {
        return userRepository.findAll();
    }

    @Override
    public User findById(String dni) {
        Optional<User> result = userRepository.findById(dni);
        User temp = null;
        if(result.isPresent()){
            temp = result.get();
        }
        return temp;
    }

    @Override
    public void save(User user) {
        Optional<Authority> authority = authorityRepository.findById(user.getAuthority().getId());
        user.setAuthority(authority.get());
        user.setEnabled(true);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
    }


}
