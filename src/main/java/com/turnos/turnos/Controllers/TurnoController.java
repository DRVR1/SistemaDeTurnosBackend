package com.turnos.turnos.Controllers;

import com.turnos.turnos.Entities.Especialidad;
import com.turnos.turnos.Entities.Medico;
import com.turnos.turnos.Entities.Paciente;
import com.turnos.turnos.Entities.Turno;
import com.turnos.turnos.Services.EspecialidadService;
import com.turnos.turnos.Services.MedicoService;
import com.turnos.turnos.Services.PacienteService;
import com.turnos.turnos.Services.TurnoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api")
public class TurnoController {

    @Autowired
    private TurnoService turnoService;

    @PostMapping("/altaTurno")
    public ResponseEntity<Turno> altaTurno(@RequestBody Turno turno) {
        Turno nuevoTurno = turnoService.altaTurno(
                turno.getFecha(),
                turno.getPaciente(),
                turno.getMedico());
        return ResponseEntity.ok(nuevoTurno);
    }

    @PostMapping("/reservarTurno")
    public ResponseEntity<Turno> reservarTurno(@RequestBody Turno turno) {
        return (ResponseEntity<Turno>) turnoService.reservarTurno(turno);
    }


    @GetMapping("/verTurnos")
    public ResponseEntity<List<Turno>> verTurnos(@RequestParam long id){
        return ResponseEntity.ok(turnoService.verTurnos(id));
    }

    @GetMapping("/verTurnosReservados")
    public ResponseEntity<List<Turno>> verTurnosReservados(@RequestParam long pacienteId){
        return ResponseEntity.ok(turnoService.verTurnosReservados(pacienteId));
    }

}
