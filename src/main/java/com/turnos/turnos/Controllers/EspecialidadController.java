package com.turnos.turnos.Controllers;

import com.turnos.turnos.Entities.Especialidad;
import com.turnos.turnos.Entities.Medico;
import com.turnos.turnos.Entities.Paciente;
import com.turnos.turnos.Services.EspecialidadService;
import com.turnos.turnos.Services.MedicoService;
import com.turnos.turnos.Services.PacienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class EspecialidadController {

    @Autowired
    private EspecialidadService especialidadService;

    @PostMapping("/altaEspecialidad")
    public ResponseEntity<Especialidad> altaEspecialidad(@RequestBody Especialidad especialidad) {
        Especialidad nuevaEspecialidad = especialidadService.altaEspecialidad(especialidad.getNombre());
        return ResponseEntity.ok(nuevaEspecialidad);
    }

    @GetMapping("/verEspecialidades")
    public ResponseEntity<List<Especialidad>> verEspecialidades(){
        return ResponseEntity.ok(especialidadService.verEspecialidades());
    }

}
