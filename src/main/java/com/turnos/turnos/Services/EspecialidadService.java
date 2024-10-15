package com.turnos.turnos.Services;

import com.turnos.turnos.Entities.Especialidad;
import com.turnos.turnos.Entities.Medico;
import com.turnos.turnos.Entities.Paciente;
import com.turnos.turnos.Repositories.EspecialidadRepository;
import com.turnos.turnos.Repositories.MedicoRepository;
import com.turnos.turnos.Repositories.PacienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EspecialidadService {

    @Autowired
    private EspecialidadRepository especialidadRepository;

    public Especialidad altaEspecialidad(String nombre) {
        Especialidad especialidad = new Especialidad(nombre);
        return especialidadRepository.save(especialidad);
    }

    public List<Especialidad> verEspecialidades(){
        return especialidadRepository.findAll();
    }

}
