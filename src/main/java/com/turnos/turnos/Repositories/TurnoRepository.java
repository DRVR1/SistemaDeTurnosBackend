package com.turnos.turnos.Repositories;

import com.turnos.turnos.Entities.Turno;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TurnoRepository extends JpaRepository<Turno, Long> {
    List<Turno> findByMedicoEspecialidadId(Long especialidadId);
}
