package com.turnos.turnos;

public class Medico extends Persona{

    public int especialidadID;

    public Medico(int dni, int telefono, String nombre, String apellido, int especialidadID) {
        super(dni, telefono, nombre, apellido);
        this.especialidadID = especialidadID;
    }
}
