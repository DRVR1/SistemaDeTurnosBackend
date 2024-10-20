package com.turnos.turnos.Controllers;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.view.RedirectView;

@Controller
public class HomeController {

    @GetMapping("/")
    public String home(Model model) {
        // Devuelve el nombre de la vista (index.html dentro de templates)
        model.addAttribute("appName", "Hospital Nombre");
        return "index";
    }
}
