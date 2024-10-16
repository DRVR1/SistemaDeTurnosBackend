package com.turnos.turnos.Entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Setter
@Getter
@Table(name = "Pacientes")  // Nombre de la tabla específica de Paciente
public class Paciente extends Persona {

    public Paciente() {
        super();
    }

    public Paciente(String dni,
                    String telefono,
                    String nombre,
                    String apellido,
                    String email,
                    String password) {

        super(dni, telefono, nombre, apellido, email, password,"PACIENTE");
    }

    // Métodos adicionales o específicos de Paciente
}
