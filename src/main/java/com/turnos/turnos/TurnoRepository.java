package com.turnos.turnos;

import java.sql.*;
import java.time.LocalDateTime;
import java.util.ArrayList;

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

    public ArrayList<TurnoDTO> verTurnos(int especialidadID) throws SQLException {
        ArrayList<TurnoDTO> turnosDTO = new ArrayList<>();
        String query = "{call verTurnos(?)}";
        PreparedStatement preparedStatement = connection.prepareStatement(query);
        preparedStatement.setInt(1,especialidadID);
        ResultSet result = preparedStatement.executeQuery();
        while(result.next()){
            int id = result.getInt(1);
            LocalDateTime dateTime = result.getTimestamp(2).toLocalDateTime();
            String nombreMedico = result.getString(3);
            String apellidoMedico = result.getString(4);
            String especialidadMedico = result.getString(5);
            TurnoDTO turnoDTO = new TurnoDTO(id,dateTime,nombreMedico,apellidoMedico,especialidadMedico);
            turnosDTO.add(turnoDTO);
        }
        return turnosDTO;
    }

    public boolean reservarTurno(int turnoID, int pacienteID) throws SQLException {
        String query = "{call reservarTurno(?,?)}";
        PreparedStatement preparedStatement = connection.prepareStatement(query);
        preparedStatement.setInt(1,turnoID);
        preparedStatement.setInt(2,pacienteID);
        int rowsAffected = preparedStatement.executeUpdate();
        if (rowsAffected > 0){
            return true;
        } else {
            return false;
        }
    }

    public void liberarTurno(){

    }
}
