package com.turnos.turnos.Controllers;

import com.turnos.turnos.Entities.ObraSocial;
import com.turnos.turnos.Services.ObraSocialService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ObraSocialController {

    @Autowired
    private ObraSocialService obrasocialService;

    @PostMapping("/altaObraSocial")
    public ResponseEntity<ObraSocial> altaObraSocial(@RequestBody ObraSocial obrasocial) {
        ObraSocial nuevaObraSocial = obrasocialService.altaObraSocial(obrasocial.getNombre());
        return ResponseEntity.ok(nuevaObraSocial);
    }

    @GetMapping("/verObraSociales")
    public ResponseEntity<List<ObraSocial>> verObraSociales(){
        return ResponseEntity.ok(obrasocialService.verObraSocial());
    }

}//