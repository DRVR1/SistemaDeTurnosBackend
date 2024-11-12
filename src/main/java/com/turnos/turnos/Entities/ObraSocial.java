package com.turnos.turnos.Entities;

import jakarta.persistence.*;

@Entity
@Table(name = "Osociales")
public class ObraSocial {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;

    // Getters y Setters
    public ObraSocial(String nombre){this.nombre = nombre;}

    public ObraSocial(){}

    public Long getId() { return id;}

    public void setId(Long id) { this.id = id;}

    public String getNombre() { return nombre;}

    public void setNombre(String nombre) {this.nombre = nombre;}
}
//