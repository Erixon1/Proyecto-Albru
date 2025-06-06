package org.example.backend.controller;


import org.example.backend.dto.UserDto;
import org.example.backend.entity.User;
import org.example.backend.repository.AuthorityRepository;
import org.example.backend.service.UserService;
import org.example.backend.service.UserServiceImp;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;


@Controller
@RequestMapping("/user")
public class ControllerViewUser {
    private final UserServiceImp userServiceImp;
    private final AuthorityRepository authorityRepository;

    public ControllerViewUser(UserServiceImp userServiceImp, AuthorityRepository authorityRepository) {
        this.userServiceImp = userServiceImp;
        this.authorityRepository = authorityRepository;
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
    public String leads() {
        return "leads";
    }
    @GetMapping("/perfil")
    public String perfil() {
        return "perfil";
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
