package com.turnos.turnos;

public abstract class Persona {
    public int dni;
    public int telefono;
    public String apellido;
    public String nombre;

    public Persona(int dni, int telefono, String nombre, String apellido) {
        this.dni = dni;
        this.telefono = telefono;
        this.nombre = nombre;
        this.apellido = apellido;
    }

}
