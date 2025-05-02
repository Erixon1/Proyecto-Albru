package org.example.backend.service;

import org.example.backend.entity.LeadContacto;
import org.example.backend.repository.LeadRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class LeadContactoImp implements LeadService {

    LeadRepository leadRepository;

    @Autowired
    public LeadContactoImp(LeadRepository leadRepository){
        this.leadRepository= leadRepository;
    }

    @Override
    public List<LeadContacto> findAll() {
        return leadRepository.findAll();
    }

    @Override
    public Optional<LeadContacto> findById(Integer lead_id) {
        Optional<LeadContacto> lead = null;
        lead = leadRepository.findById(lead_id);
        return lead;
    }

    @Override
    public void save(LeadContacto leadContacto) {
        leadRepository.save(leadContacto);
    }
}
