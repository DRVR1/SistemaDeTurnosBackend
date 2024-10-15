package com.turnos.turnos.Services;

import com.turnos.turnos.Entities.Paciente;
import com.turnos.turnos.Repositories.PacienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PacienteService {

    @Autowired
    private PacienteRepository pacienteRepository;

    public Paciente altaPaciente(String dni, String telefono, String nombre, String apellido, String mail, String pass) {
        Paciente paciente = new Paciente(dni, telefono, nombre, apellido, mail, pass);
        return pacienteRepository.save(paciente);
    }

    public Paciente obtenerPacientePorDni(String dni) {
        return pacienteRepository.findByDni(dni); // Método a implementar en el repositorio
    }
}
