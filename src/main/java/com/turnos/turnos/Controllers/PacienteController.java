package com.turnos.turnos.Controllers;

import com.turnos.turnos.DTOs.ResponseMessage;
import com.turnos.turnos.Entities.Paciente;
import com.turnos.turnos.Services.PacienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class PacienteController {

    @Autowired
    private PacienteService pacienteService;

    @PostMapping("/altaPaciente")
    public ResponseEntity<ResponseMessage> altaPaciente(@RequestBody Paciente paciente) {
        return pacienteService.altaPaciente(paciente.getDni(), paciente.getTelefono(),
                paciente.getNombre(), paciente.getApellido(), paciente.getEmail(), paciente.getPassword(),paciente.getObrasocial());
    }

    @GetMapping("/{dni}")
    public ResponseEntity<Paciente> obtenerPacientePorDni(@PathVariable String dni) {
        Paciente paciente = pacienteService.obtenerPacientePorDni(dni);
        return ResponseEntity.ok(paciente);
    }
    @GetMapping("/verPacientes") // Nuevo endpoint para ver todos los pacientes
    public ResponseEntity<List<Paciente>> verPacientes() {
        List<Paciente> pacientes = pacienteService.obtenerTodosLosPacientes();
        return ResponseEntity.ok(pacientes);
    }
}
