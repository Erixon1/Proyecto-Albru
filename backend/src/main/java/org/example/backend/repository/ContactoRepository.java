package org.example.backend.repository;

import org.example.backend.entity.Contacto;
import org.example.backend.entity.User;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ContactoRepository extends JpaRepository<Contacto, Integer> {
    @EntityGraph(attributePaths = {"lead"})
    List<Contacto> findContactoByAsesorDni(User asesorDni);
}
