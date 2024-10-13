package com.turnos.turnos.Medico;

import java.sql.SQLException;

public class MedicoService {

    public void altaMedico(int dni,int telefono, String nombre, String apellido, int especialidadID) throws SQLException {

        Medico m = new Medico(dni, telefono, nombre, apellido, especialidadID);

        MedicoRepository repo = new MedicoRepository();
        repo.guardarMedico(m.dni,m.telefono,m.nombre,m.apellido,m.especialidadID);

    }
}
