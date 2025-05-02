package org.example.backend.controller;

import org.example.backend.entity.User;
import org.example.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/user")
public class ControllerUser {
    private UserService userService;

    @Autowired
    public ControllerUser(UserService userService){
        this.userService = userService;
    }


    @GetMapping("/all")
    public List<User> findAll(){
        return userService.findAll();
    }


    @GetMapping(path = "/{dni}")
    public User finById(@PathVariable String dni){
        return userService.findById(dni);
    }
}
