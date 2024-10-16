package com.turnos.turnos.Services;

import com.turnos.turnos.Entities.Paciente;
import com.turnos.turnos.Repositories.PacienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class PacienteService {

    @Autowired
    private PacienteRepository pacienteRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public Paciente altaPaciente(String dni,
                                 String telefono,
                                 String nombre,
                                 String apellido,
                                 String email,
                                 String password) {
        String encodedPass = passwordEncoder.encode(password);
        Paciente paciente = new Paciente(dni, telefono, nombre, apellido, email, encodedPass);
        return pacienteRepository.save(paciente);
    }

    public Paciente obtenerPacientePorDni(String dni) {
        return pacienteRepository.findByDni(dni); // Método a implementar en el repositorio
    }
}
