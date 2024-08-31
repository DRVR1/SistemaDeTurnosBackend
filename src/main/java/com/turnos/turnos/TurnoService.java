package com.turnos.turnos;
import java.util.Date;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.LocalDateTime;

public class TurnoService {
    public void reservarTurno(LocalDateTime fecha, int pacienteID, int medicoID){
        int id = 0;
        Turno t = new Turno(id, fecha, pacienteID, medicoID);
        t.imprimirDatos();
    }

    public void liberarTurno(int id){
        System.out.println("Eliminando turno " + id);
    }

    public void pruebas(){
        // Crear LocalDate y LocalTime
        LocalDate fecha = LocalDate.of(2024, 8, 30);
        LocalTime hora = LocalTime.of(15, 30);
        LocalDateTime fechaHora = LocalDateTime.of(fecha, hora);
    }
}
