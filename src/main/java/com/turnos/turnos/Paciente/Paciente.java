package com.turnos.turnos.Paciente;

import com.turnos.turnos.Persona;

public class Paciente extends Persona {

    public Paciente(int dni, int telefono, String nombre, String apellido, String mail, String pass) {
        super(dni,telefono, nombre, apellido, mail, pass);
        this.mail = mail;
    }
}
