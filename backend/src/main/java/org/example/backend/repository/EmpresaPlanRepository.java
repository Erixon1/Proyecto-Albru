package org.example.backend.repository;

import org.example.backend.entity.EmpresaPlan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmpresaPlanRepository extends JpaRepository<EmpresaPlan,Integer> {
}
