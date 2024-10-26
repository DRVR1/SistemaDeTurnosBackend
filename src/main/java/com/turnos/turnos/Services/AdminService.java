package com.turnos.turnos.Services;

import com.turnos.turnos.Entities.Admin;
import com.turnos.turnos.Repositories.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public Admin altaAdmin(String dni,
                              String telefono,
                              String nombre,
                              String apellido,
                              String email,
                              String password) {
        String encodedPass = passwordEncoder.encode(password);
        Admin admin = new Admin(dni, telefono, nombre, apellido, email, encodedPass);
        return adminRepository.save(admin);
    }

}
