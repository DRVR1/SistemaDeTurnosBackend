package com.turnos.turnos;

public class Medico extends Persona{
    public String especialidad;
    public Medico(int id,int dni, int telefono, String nombre, String apellido, String especialidad) {
        super(id, dni,telefono, nombre, apellido);
        this.especialidad = especialidad;
    }
}
