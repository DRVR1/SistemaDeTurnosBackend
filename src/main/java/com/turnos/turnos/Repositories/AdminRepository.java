package com.turnos.turnos.Repositories;

import com.turnos.turnos.Entities.Admin;
import com.turnos.turnos.Entities.Paciente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminRepository extends JpaRepository<Admin, Long> {

    Admin findByDni(String dni);

    Admin findByEmail(String email);
}
