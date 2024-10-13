package com.turnos.turnos.Medico;
import com.turnos.turnos.Turno.TurnoDTO;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.turnos.turnos.SQLServer;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDateTime;


public class MedicoRepository {

    private final SQLServer db = SQLServer.getInstance();
    private final Connection connection = db.getConnection();
    private final BCryptPasswordEncoder enc = new BCryptPasswordEncoder();

    public void guardarMedico(int dni,int telefono, String nombre, String apellido, int especialidadID, String mail, String rawPass) throws SQLException {
        String encodedPass = enc.encode(rawPass);
        String query = "INSERT INTO Medico (nombre, apellido, telefono, dni, especialidadID, mail, pass) VALUES (?, ?, ?, ?, ?, ?, ?)";
        PreparedStatement preparedStatement = connection.prepareStatement(query);
        preparedStatement.setString(1, nombre);
        preparedStatement.setString(2, apellido);
        preparedStatement.setInt(3, telefono);
        preparedStatement.setInt(4, dni);
        preparedStatement.setInt(5, especialidadID);
        preparedStatement.setString(6, mail);
        preparedStatement.setString(7, encodedPass);
        preparedStatement.executeUpdate();
    }

    public void loginMedico(String mail, String rawPass) throws SQLException {
        String query = "select mail, pass from Medico where mail = '?'";
        PreparedStatement preparedStatement = connection.prepareStatement(query);
        preparedStatement.setString(1, mail);
        ResultSet result = preparedStatement.executeQuery();
        while(result.next()){
            String encPass = result.getString(2);
            if (enc.matches(rawPass,encPass)){
                System.out.println("login sucessful");
            }
        }
        return;
    }

}
