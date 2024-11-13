package com.turnos.turnos.Controllers;

import com.turnos.turnos.DTOs.ResponseMessage;
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
import java.util.ArrayList;
import java.util.Collection;
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

    @PostMapping("/altaTurnos")
    public ResponseEntity<ResponseMessage> altaTurnos(@RequestBody ArrayList<Turno> turnos) {
        ArrayList<Turno> turnosNew = new ArrayList<>();

        for(Turno turno : turnos){
            Turno nuevoTurno = turnoService.altaTurno(
                    turno.getFecha(),
                    turno.getPaciente(),
                    turno.getMedico());

            turnosNew.add(nuevoTurno);

        }
        if(turnosNew.isEmpty()){
            return ResponseEntity.ok(new ResponseMessage("No se publicaron turnos nuevos, revisar la configuracion"));
        }
        String cantidadPublicados = String.valueOf(turnosNew.size());
        return ResponseEntity.ok(new ResponseMessage(cantidadPublicados + " turnos publicados con exito."));

    }

    @PostMapping("/reservarTurno")
    public ResponseEntity<Turno> reservarTurno(@RequestBody Turno turno) {
        return (ResponseEntity<Turno>) turnoService.reservarTurno(turno);
    }

    @PostMapping("/cancelarTurno")
    public ResponseEntity<ResponseMessage> cancelarTurno(@RequestBody Turno turno) {
        return turnoService.cancelarTurno(turno);
    }



    @GetMapping("/verTurnos")
    public ResponseEntity<List<Turno>> verTurnos(
            @RequestParam("especialidadId") long especialidadId,
            @RequestParam(value = "obrasocialId", required = false) Long obrasocialId) {

        List<Turno> turnos;
        if (obrasocialId != null) {
            // Filtrar por especialidad y obra social si ambos están presentes
            turnos = turnoService.verTurnosPorEspecialidadYObraSocial(especialidadId, obrasocialId);
        } else {
            // Filtrar solo por especialidad cuando obra social no está presente
            turnos = turnoService.verTurnos(especialidadId);
        }
        return ResponseEntity.ok(turnos);
    }

    @GetMapping("/verTurnosReservados")
    public ResponseEntity<List<Turno>> verTurnosReservados(@RequestParam("pacienteId") long pacienteId){
        return ResponseEntity.ok(turnoService.verTurnosReservados(pacienteId));
    }

}
