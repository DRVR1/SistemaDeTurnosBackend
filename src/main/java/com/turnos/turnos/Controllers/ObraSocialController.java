package com.turnos.turnos.Controllers;

import com.turnos.turnos.Entities.ObraSocial;
import com.turnos.turnos.Services.ObraSocialService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/obras-sociales")
public class ObraSocialController {

    @Autowired
    private ObraSocialService obraSocialService;

    @PostMapping
    public ResponseEntity<ObraSocial> agregarObraSocial(@RequestBody ObraSocial obraSocial) {
        ObraSocial nuevaObraSocial = obraSocialService.agregarObraSocial(obraSocial);
        return ResponseEntity.ok(nuevaObraSocial);
    }

    @GetMapping
    public ResponseEntity<List<ObraSocial>> listarObrasSociales() {
        return ResponseEntity.ok(obraSocialService.listarObrasSociales());
    }
}