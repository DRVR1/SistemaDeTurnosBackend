package com.turnos.turnos;
import java.sql.SQLException;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.LocalDateTime;
import java.util.ArrayList;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class TurnoController {
    private final TurnoService turnoService = new TurnoService();

    @PostMapping("/altaTurno") // Solo lo puede hacer un medico
    public void altaTurno(
            @RequestParam int hora,
            @RequestParam int minuto,
            @RequestParam int dia,
            @RequestParam int mes,
            @RequestParam int año,
            @RequestParam int medicoID
            ) throws SQLException {
        LocalTime time = LocalTime.of(hora,minuto);
        LocalDate date = LocalDate.of(año,mes,dia);
        LocalDateTime fecha = LocalDateTime.of(date,time);

        turnoService.altaTurno(fecha, medicoID);
    }

    @PostMapping("/reservarTurno") // Solo lo puede hacer un paciente
    public void reservarTurno(
            @RequestParam int turnoID,
            @RequestParam int pacienteID
    ) throws SQLException {
        turnoService.reservarTurno(turnoID, pacienteID);
    }

    @RequestMapping("verTurnos")
    public ResponseEntity<ArrayList<TurnoDTO>> verTurnos(
            @RequestParam int especialidadID
    ) throws SQLException {
        ArrayList<TurnoDTO> listaTurnosDTO = turnoService.verTurnosDisponibles(especialidadID);
        return ResponseEntity.ok(listaTurnosDTO);
    }
}
