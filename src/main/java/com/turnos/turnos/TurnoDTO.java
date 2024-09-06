package com.turnos.turnos;

import java.time.LocalDateTime;

public class TurnoDTO {
    public LocalDateTime fecha;
    public String nombreMedico;
    public String apellidoMedico;
    public String especialidadMedico;

    public TurnoDTO(LocalDateTime fecha, String nombreMedico, String apellidoMedico, String especialidadMedico){
        this.fecha = fecha;
        this.nombreMedico = nombreMedico;
        this.apellidoMedico = apellidoMedico;
        this.especialidadMedico = especialidadMedico;
    }

    public void verDatos(){
        System.out.println("Fecha: " + this.fecha);
        System.out.println("Nombre del Médico: " + this.nombreMedico);
        System.out.println("Apellido del Médico: " + this.apellidoMedico);
        System.out.println("especialidadMedico del Médico: " + this.especialidadMedico);
    }
}
