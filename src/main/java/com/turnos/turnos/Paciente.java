package com.turnos.turnos;

public class Paciente extends Persona{

    protected String mail;

    public Paciente(int dni, int telefono, String nombre, String apellido, String mail) {
        super(dni,telefono, nombre, apellido);
        this.mail = mail;
    }
}
