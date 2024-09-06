package com.turnos.turnos;

import java.sql.SQLException;

public class EspecialiadService {

    public void altaEspecialidad(String nombre) throws SQLException {

        Especialidad especialidad = new Especialidad(nombre);

        EspecialidadRepository repo = new EspecialidadRepository();
        repo.guardarEspecialidad(especialidad.nombre);

    }
}
