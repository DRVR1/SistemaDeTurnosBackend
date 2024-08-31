package com.turnos.turnos;
import java.time.LocalDateTime;

public class Turno {
    private final int id;
    private LocalDateTime fecha;
    private int pacienteID;
    private int medicoID;

    public Turno(int id, LocalDateTime fecha, int pacienteID, int medicoID){
        this.id = id;
        this.fecha = fecha;
        this.pacienteID = pacienteID;
        this.medicoID = medicoID;
    }

    public void imprimirDatos(){
        System.out.println("id: " + this.id + " fecha: " + this.fecha + " paciente " + pacienteID + " medico " + medicoID);
    }
}
