package org.example.backend.service;

import org.example.backend.entity.Empresa;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


public interface EmpresaService {

    List<Empresa> getAll();

    Optional<Empresa> findById(Integer id);

    void save(Empresa empresa);

    void deleteById(Integer id);
}
