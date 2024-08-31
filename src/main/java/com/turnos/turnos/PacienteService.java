package com.turnos.turnos;

public class PacienteService {
    public void altaPaciente(int dni,int telefono, String nombre, String apellido){
        int id = 0;
        Paciente p = new Paciente(id, dni, telefono, nombre, apellido);
        System.out.println("El paciente " + nombre + " ha sido generado con exito." );
    }
}
