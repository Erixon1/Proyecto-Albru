package org.example.backend.service;

import org.example.backend.entity.EmpresaPlan;

import java.util.List;
import java.util.Optional;

public interface EmpresaPlanService {
    List<EmpresaPlan> getAll();

    Optional<EmpresaPlan> findById(Integer id);

    void save(EmpresaPlan plan);

    void deleteById(Integer id);
}
