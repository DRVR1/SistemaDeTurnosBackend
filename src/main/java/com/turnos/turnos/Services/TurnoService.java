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

    public List<Turno> verTurnosPorEspecialidad(long especialidadId) {
            return turnoRepository.findByMedicoEspecialidadIdAndPacienteIsNullAndFechaAfterOrderByFechaAsc(especialidadId, LocalDateTime.now());
    }

    public List<Turno> verTurnosPorEspecialidadYObraSocial(Long especialidadId, Long obrasocialId) {
        if (obrasocialId != null) {
            // Filtra por especialidad y obra social
            return turnoRepository.findByMedicoEspecialidadIdAndMedicoObrasocialesIdAndPacienteIsNullAndFechaAfterOrderByFechaAsc(
                    especialidadId, obrasocialId, LocalDateTime.now()
            );
        } else {
            // Filtra solo por especialidad cuando no se especifica obra social
            return turnoRepository.findByMedicoEspecialidadIdAndPacienteIsNullAndFechaAfterOrderByFechaAsc(especialidadId, LocalDateTime.now()
            );
        }
    }

    public List<Turno> verTurnosReservados(long id){
        return turnoRepository.findByPacienteId(id);
    }

    public ResponseEntity<ResponseMessage> cancelarTurno(Turno turnoDado){
        long id = turnoDado.getId();
        Optional<Turno> turnoOptional = turnoRepository.findById(id);
        if (turnoOptional.isPresent()){
            Turno turno = turnoOptional.get();
            if (turno.getPaciente() == null){
                return ResponseEntity.ok(new ResponseMessage("El turno ya fue cancelado"));
            }
            turno.setPaciente(null);
            turnoRepository.save(turno);
            return ResponseEntity.ok(new ResponseMessage("Turno cancelado con exito"));
        }else{
            return ResponseEntity.status(404).body(new ResponseMessage("Turno no encontrado"));
        }

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
                return ResponseEntity.ok(new ResponseMessage("Turno reservado con éxito. Puede visualizarlo en la pestaña de turnos reservados."));
            } else {
                return ResponseEntity.status(404).body(new ResponseMessage("Paciente no encontrado."));
            }
        } else {
            return ResponseEntity.status(404).body(new ResponseMessage("Turno no encontrado."));
        }
    }

}
