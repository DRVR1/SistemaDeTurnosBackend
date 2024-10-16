package com.turnos.turnos.Services;
import aj.org.objectweb.asm.Opcodes;
import com.turnos.turnos.Entities.Medico;
import com.turnos.turnos.Entities.Paciente;
import com.turnos.turnos.Entities.Persona;
import com.turnos.turnos.Entities.UserEntity;
import com.turnos.turnos.Repositories.MedicoRepository;
import com.turnos.turnos.Repositories.PacienteRepository;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.util.Objects;
import java.util.Optional;

@Service
public class UserEntityService {

    private final PacienteRepository pacienteRepository;
    private final MedicoRepository medicoRepository;

    public UserEntityService(PacienteRepository pacienteRepository, MedicoRepository medicoRepository) {
        this.pacienteRepository = pacienteRepository;
        this.medicoRepository = medicoRepository;
    }

    public Optional<Persona> findByEmail(String email) {
        Medico medico = medicoRepository.findByEmail(email);
        if (medico != null){
            return Optional.of(medico);
        }
        Paciente paciente = pacienteRepository.findByEmail(email);
        if (paciente != null){
            return Optional.of(paciente);
        }
        return Optional.empty();
    }
}
