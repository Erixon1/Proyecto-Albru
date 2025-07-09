package org.example.backend.service;

import org.example.backend.entity.Empresa;
import org.example.backend.repository.EmpresaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmpresaServiceImp implements EmpresaService {

    private final EmpresaRepository empresaRepository;

    @Autowired
    public EmpresaServiceImp(EmpresaRepository empresaRepository){
        this.empresaRepository = empresaRepository;
    }

    @Override
    public List<Empresa> getAll() {
        return empresaRepository.findAll();
    }

    @Override
    public Optional<Empresa> findById(Integer id) {
        return empresaRepository.findById(id);
    }

    @Override
    public void save(Empresa empresa) {
        empresaRepository.save(empresa);
    }

    @Override
    public void deleteById(Integer id) {
        empresaRepository.deleteById(id);
    }
}
