package com.turnos.turnos.Services;

import com.turnos.turnos.Entities.Especialidad;
import com.turnos.turnos.Entities.Medico;
import com.turnos.turnos.Entities.Paciente;
import com.turnos.turnos.Repositories.MedicoRepository;
import com.turnos.turnos.Repositories.PacienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MedicoService {

    @Autowired
    private MedicoRepository medicoRepository;

    public Medico altaMedico(String dni,
                             String telefono,
                             String nombre,
                             String apellido,
                             String mail,
                             String pass,
                             Especialidad especialidad) {

        Medico medico = new Medico(dni,telefono,nombre,apellido,mail,pass,especialidad);
        return medicoRepository.save(medico);
    }

    public Medico findByDni(String dni) {
        return medicoRepository.findByDni(dni); // Método a implementar en el repositorio
    }

    public Medico findByEmail(String email){
        return medicoRepository.findByEmail(email);
    }
}
