package com.turnos.turnos.Repositories;

import com.turnos.turnos.Entities.ObraSocial;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ObraSocialRepository extends JpaRepository<ObraSocial, Long> {
}