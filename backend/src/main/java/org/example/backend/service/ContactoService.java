package org.example.backend.service;

import org.example.backend.entity.Contacto;
import org.example.backend.entity.User;

import java.util.List;
import java.util.Optional;


public interface ContactoService {
    List<Contacto> findAll();

    Optional<Contacto> findById(Integer contacto_id);

    void save(Contacto contacto);

    List<Contacto> findByAsesorDni(User asesor);
}
