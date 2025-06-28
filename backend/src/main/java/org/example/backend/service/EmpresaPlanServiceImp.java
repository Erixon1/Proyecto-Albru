package org.example.backend.service;

import org.example.backend.entity.EmpresaPlan;
import org.example.backend.repository.EmpresaPlanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmpresaPlanServiceImp implements EmpresaPlanService{

    private final EmpresaPlanRepository empresaPlanRepository;

    @Autowired
    public EmpresaPlanServiceImp(EmpresaPlanRepository empresaPlanRepository){
        this.empresaPlanRepository= empresaPlanRepository;
    }

    @Override
    public List<EmpresaPlan> getAll() {
        return List.of();
    }

    @Override
    public Optional<EmpresaPlan> findById(Integer id) {
        return Optional.empty();
    }

    @Override
    public void save(EmpresaPlan plan) {

    }

    @Override
    public void deleteById(Integer id) {

    }
}
