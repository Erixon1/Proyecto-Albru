package org.example.backend.service;

import org.example.backend.entity.User;

import java.util.List;

public interface UserService {
    List<User> findAll();

    User findById(String dni);
}
