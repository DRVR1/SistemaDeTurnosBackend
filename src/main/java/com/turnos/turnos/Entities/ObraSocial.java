package com.turnos.turnos.Entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "ObrasSociales")
@Getter
@Setter
public class ObraSocial {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String nombre;

    public ObraSocial() {}

    public ObraSocial(String nombre) {
        this.nombre = nombre;
    }
}