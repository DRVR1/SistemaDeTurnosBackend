package com.turnos.turnos.Entities;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Setter
@Getter
@Table(name = "Pacientes")  // Nombre de la tabla específica de Paciente
public class Paciente extends Persona {
    @ManyToOne
    @JoinColumn(name = "obrasocial_id", referencedColumnName = "id")
    private ObraSocial obrasocial;

    public Paciente() {
        super();
    }

    public Paciente(String dni,
                    String telefono,
                    String nombre,
                    String apellido,
                    String email,
                    String password,
                    ObraSocial obrasocial) {

        super(dni, telefono, nombre, apellido, email, password,"ROLE_PACIENTE");
        this.obrasocial = obrasocial;
    }

    public ObraSocial getObraSOcial(){
        return obrasocial;
    }
    // Métodos adicionales o específicos de Paciente
}
//