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
        //exec procedure
        ArrayList<TurnoDTO> turnosDTO = new ArrayList<>();
        String query = "{call verTurnos(?)}";
        PreparedStatement preparedStatement = connection.prepareStatement(query);
        preparedStatement.setInt(1,especialidadID);
        ResultSet result = preparedStatement.executeQuery();
        while(result.next()){
            LocalDateTime dateTime = result.getTimestamp(1).toLocalDateTime();
            String nombreMedico = result.getString(2);
            String apellidoMedico = result.getString(3);
            String especialidadMedico = result.getString(4);
            TurnoDTO turnoDTO = new TurnoDTO(dateTime,nombreMedico,apellidoMedico,especialidadMedico);
            turnoDTO.verDatos();
            turnosDTO.add(turnoDTO);
        }
        return turnosDTO;
    }

    public void reservarTurno(){

    }

    public void liberarTurno(){

    }
}
