package com.turnos.turnos;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

public class EspecialidadRepository {

    private final SQLServer db = SQLServer.getInstance();
    private final Connection connection = db.getConnection();

    public void guardarEspecialidad(String nombre) throws SQLException {
        String query = "INSERT INTO Especialidad (nombre) VALUES (?)";
        PreparedStatement preparedStatement = connection.prepareStatement(query);
        preparedStatement.setString(1, nombre);
        preparedStatement.executeUpdate();
    }

    public ArrayList<Especialidad> verEspecialidades() throws SQLException {
        ArrayList<Especialidad> listaEspecialidades = new ArrayList<>();
        String query = "{call verEspecialidades}";
        PreparedStatement preparedStatement = connection.prepareStatement(query);
        ResultSet result = preparedStatement.executeQuery();
        while(result.next()){
            String nombreEspecialidad = result.getString(1);
            Especialidad especialidad = new Especialidad(nombreEspecialidad);
            listaEspecialidades.add(especialidad);
        }
        return listaEspecialidades;
    }

}
