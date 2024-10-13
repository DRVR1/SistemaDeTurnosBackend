package com.turnos.turnos;

public abstract class Persona {
    protected int dni;
    protected int telefono;
    protected String apellido;
    protected String nombre;
    protected String mail;

    public Persona(int dni, int telefono, String nombre, String apellido, String mail) {
        this.dni = dni;
        this.telefono = telefono;
        this.nombre = nombre;
        this.apellido = apellido;
        this.mail = mail;
    }

}
