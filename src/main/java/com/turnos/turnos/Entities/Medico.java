package com.turnos.turnos.Entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.util.List;

@Entity
@Table(name = "Medicos")
@Setter
@Getter
public class Medico extends Persona {

    @ManyToOne
    @JoinColumn(name = "especialidad_id", referencedColumnName = "id")
    private Especialidad especialidad;

    @ManyToMany
    @JoinTable(
            name = "medico_obrasocial",
            joinColumns = @JoinColumn(name = "medico_id"),
            inverseJoinColumns = @JoinColumn(name = "obrasocial_id")
    )
    private List<ObraSocial> obrasociales;

    public Medico() {
        super();
    }

    public Medico(String dni,
                  String telefono,
                  String nombre,
                  String apellido,
                  String email,
                  String password,
                  Especialidad especialidad) {


        super(dni, telefono, nombre, apellido, email, password, "ROLE_MEDICO");
        this.especialidad = especialidad;

    }


}
//