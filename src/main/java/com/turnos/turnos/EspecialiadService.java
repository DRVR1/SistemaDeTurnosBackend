package com.turnos.turnos;

import java.sql.SQLException;
import java.util.ArrayList;

public class EspecialiadService {

    EspecialidadRepository repo = new EspecialidadRepository();

    public void altaEspecialidad(String nombre) throws SQLException {

        Especialidad especialidad = new Especialidad(nombre);
        repo.guardarEspecialidad(especialidad.nombre);

    }

    public ArrayList<EspecialidadDTO> verEspecialidades() throws SQLException {
        return repo.verEspecialidades();
    }
}
