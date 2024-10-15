package com.turnos.turnos.Services;

import com.turnos.turnos.Entities.Especialidad;
import com.turnos.turnos.Entities.Medico;
import com.turnos.turnos.Entities.Paciente;
import com.turnos.turnos.Entities.Turno;
import com.turnos.turnos.Repositories.PacienteRepository;
import com.turnos.turnos.Repositories.TurnoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class TurnoService {

    @Autowired
    private TurnoRepository turnoRepository;

    public Turno altaTurno(LocalDateTime fecha, Paciente paciente, Medico medico) {
        Turno turno = new Turno(fecha, paciente, medico);
        return turnoRepository.save(turno);
    }

    public List<Turno> verTurnos(long id){
        return turnoRepository.findByMedicoEspecialidadId(id);
    }

}
