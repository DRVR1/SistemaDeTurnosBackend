package com.turnos.turnos.Controllers;

import com.turnos.turnos.Entities.Admin;
import com.turnos.turnos.Entities.Paciente;
import com.turnos.turnos.Services.AdminService;
import com.turnos.turnos.Services.PacienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @PostMapping("/altaAdmin")
    public ResponseEntity<Admin> altaAdmin(@RequestBody Admin admin) {
        Admin nuevoAdmin = adminService.altaAdmin(admin.getDni(), admin.getTelefono(),
                admin.getNombre(), admin.getApellido(), admin.getEmail(), admin.getPassword());
        return ResponseEntity.ok(nuevoAdmin);
    }

}
