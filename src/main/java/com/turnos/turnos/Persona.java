package com.turnos.turnos;

public abstract class Persona {
    protected final int id;
    protected int dni;
    protected int telefono;
    protected String apellido;
    protected String nombre;

    public Persona(int id, int dni, int telefono, String nombre, String apellido) {
        this.id = id;
        this.dni = dni;
        this.telefono = telefono;
        this.nombre = nombre;
        this.apellido = apellido;
    }

}
