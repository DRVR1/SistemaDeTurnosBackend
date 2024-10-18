package com.turnos.turnos.Services;

import com.turnos.turnos.DTOs.ResponseMessage;
import com.turnos.turnos.Entities.Especialidad;
import com.turnos.turnos.Entities.Medico;
import com.turnos.turnos.Entities.Paciente;
import com.turnos.turnos.Entities.Turno;
import com.turnos.turnos.Repositories.PacienteRepository;
import com.turnos.turnos.Repositories.TurnoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class TurnoService {

    @Autowired
    private TurnoRepository turnoRepository;

    @Autowired
    private PacienteRepository pacienteRepository;

    public Turno altaTurno(LocalDateTime fecha, Paciente paciente, Medico medico) {
        Turno turno = new Turno(fecha, paciente, medico);
        return turnoRepository.save(turno);
    }

    public List<Turno> verTurnos(long id){
        return turnoRepository.findByMedicoEspecialidadIdAndPacienteIsNull(id);
    }

    public List<Turno> verTurnosReservados(long id){
        return turnoRepository.findByPacienteId(id);
    }

    public ResponseEntity<?> reservarTurno(Turno turnoRecibido) {
        Long pacienteId = turnoRecibido.getPaciente().getId();
        Long turnoId = turnoRecibido.getId();

        Optional<Turno> turnoOptional = turnoRepository.findById(turnoId);
        if (turnoOptional.isPresent()) {
            Turno turno = turnoOptional.get();
            if (turno.getPaciente() != null) {
                return ResponseEntity.status(409).body(new ResponseMessage("El turno ya está reservado."));
            }
            Optional<Paciente> pacienteOptional = pacienteRepository.findById(pacienteId);
            if (pacienteOptional.isPresent()) {
                turno.setPaciente(pacienteOptional.get());
                turnoRepository.save(turno);
                return ResponseEntity.ok(new ResponseMessage("Turno reservado con éxito."));
            } else {
                return ResponseEntity.status(404).body(new ResponseMessage("Paciente no encontrado."));
            }
        } else {
            return ResponseEntity.status(404).body(new ResponseMessage("Turno no encontrado."));
        }
    }

}
