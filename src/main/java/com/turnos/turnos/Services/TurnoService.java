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
    private EmailService emailService;

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

    /*public ResponseEntity<ResponseMessage> cancelarTurno(Turno turnoDado){
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

    }*/
    public ResponseEntity<ResponseMessage> cancelarTurno(Turno turnoDado) {
        long id = turnoDado.getId();
        Optional<Turno> turnoOptional = turnoRepository.findById(id);
        if (turnoOptional.isPresent()) {
            Turno turno = turnoOptional.get();

            if (turno.getPaciente() == null) {
                return ResponseEntity.ok(new ResponseMessage("El turno ya fue cancelado"));
            }

            // Guardamos el paciente actual antes de cancelar el turno
            Paciente paciente = turno.getPaciente();

            // Cancelamos el turno
            turno.setPaciente(null);
            turnoRepository.save(turno);

            // Enviar correo al paciente informando que el turno fue cancelado
            String email = paciente.getEmail();
            String subject = "Confirmación de Cancelación de Turno";
            String body = "Hola " + paciente.getNombre() + ", tu turno ha sido cancelado con éxito." ;
            emailService.sendEmail(email, subject, body);

            return ResponseEntity.ok(new ResponseMessage("Turno cancelado con éxito"));
        } else {
            return ResponseEntity.status(404).body(new ResponseMessage("Turno no encontrado"));
        }
    }


    /*public ResponseEntity<?> reservarTurno(Turno turnoRecibido) {
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
    }*/
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

                Medico medico = turno.getMedico();
                // Envía el correo al paciente
                String email = pacienteOptional.get().getEmail();
                String subject = "Confirmación de Reserva de Turno";
                String body = "Hola " + pacienteOptional.get().getNombre() + ", tu turno ha sido reservado con éxito. \n" +
                        "Fecha del turno: " + turno.getFecha() + "\n" +
                        "Medico: " + medico.getNombre() + " " + medico.getApellido() + "\n" +
                        "Especialidad: " + medico.getEspecialidad().getNombre() + "\n\n" +
                        "Gracias por confiar en nosotros.";

                emailService.sendEmail(email, subject, body);
                /*// Detalles del turno
                String fecha = turno.getFecha();  // Asegúrate de que existe un campo `fecha`
                String hora = turno.getHora();    // Asegúrate de que existe un campo `hora`
                String ubicacion = turno.getUbicacion(); // Campo `ubicacion` si lo tienes

                // Envía el correo al paciente
                String email = pacienteOptional.get().getEmail();
                String subject = "Confirmación de Reserva de Turno";
                String body = "Hola " + pacienteOptional.get().getNombre() + ",\n\n" +
                        "Tu turno ha sido reservado con éxito. Aquí tienes los detalles:\n\n" +
                        "Fecha: " + fecha + "\n" +
                        "Hora: " + hora + "\n" +
                        "Ubicación: " + ubicacion + "\n\n" +
                        "Gracias por confiar en nosotros.";*/

                return ResponseEntity.ok(new ResponseMessage("Turno reservado con éxito. Puede visualizarlo en la pestaña de turnos reservados."));
            } else {
                return ResponseEntity.status(404).body(new ResponseMessage("Paciente no encontrado."));
            }
        } else {
            return ResponseEntity.status(404).body(new ResponseMessage("Turno no encontrado."));
        }
    }


}
