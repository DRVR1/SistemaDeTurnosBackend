package com.turnos.turnos.Paciente;

import com.turnos.turnos.Persona;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "Paciente")  // Nombre de la tabla específica de Paciente
public class Paciente extends Persona {

    public Paciente() {
        super();
    }

    public Paciente(String dni, String telefono, String nombre, String apellido, String mail, String pass) {
        super(dni, telefono, nombre, apellido, mail, pass);
    }

    // Métodos adicionales o específicos de Paciente
}
