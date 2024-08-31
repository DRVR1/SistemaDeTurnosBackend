package com.turnos.turnos;

public class MedicoService {
    public void altaMedico(int dni,int telefono, String nombre, String apellido, String especialidad){
        int id = 0;
        Medico m = new Medico(id, dni, telefono, nombre, apellido, especialidad);
        System.out.println("El medico " + nombre + " ha sido generado con exito." );
    }
}
