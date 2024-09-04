package com.turnos.turnos;

public abstract class Persona {
    protected int dni;
    protected int telefono;
    protected String apellido;
    protected String nombre;

    public Persona(int dni, int telefono, String nombre, String apellido) {
        this.dni = dni;
        this.telefono = telefono;
        this.nombre = nombre;
        this.apellido = apellido;
    }

}
