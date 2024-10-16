package com.turnos.turnos.Services;
import aj.org.objectweb.asm.Opcodes;
import com.turnos.turnos.Entities.*;
import com.turnos.turnos.Repositories.AdminRepository;
import com.turnos.turnos.Repositories.MedicoRepository;
import com.turnos.turnos.Repositories.PacienteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserEntityService {

    @Autowired
    private final PacienteRepository pacienteRepository;

    @Autowired
    private final MedicoRepository medicoRepository;

    @Autowired
    private final AdminRepository adminRepository;


    public Optional<Persona> findByEmail(String email) {
        Medico medico = medicoRepository.findByEmail(email);
        if (medico != null){
            return Optional.of(medico);
        }
        Paciente paciente = pacienteRepository.findByEmail(email);
        if (paciente != null){
            return Optional.of(paciente);
        }

        Admin admin = adminRepository.findByEmail(email);
        if (admin != null){
            return Optional.of(admin);
        }
        return Optional.empty();
    }
}
