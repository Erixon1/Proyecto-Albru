package org.example.backend.repository;

import org.example.backend.entity.LeadContacto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LeadRepository extends JpaRepository<LeadContacto,Integer> {
    List<LeadContacto> findByEstadoNot(String estado);

}
