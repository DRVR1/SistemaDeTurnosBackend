package com.turnos.turnos;

public abstract class Persona {
    public int dni;
    public int telefono;
    public String apellido;
    public String nombre;
    public String mail;
    public String pass;

    public Persona(int dni, int telefono, String nombre, String apellido, String mail, String pass) {
        this.dni = dni;
        this.telefono = telefono;
        this.nombre = nombre;
        this.apellido = apellido;
        this.mail = mail;
        this.pass = pass;
    }

}
