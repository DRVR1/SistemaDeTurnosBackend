package com.turnos.turnos;

import org.springframework.web.bind.annotation.*;

import java.util.Date;

@RestController
public class TurnoController {
    private TurnoService turnoService = new TurnoService();

    @PostMapping("/reservar")
    public void reservarTurno(
            @RequestParam int fecha,
            @RequestParam String nombre,
            @RequestParam String apellido,
            @RequestParam int telefono,
            @RequestParam int id,
            @RequestParam int dni
            )
    {
        turnoService.reservarTurno(1,fecha,new Paciente(id,dni,telefono,nombre,apellido));
    }
}
