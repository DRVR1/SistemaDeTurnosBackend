package com.turnos.turnos;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.PreparedStatement;

public class SQLServer {

    private static SQLServer sqlServer;

    private static final String USER = "no";
    private static final String PASS = "1234";
    private static final String DB_PORT = "1433";
    private static final String DB_IP = "127.0.0.1";
    private static final String DB_NAME = "turnos";

    private static final String DB_URL = "jdbc:sqlserver://"+DB_IP+":"+DB_PORT+";databaseName="+DB_NAME+";encrypt=false";

    private Connection connection = null;

    private SQLServer(){

        try {
            // Estableciendo la conexión
            System.out.println("Estableciendo la conexion...");
            connection = DriverManager.getConnection(DB_URL, USER, PASS);
            System.out.println("Conexion exitosa a Microsoft SQL Server!");

        } catch (SQLException e) {
            System.out.println("Error al conectar a la base de datos:");
            e.printStackTrace();
        }
    }

    public void sendQuery(String query){
        try{
            PreparedStatement preparedStatement = this.connection.prepareStatement(query);
            preparedStatement.executeUpdate();
        }
        catch (Exception e){
            System.out.println("Error al ejecutar query");
        }
    }

    public Connection getConnection(){
        return this.connection;
    }

    public static SQLServer getInstance(){
        if(sqlServer == null){
            sqlServer = new SQLServer();
        }
        return sqlServer;
    }
}
