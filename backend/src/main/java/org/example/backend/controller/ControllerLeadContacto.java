package org.example.backend.controller;

import org.example.backend.entity.LeadContacto;
import org.example.backend.service.LeadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequestMapping("/lead")
public class ControllerLeadContacto {
    private LeadService leadService;

    @Autowired
    ControllerLeadContacto(LeadService leadService){
        this.leadService = leadService;
    }

    @GetMapping("/all")
    public List<LeadContacto> getAll(){
        return leadService.findAll();
    }

    @GetMapping("/{lead_id}")
    public LeadContacto getById(@PathVariable Integer lead_id){
        return leadService.findById(lead_id).get();
    }
}
