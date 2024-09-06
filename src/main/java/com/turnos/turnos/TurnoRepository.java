package com.turnos.turnos;

import java.sql.*;
import java.time.LocalDateTime;

public class TurnoRepository {

    private final SQLServer db = SQLServer.getInstance();
    private final Connection connection = db.getConnection();

    public void altaTurno(LocalDateTime fecha, int medicoID) throws SQLException {
        String query = "INSERT INTO Turno (fecha, pacienteID, medicoID) VALUES (?, ?, ?)";
        PreparedStatement preparedStatement = connection.prepareStatement(query);
        preparedStatement.setTimestamp(1, Timestamp.valueOf(fecha));
        preparedStatement.setNull(2, Types.INTEGER);
        preparedStatement.setInt(3, medicoID);
        preparedStatement.executeUpdate();
    }

    public void verTurnos(int categoriaID){
        //exec procedure 
    }

}
