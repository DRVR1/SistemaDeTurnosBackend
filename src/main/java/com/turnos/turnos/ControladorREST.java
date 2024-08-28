package com.turnos.turnos;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
@Slf4j
public class ControladorREST {
    @GetMapping("/")
    public String comienzo(){
        return "index";
    }
}
