package com.turnos.turnos.Controllers;

import com.turnos.turnos.Entities.Medico;
import com.turnos.turnos.Entities.ObraSocial;
import com.turnos.turnos.Services.MedicoService;
import com.turnos.turnos.Services.ObraSocialService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class MedicoController {

    @Autowired
    private MedicoService medicoService;

    @PostMapping("/altaMedico")
    public ResponseEntity<Medico> altaMedico(@RequestBody Medico medico) {
        Medico nuevoMedico = medicoService.altaMedico(medico.getDni(), medico.getTelefono(),
                medico.getNombre(), medico.getApellido(), medico.getEmail(), medico.getPassword(),medico.getEspecialidad(),medico.getObraSOcial());
        return ResponseEntity.ok(nuevoMedico);
    }

}
