package com.turnos.turnos.Medico;

import com.turnos.turnos.SQLServer;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class MedicoRepository {

    private final SQLServer db = SQLServer.getInstance();
    private final Connection connection = db.getConnection();

    public void guardarMedico(int dni,int telefono, String nombre, String apellido, int especialidadID) throws SQLException {
        String query = "INSERT INTO Medico (nombre, apellido, telefono, dni, especialidadID) VALUES (?, ?, ?, ?, ?)";
        PreparedStatement preparedStatement = connection.prepareStatement(query);
        preparedStatement.setString(1, nombre);
        preparedStatement.setString(2, apellido);
        preparedStatement.setInt(3, telefono);
        preparedStatement.setInt(4, dni);
        preparedStatement.setInt(5, especialidadID);
        preparedStatement.executeUpdate();
    }

}
