package com.turnos.turnos.Turno;
import java.time.LocalDateTime;

public class Turno {
    public LocalDateTime fecha;
    public int pacienteID;
    public int medicoID;

    public Turno(LocalDateTime fecha, int pacienteID, int medicoID){
        this.fecha = fecha;
        this.pacienteID = pacienteID;
        this.medicoID = medicoID;
    }
}
