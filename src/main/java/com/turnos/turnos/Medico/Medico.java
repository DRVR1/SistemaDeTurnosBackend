package com.turnos.turnos.Medico;

import com.turnos.turnos.Persona;

public class Medico extends Persona {

    public int especialidadID;

    public Medico(int dni, int telefono, String nombre, String apellido, int especialidadID) {
        super(dni, telefono, nombre, apellido);
        this.especialidadID = especialidadID;
    }
}
