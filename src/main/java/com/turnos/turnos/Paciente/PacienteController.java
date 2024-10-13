package com.turnos.turnos.Paciente;
import com.turnos.turnos.Turno.Turno;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.List;

@RestController
public class PacienteController {
    private final PacienteService pacienteService = new PacienteService();

    @PostMapping("/altaPaciente")
    public void altaPaciente(
            @RequestParam String nombre,
            @RequestParam String apellido,
            @RequestParam int telefono,
            @RequestParam int dni,
            @RequestParam String mail,
            @RequestParam String pass
    ) throws SQLException {
        pacienteService.altaPaciente(dni,telefono,nombre,apellido,mail, pass);
    }

}
