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
    @GetMapping("/perfil")
    public String perfil() {
        return "perfil";
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

}
