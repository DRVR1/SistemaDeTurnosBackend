package com.turnos.turnos.Paciente;

import java.sql.SQLException;

public class PacienteService {
    public void altaPaciente(int dni,int telefono, String nombre, String apellido, String mail, String pass) throws SQLException {
        Paciente p = new Paciente(dni, telefono, nombre, apellido, mail, pass);

        PacienteRepository repo = new PacienteRepository();
        repo.guardarPaciente(p.dni, p.telefono, p.nombre, p.apellido, p.mail, p.pass);
    }
}
