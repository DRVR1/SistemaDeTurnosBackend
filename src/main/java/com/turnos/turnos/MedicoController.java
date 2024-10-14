package com.turnos.turnos;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;

@RestController
public class MedicoController {
    private final MedicoService medicoService = new MedicoService();

    @PostMapping("/altaMedico")
    public void altaMedico(
            @RequestParam String nombre,
            @RequestParam String apellido,
            @RequestParam int telefono,
            @RequestParam int dni,
            @RequestParam int especialidadID,
            @RequestParam String mail
    ) throws SQLException {
        medicoService.altaMedico(dni,telefono,nombre,apellido,especialidadID);
    }
}
