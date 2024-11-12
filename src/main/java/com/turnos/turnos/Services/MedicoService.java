package com.turnos.turnos.Services;

import com.turnos.turnos.Entities.Especialidad;
import com.turnos.turnos.Entities.Medico;
import com.turnos.turnos.Entities.ObraSocial;
import com.turnos.turnos.Entities.Paciente;
import com.turnos.turnos.Repositories.MedicoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MedicoService {

    @Autowired
    private MedicoRepository medicoRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public Medico altaMedico(String dni,
                             String telefono,
                             String nombre,
                             String apellido,
                             String mail,
                             String password,
                             Especialidad especialidad,
                             List<ObraSocial> obrasSociales) {

        String encodedPass = passwordEncoder.encode(password);
        Medico medico = new Medico(dni, telefono, nombre, apellido, mail, encodedPass, especialidad);
        medico.setObrasociales(obrasSociales); // Asignar la lista de obras sociales

        return medicoRepository.save(medico);
    }

    public Medico findByDni(String dni) {
        return medicoRepository.findByDni(dni); // Método a implementar en el repositorio
    }

    public Medico findByEmail(String email) {
        return medicoRepository.findByEmail(email);
    }

    public List<Medico> obtenerTodosLosMedicos() {
        return medicoRepository.findAll(); // Asumiendo que tienes un método findAll() en el repositorio
    }
}
//