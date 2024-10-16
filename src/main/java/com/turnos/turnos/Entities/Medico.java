package com.turnos.turnos.Entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "Medicos")  // Nombre de la tabla específica de Paciente
@Setter
@Getter
public class Medico extends Persona {

    @ManyToOne
    @JoinColumn(name = "especialidad_id", referencedColumnName = "id")
    private Especialidad especialidad;

    public Medico() {
        super();
    }

    public Medico(String dni, String telefono, String nombre, String apellido, String email, String password, Especialidad especialidad) {
        super(dni, telefono, nombre, apellido, email, password,"ROLE_MEDICO");
        this.especialidad = especialidad;
    }

    public Especialidad getEspecialidad(){
        return especialidad;
    }
}
