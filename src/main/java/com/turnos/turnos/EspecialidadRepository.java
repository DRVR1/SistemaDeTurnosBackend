package com.turnos.turnos;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class EspecialidadRepository {

    private final SQLServer db = SQLServer.getInstance();
    private final Connection connection = db.getConnection();

    public void guardarEspecialidad(String nombre) throws SQLException {
        String query = "INSERT INTO Especialidad (nombre) VALUES (?)";
        PreparedStatement preparedStatement = connection.prepareStatement(query);
        preparedStatement.setString(1, nombre);
        preparedStatement.executeUpdate();
    }

}
