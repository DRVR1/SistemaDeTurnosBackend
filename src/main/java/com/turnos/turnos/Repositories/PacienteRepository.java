package com.turnos.turnos.Repositories;

import com.turnos.turnos.Entities.Paciente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PacienteRepository extends JpaRepository<Paciente, Long> {

    Paciente findByDni(String dni);

    Optional<Paciente> findById(Long id);

    Paciente findByEmail(String email);
}
