package com.turnos.turnos;

public class PacienteService {
    public void altaPaciente(int dni,int telefono, String nombre, String apellido){
        Paciente p = new Paciente(dni, telefono, nombre, apellido);
        System.out.println("El paciente " + nombre + " ha sido generado con exito." );
    }
}
