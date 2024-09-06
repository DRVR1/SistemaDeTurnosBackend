package com.turnos.turnos;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.time.LocalDateTime;

public class TurnoRepository {

    private final SQLServer db = SQLServer.getInstance();
    private final Connection connection = db.getConnection();

    public void guardarTurno(LocalDateTime fecha, int pacienteID, int medicoID) throws SQLException {
        String query = "INSERT INTO Turno (fecha, pacienteID, medicoID) VALUES (?, ?, ?)";
        PreparedStatement preparedStatement = connection.prepareStatement(query);
        preparedStatement.setTimestamp(1, Timestamp.valueOf(fecha));
        preparedStatement.setInt(2, pacienteID);
        preparedStatement.setInt(3, medicoID);
        preparedStatement.executeUpdate();
    }

}
