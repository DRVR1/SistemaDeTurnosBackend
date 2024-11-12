package com.turnos.turnos.Controllers;

import com.turnos.turnos.Entities.Medico;
import com.turnos.turnos.Entities.Paciente;
import com.turnos.turnos.Services.MedicoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class MedicoController {

    @Autowired
    private MedicoService medicoService;

    @PostMapping("/altaMedico")
    public ResponseEntity<Medico> altaMedico(@RequestBody Medico medico) {
        Medico nuevoMedico = medicoService.altaMedico(
                medico.getDni(),
                medico.getTelefono(),
                medico.getNombre(),
                medico.getApellido(),
                medico.getEmail(),
                medico.getPassword(),
                medico.getEspecialidad(),
                medico.getObrasociales() // Pasar la lista de obras sociales
        );
        return ResponseEntity.ok(nuevoMedico);
    }

    @GetMapping("/verDatosMedico")
    public ResponseEntity<?> obtenerMedicoPorId(@RequestParam Long id) {
        return medicoService.obtenerMedicoPorId(id);
    }

    @GetMapping("/verMedicos") // Nuevo endpoint para ver todos los pacientes
    public ResponseEntity<List<Medico>> verMedicos() {
        List<Medico> medicos = medicoService.obtenerTodosLosMedicos();
        return ResponseEntity.ok(medicos);}
}
