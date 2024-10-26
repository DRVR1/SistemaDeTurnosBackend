package com.turnos.turnos.Entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "Admins")
@Setter
@Getter
public class Admin extends Persona {

    public Admin() {
        super();
    }

    public Admin(String dni, String telefono, String nombre, String apellido, String email, String password) {
        super(dni, telefono, nombre, apellido, email, password,"ROLE_ADMIN");
    }

}
