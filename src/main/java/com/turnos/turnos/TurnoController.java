package com.turnos.turnos;
import java.sql.SQLException;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.LocalDateTime;

import org.springframework.web.bind.annotation.*;

@RestController
public class TurnoController {
    private final TurnoService turnoService = new TurnoService();

    @PostMapping("/reservarTurno")
    public void reservarTurno(
            @RequestParam int hora,
            @RequestParam int minuto,
            @RequestParam int dia,
            @RequestParam int mes,
            @RequestParam int año,
            @RequestParam int pacienteID,
            @RequestParam int medicoID
            ) throws SQLException {
        LocalTime time = LocalTime.of(hora,minuto);
        LocalDate date = LocalDate.of(año,mes,dia);
        LocalDateTime fecha = LocalDateTime.of(date,time);

        turnoService.reservarTurno(fecha ,pacienteID, medicoID);
    }
}
