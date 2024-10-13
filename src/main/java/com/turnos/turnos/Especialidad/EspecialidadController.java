package com.turnos.turnos.Especialidad;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.ArrayList;

import org.springframework.http.ResponseEntity;


@RestController
public class EspecialidadController {
    private final EspecialiadService especialiadService = new EspecialiadService();

    @PostMapping("/altaEspecialidad")
    public void altaEspecialidad(
            @RequestParam String nombre
    ) throws SQLException {
        especialiadService.altaEspecialidad(nombre);
    }


    @RequestMapping("/verEspecialidades")
    public ResponseEntity<ArrayList<EspecialidadDTO>> verEspecialidades(
    ) throws SQLException {
        ArrayList<EspecialidadDTO> especialidades = especialiadService.verEspecialidades();
        return ResponseEntity.ok(especialidades);
    }


}
