package com.turnos.turnos;
import java.util.Date;

public class TurnoService {
    public void reservarTurno(int id, Date fecha, Paciente paciente){
        Turno t = new Turno(id, fecha,paciente);
        System.out.println("Turno reservado con exito");
    }
    public void pruebas(){
        // Obtener la fecha actual
        Date fechaActual = new Date();

        // Imprimir la fecha actual en milisegundos desde la época UNIX
        long milisecs = fechaActual.getTime();
        System.out.println("Fecha actual en milisegundos desde la época UNIX: " + milisecs);

        // Convertir los milisegundos de vuelta a un objeto Date
        Date fechaConvertida = new Date(milisecs);
        System.out.println("Fecha convertida de milisegundos: " + fechaConvertida);
    }
}
