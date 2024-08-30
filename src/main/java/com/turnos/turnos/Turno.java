package com.turnos.turnos;
import java.util.Calendar;
import java.util.Date;

public class Turno {
    private int id;
    private int fecha;
    private Paciente paciente;

    public Turno(int id,int fecha, Paciente paciente){
        this.id = id;
        this.fecha = fecha;
        this.paciente = paciente;
    }

    public void imprimirDatos(){
        System.out.println("id: " + this.id + " fecha: " + this.fecha + "paciente: " + this.paciente.nombre);
    }
}
