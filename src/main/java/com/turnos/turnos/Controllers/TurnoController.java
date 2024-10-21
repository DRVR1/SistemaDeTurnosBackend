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
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.HashMap;


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

    @PostMapping("/cancelarTurno")
    public ResponseEntity<ResponseMessage> cancelarTurno(@RequestBody Turno turno) {
        return turnoService.cancelarTurno(turno);
    }


    @GetMapping("/verTurnos")
    public ResponseEntity<List<Turno>> verTurnos(@RequestParam long id) {
        return ResponseEntity.ok(turnoService.verTurnos(id));
    }

    @GetMapping("/verTurnosReservados")
    public ResponseEntity<List<Turno>> verTurnosReservados(@RequestParam long pacienteId) {
        return ResponseEntity.ok(turnoService.verTurnosReservados(pacienteId));
    }

    @Autowired
    private JavaMailSender mailSender;

    @PostMapping("/agendar-turno")
    public Map<String, Object> agendarTurno(@RequestBody Map<String, String> request) {
        String name = request.get("name");
        String email = request.get("email");
        String date = request.get("date");

        // Enviar correo
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("Turno Agendado");
        message.setText("Hola " + name + ", tu turno para el día " + date + " ha sido agendado exitosamente.");

        Map<String, Object> response = new HashMap<>();
        try {
            mailSender.send(message);
            response.put("success", true);
            response.put("message", "Correo enviado exitosamente.");
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Error al enviar el correo.");
        }

        return response;

    }
}