package com.turnos.turnos.Entities;

import jakarta.persistence.*;

@Entity
@Table(name = "Medicos")  // Nombre de la tabla específica de Paciente
public class Medico extends Persona {

    @ManyToOne
    @JoinColumn(name = "especialidad_id", referencedColumnName = "id")
    private Especialidad especialidad;

    public Medico() {
        super();
    }

    public Medico(String dni, String telefono, String nombre, String apellido, String mail, String pass, Especialidad especialidad) {
        super(dni, telefono, nombre, apellido, mail, pass);
        this.especialidad = especialidad;
    }

    public Especialidad getEspecialidad(){
        return especialidad;
    }
}
