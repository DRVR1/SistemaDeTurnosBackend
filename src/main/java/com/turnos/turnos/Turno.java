package com.turnos.turnos;
import java.util.Calendar;
import java.util.Date;

public class Turno {
    private int id;
    private Date fecha;
    private Paciente paciente;

    public Turno(int id,Date fecha, Paciente paciente){
        this.id = id;
        this.fecha = fecha;
        this.paciente = paciente;
    }
}
