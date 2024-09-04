package com.turnos.turnos;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.PreparedStatement;

public class SQLServerConnection {

    private static SQLServerConnection sqlServerConnection;
    private static final String DB_URL = "jdbc:sqlserver://127.0.0.1:1433;databaseName=prueba;encrypt=false";
    private static final String USER = "userServer";
    private static final String PASS = "mrp2YPyqNhcSdAUxmrp2YPyqNhcSdAUx";
    private Connection connection = null;

    private SQLServerConnection(){

        try {
            // Estableciendo la conexión
            System.out.println("Estableciendo la conexion...");
            connection = DriverManager.getConnection(DB_URL, USER, PASS);
            System.out.println("Conexión exitosa a Microsoft SQL Server!");

        } catch (SQLException e) {
            System.out.println("Error al conectar a la base de datos:");
            e.printStackTrace();
        }
    }

    public void sendQuery(String query){
        try{
            PreparedStatement preparedStatement = this.connection.prepareStatement(query);
            int rowsAffected = preparedStatement.executeUpdate();
        }
        catch (Exception e){
            System.out.println("Error al ejecutar query");
        }

    }

    public static SQLServerConnection getInstance(){
        if(sqlServerConnection == null){
            sqlServerConnection = new SQLServerConnection();
        }
        return sqlServerConnection;
    }
}
