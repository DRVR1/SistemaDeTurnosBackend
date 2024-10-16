package com.turnos.turnos.Repositories;

import com.turnos.turnos.Entities.Medico;
import com.turnos.turnos.Entities.Paciente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MedicoRepository extends JpaRepository<Medico, Long> {

    Medico findByDni(String dni);

    Medico findByEmail(String Email);

}
