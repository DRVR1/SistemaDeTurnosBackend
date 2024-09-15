package com.turnos.turnos;
import java.sql.SQLException;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
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

    @PostMapping("/altaTurnos") // Solo lo puede hacer un medico
    public void altaTurnos(@RequestBody List<Turno> turnos) throws SQLException {
        for (Turno turno : turnos){
            turnoService.altaTurno(turno.fecha,turno.medicoID);
        }
    }

    @RequestMapping("verTurnos")
    public ResponseEntity<ArrayList<TurnoDTO>> verTurnos(
            @RequestParam int especialidadID
    ) throws SQLException {
        ArrayList<TurnoDTO> listaTurnosDTO = turnoService.verTurnosDisponibles(especialidadID);
        return ResponseEntity.ok(listaTurnosDTO);
    }


    @PostMapping("/reservarTurno") // Solo lo puede hacer un paciente
    public ResponseEntity<String> reservarTurno(
            @RequestParam int turnoID,
            @RequestParam int pacienteID
    ) throws SQLException {
        boolean reservado = turnoService.reservarTurno(turnoID, pacienteID);
        if (reservado) {
            return ResponseEntity.ok("Turno reservado exitosamente.");
        } else {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("No se pudo reservar el turno. Puede que ya esté reservado.");
        }
    }




}
