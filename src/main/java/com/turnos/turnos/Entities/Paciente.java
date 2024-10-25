package com.turnos.turnos.Entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
@Setter
@Getter
@Table(name = "Pacientes")  // Nombre de la tabla específica de Paciente
public class Paciente extends Persona {

    @ManyToOne
    @JoinColumn(name = "obra_social_id", referencedColumnName = "id")
    private ObraSocial obraSocial;

    public Paciente() {
        super();
    }

    public Paciente(String dni,
                    String telefono,
                    String nombre,
                    String apellido,
                    String email,
                    String password) {

        super(dni, telefono, nombre, apellido, email, password,"ROLE_PACIENTE");
        this.obraSocial = obraSocial;
    }

    // Métodos adicionales o específicos de Paciente
}
