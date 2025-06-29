package org.example.backend.controller;


import org.example.backend.dto.UserDto;
import org.example.backend.entity.*;
import org.example.backend.repository.*;
import org.example.backend.security.CustomUserDetails;
import org.example.backend.security.CustomUserDetailsService;
import org.example.backend.service.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.io.InputStream;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;


@Controller
@RequestMapping("/user")
public class ControllerViewUser {
    private final UserServiceImp userServiceImp;
    private final AuthorityRepository authorityRepository;
    private final LeadRepository leadRepository;
    private final LeadContactoImp leadContactoImp;
    private final ContactoRepository contactoRepository;
    private final ContactoServiceImp contactoServiceImp;
    private final EmpresaRepository empresaRepository;
    private final EmpresaPlanRepository empresaPlanRepository;
    private final CustomUserDetailsService customUserDetailsService;

    public ControllerViewUser(UserServiceImp userServiceImp, AuthorityRepository authorityRepository, LeadRepository leadRepository, LeadContactoImp leadContactoImp, ContactoRepository contactoRepository, ContactoServiceImp contactoServiceImp, EmpresaRepository empresaRepository, EmpresaPlanRepository empresaPlanRepository, CustomUserDetailsService customUserDetailsService) {
        this.userServiceImp = userServiceImp;
        this.authorityRepository = authorityRepository;
        this.leadRepository = leadRepository;
        this.leadContactoImp = leadContactoImp;
        this.contactoRepository = contactoRepository;
        this.contactoServiceImp = contactoServiceImp;
        this.empresaRepository = empresaRepository;
        this.empresaPlanRepository = empresaPlanRepository;
        this.customUserDetailsService = customUserDetailsService;
    }


    @GetMapping("/")
    public String inicio(){
        return "inicio";
    }       
    @GetMapping("/registro")
    public String registro() {
        return "registro";
    }

    @GetMapping("/leads")
    public String leads(Model model) {
        model.addAttribute("listaLeads",leadContactoImp.findByEstadoNot("ASIGNADO"));
        model.addAttribute("listaAsesores",userServiceImp.findByRole("ROLE_ASESOR"));
        model.addAttribute("contacto",new Contacto());
        return "leads";
    }

