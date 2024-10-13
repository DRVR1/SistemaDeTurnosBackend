package com.turnos.turnos.Paciente;

import com.turnos.turnos.SQLServer;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class PacienteRepository {

    private final SQLServer db = SQLServer.getInstance();
    private final Connection connection = db.getConnection();

    public void guardarPaciente(int dni,int telefono, String nombre, String apellido, String mail, String pass) throws SQLException {
        String query = "INSERT INTO Paciente (nombre, apellido, telefono, dni, mail, pass) VALUES (?, ?, ?, ?, ?, ?)";
        PreparedStatement preparedStatement = connection.prepareStatement(query);
        preparedStatement.setString(1, nombre);
        preparedStatement.setString(2, apellido);
        preparedStatement.setInt(3, telefono);
        preparedStatement.setInt(4, dni);
        preparedStatement.setString(5, mail);
        preparedStatement.setString(6, pass);
        preparedStatement.executeUpdate();
    }

}
