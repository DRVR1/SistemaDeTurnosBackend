package com.turnos.turnos;

import java.sql.SQLException;

public class PacienteService {
    public void altaPaciente(int dni,int telefono, String nombre, String apellido) throws SQLException {
        Paciente p = new Paciente(dni, telefono, nombre, apellido);

        PacienteRepository repo = new PacienteRepository();
        repo.guardarPaciente(p.dni,p.telefono,p.nombre,p.apellido);
    }
}
