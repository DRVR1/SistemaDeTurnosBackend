package com.turnos.turnos.Medico;

import java.sql.SQLException;

public class MedicoService {
    private MedicoRepository repo = new MedicoRepository();

    public void altaMedico(int dni,int telefono, String nombre, String apellido, int especialidadID, String mail, String pass) throws SQLException {

        Medico m = new Medico(dni, telefono, nombre, apellido, especialidadID, mail, pass);
        repo.guardarMedico(m.dni,m.telefono,m.nombre,m.apellido,m.especialidadID, m.mail, m.pass);

    }

    public void loginMedico(String mail, String pass) throws SQLException {
        repo.loginMedico(mail,pass);
    }
}