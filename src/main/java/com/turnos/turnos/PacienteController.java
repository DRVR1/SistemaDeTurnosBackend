package com.turnos.turnos;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;

@RestController
public class PacienteController {
    private final PacienteService pacienteService = new PacienteService();

    @PostMapping("/altaPaciente")
    public void altaPaciente(
            @RequestParam String nombre,
            @RequestParam String apellido,
            @RequestParam int telefono,
            @RequestParam int dni,
            @RequestParam String mail
    ) throws SQLException {
        pacienteService.altaPaciente(dni,telefono,nombre,apellido,mail);
    }
}
