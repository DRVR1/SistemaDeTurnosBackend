package com.turnos.turnos;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;

@RestController
public class EspecialidadController {
    private final EspecialiadService especialiadService = new EspecialiadService();

    @PostMapping("/altaEspecialidad")
    public void altaEspecialidad(
            @RequestParam String nombre
    ) throws SQLException {
        especialiadService.altaEspecialidad(nombre);
    }
}
