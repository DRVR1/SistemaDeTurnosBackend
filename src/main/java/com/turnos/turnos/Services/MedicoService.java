package com.turnos.turnos.Services;

import com.turnos.turnos.Entities.Especialidad;
import com.turnos.turnos.Entities.Medico;
import com.turnos.turnos.Entities.ObraSocial; // Asegúrate de tener esta importación
import com.turnos.turnos.Repositories.MedicoRepository;
import com.turnos.turnos.Repositories.ObraSocialRepository; // Añadido para acceder a las obras sociales
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MedicoService {

    @Autowired
    private MedicoRepository medicoRepository;

    @Autowired
    private ObraSocialRepository obraSocialRepository; // Añadido para acceder a las obras sociales

    @Autowired
    private PasswordEncoder passwordEncoder;

    public Medico altaMedico(String dni,
                             String telefono,
                             String nombre,
                             String apellido,
                             String mail,
                             String password,
                             Especialidad especialidad,
                             Long obraSocialId) { // Añadido parámetro obraSocialId

        // Verificar si la obra social existe
        Optional<ObraSocial> obraSocialOptional = obraSocialRepository.findById(obraSocialId);
        if (obraSocialOptional.isEmpty()) {
            throw new IllegalArgumentException("Obra social no encontrada."); // O maneja esto como desees
        }

        String encodedPass = passwordEncoder.encode(password);
        Medico medico = new Medico(dni, telefono, nombre, apellido, mail, encodedPass, especialidad, obraSocialOptional.get()); // Añadido obra social
        return medicoRepository.save(medico);
    }

    public Medico findByDni(String dni) {
        return medicoRepository.findByDni(dni); // Método a implementar en el repositorio
    }

    public Medico findByEmail(String email) {
        return medicoRepository.findByEmail(email);
    }
}