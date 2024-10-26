package com.turnos.turnos.Repositories;

import com.turnos.turnos.Entities.Paciente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PacienteRepository extends JpaRepository<Paciente, Long> {

    Paciente findByDni(String dni);

    Paciente findByEmail(String email);
}