    @GetMapping("/leadAsesor")
    public String leadAsesor(Model model) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        if (auth.getPrincipal() instanceof CustomUserDetails userDetails) {
            User user = userDetails.getUser();
            model.addAttribute("listaContacto", contactoServiceImp.findByAsesorDni(user));
        } else {
            model.addAttribute("listaContacto", List.of());
        }
        model.addAttribute("lead",new Contacto());
        return "leadAsesor";
    }

    @PostMapping("/leads")
    public String registrarLead(@ModelAttribute Contacto contacto,
                                @RequestParam(value = "leadId", required = false) Integer leadId) {

        if (leadId != null) {
            // Buscar el LeadContacto por ID usando el repositorio
            Optional<LeadContacto> leadContactoOpt = leadRepository.findById(leadId);
            if (leadContactoOpt.isPresent()) {
                LeadContacto leadContacto = leadContactoOpt.get();

                // Asignar la referencia del lead al contacto
                contacto.setLead(leadContacto);

                // Establecer otros campos por defecto
                contacto.setFechaContacto(LocalDate.now());
                contacto.setEstado("SIN ATENDER");

                // Guardar el contacto
                contactoServiceImp.save(contacto);

                // Cambiar el estado del lead para marcarlo como "asignado" en lugar de eliminarlo
                leadContacto.setEstado("ASIGNADO");
                leadRepository.save(leadContacto);

                return "redirect:/user/leads?success";

            } else {
                System.err.println("Lead no encontrado con ID: " + leadId);
                return "redirect:/user/leads?error=leadNotFound";
            }
        } else {
            System.err.println("No se recibió leadId en el formulario");
            return "redirect:/user/leads?error=noLeadId";
        }
    }


    @GetMapping("/empresas")
    public String empresas(Model model){
        model.addAttribute("listaEmpresas", empresaRepository.findAll());
        model.addAttribute("listaPlanes", empresaPlanRepository.findAll()); // Necesitas crear este repository
        model.addAttribute("empresa", new Empresa());
        model.addAttribute("empresaPlan", new EmpresaPlan()); // Agregar el objeto para el formulario
        return "empresas";
    }

    // Método para crear nuevo plan
    @PostMapping("/planes")
    public String agregarPlan(@ModelAttribute EmpresaPlan empresaPlan){
        empresaPlanRepository.save(empresaPlan);
        return "redirect:/user/empresas?planSuccess";
    }

    // Método para eliminar plan
    @PostMapping("/planes/delete/{id}")
    public String eliminarPlan(@PathVariable("id") Integer id) {
        empresaPlanRepository.deleteById(id);
        return "redirect:/user/empresas?planDeleted=success";
    }

    // Método para actualizar plan
    @PostMapping("/planes/update")
    public String actualizarPlan(@ModelAttribute("empresaPlan") EmpresaPlan planActualizado) {
        EmpresaPlan planExistente = empresaPlanRepository.findById(planActualizado.getId()).orElse(null);

        if (planExistente != null) {
            planExistente.setTipo(planActualizado.getTipo());
            planExistente.setPrecio(planActualizado.getPrecio());
            planExistente.setDescripcion(planActualizado.getDescripcion());
            planExistente.setIdEmpresa(planActualizado.getIdEmpresa());
            empresaPlanRepository.save(planExistente);
        }

        return "redirect:/user/empresas?planUpdated=success";
    }

    @PostMapping("/empresas/delete/{id}")
    public String eliminarEmpresa(@PathVariable("id") Integer id) {
        empresaRepository.deleteById(id);
        return "redirect:/user/empresas?deleted=success";
    }

    @GetMapping("/empresas/editar/{id}")
    public String editarEmpresa(@PathVariable("id") Integer id, Model model) {
        Empresa empresa = empresaRepository.findById(id).orElse(null);
        model.addAttribute("empresa", empresa);
        model.addAttribute("listaEmpresas", empresaRepository.findAll());
        return "empresas";
    }

    @PostMapping("/empresas/update")
    public String actualizarEmpresa(@ModelAttribute("empresa") Empresa empresaActualizada) {
        Empresa empresaExistente = empresaRepository.findById(empresaActualizada.getId()).orElse(null);

        if (empresaExistente != null) {
            empresaExistente.setNombreEmpresa1(empresaActualizada.getNombreEmpresa1());
            empresaRepository.save(empresaExistente);
        }

        return "redirect:/user/empresas?success";
    }


    @GetMapping("/perfil")
    public String perfil() {
        return "perfil";
    }
    @GetMapping("/asistenciaSeguimiento")
    public String asistenciaSeguimiento() {
        return "asistenciaSeguimiento";
    }
    @GetMapping("/actividades")
    public String actividades() {
        return "actividades";
    }

    @GetMapping("/detallesAdmin")
    public String detallesAdmin() {
        return "detallesAdmin";
    }

    @GetMapping("/ayudaAdmin")
    public String ayudaAdmin() {
        return "ayudaAdmin";
    }

    @GetMapping("/ayudaAsesor")
    public String ayudaAsesor() {
        return "ayudaAsesor";
    }

    @GetMapping("/admin")
    public String registerForm(Model model){
        model.addAttribute("listaUsuarios", userServiceImp.findAll());
        model.addAttribute("usuario", new UserDto());
        model.addAttribute("listaAuthorities", authorityRepository.findAll());
        return "admin";
    }

    @PostMapping("/admin")
    public String register(@ModelAttribute UserDto userDto){
        userServiceImp.save(userDto);
        return "redirect:/user/admin?success";
    }

    @PostMapping("/delete/{id}")
    public String delete(@PathVariable("id") String dni) {
        userServiceImp.deleteByDni(dni);
        return "redirect:/user/admin?deleted=success";
    }

    // Nuevo método para importar leads desde Excel
    @PostMapping("/importar/excel")
    public String importarExcel(@RequestParam("file") MultipartFile file, RedirectAttributes redirectAttributes) {
        if (file.isEmpty()) {
            redirectAttributes.addFlashAttribute("error", "Por favor, seleccione un archivo para subir.");
            return "redirect:/user/leads";
        }
        try (InputStream inputStream = file.getInputStream()) {
            leadContactoImp.importarLeadsDesdeExcel(inputStream);
            redirectAttributes.addFlashAttribute("success", "Archivo importado correctamente.");
        } catch (Exception e) {
            e.printStackTrace();
            redirectAttributes.addFlashAttribute("error", "Error al importar el archivo: " + e.getMessage());
        }
        return "redirect:/user/leads";
    }


    @GetMapping("/access-denied")
    public String accessDenied() {
        return "access-denied";
    }

    @GetMapping("/editar/{dni}")
    public String editarUsuario(@PathVariable("dni") String dni, Model model) {
        UserDto userDto = userServiceImp.findById(dni);
        model.addAttribute("usuario", userDto);
        model.addAttribute("listaUsuarios", userServiceImp.findAll());
        model.addAttribute("listaAuthorities", authorityRepository.findAll());
        return "admin";
    }

    @PostMapping("/update")
    public String actualizarUsuario(@ModelAttribute("usuario") UserDto usuarioActualizado) {
        UserDto usuarioExistente = userServiceImp.findById(usuarioActualizado.getDni());

        if (usuarioExistente != null) {
            usuarioExistente.setNombres(usuarioActualizado.getNombres());
            usuarioExistente.setApellidos(usuarioActualizado.getApellidos());
            usuarioExistente.setGenero(usuarioActualizado.getGenero());
            usuarioExistente.setAuthorityId(usuarioActualizado.getAuthorityId());

            userServiceImp.save(usuarioExistente);
        }

        return "redirect:/user/admin";
    }



}
