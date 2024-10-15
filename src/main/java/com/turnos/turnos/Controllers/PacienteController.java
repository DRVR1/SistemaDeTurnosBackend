package com.turnos.turnos.Controllers;

import com.turnos.turnos.Entities.Paciente;
import com.turnos.turnos.Services.PacienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class PacienteController {

    @Autowired
    private PacienteService pacienteService;

    @PostMapping("/altaPaciente")
    public ResponseEntity<Paciente> altaPaciente(@RequestBody Paciente paciente) {
        Paciente nuevoPaciente = pacienteService.altaPaciente(paciente.getDni(), paciente.getTelefono(),
                paciente.getNombre(), paciente.getApellido(), paciente.getEmail(), paciente.getPassword());
        return ResponseEntity.ok(nuevoPaciente);
    }

    @GetMapping("/{dni}")
    public ResponseEntity<Paciente> obtenerPacientePorDni(@PathVariable String dni) {
        Paciente paciente = pacienteService.obtenerPacientePorDni(dni);
        return ResponseEntity.ok(paciente);
    }
}
