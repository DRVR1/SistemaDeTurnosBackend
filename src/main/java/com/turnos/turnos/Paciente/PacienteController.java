package com.turnos.turnos.Paciente;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/pacientes")
public class PacienteController {

    @Autowired
    private PacienteService pacienteService;

    @PostMapping("/altaPaciente")
    public ResponseEntity<Paciente> altaPaciente(@RequestBody Paciente paciente) {
        Paciente nuevoPaciente = pacienteService.registrarPaciente(paciente.getDni(), paciente.getTelefono(),
                paciente.getNombre(), paciente.getApellido(), paciente.getMail(), paciente.getPass());
        return ResponseEntity.ok(nuevoPaciente);
    }

    @GetMapping("/{dni}")
    public ResponseEntity<Paciente> obtenerPacientePorDni(@PathVariable String dni) {
        Paciente paciente = pacienteService.obtenerPacientePorDni(dni);
        return ResponseEntity.ok(paciente);
    }
}
