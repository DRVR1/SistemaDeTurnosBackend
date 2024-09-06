package com.turnos.turnos;
import java.sql.SQLException;
import java.time.LocalDateTime;
import java.util.ArrayList;

public class TurnoService {

    private final TurnoRepository tr = new TurnoRepository();

    public void altaTurno(LocalDateTime fecha, int medicoID) throws SQLException {
        Turno t = new Turno(fecha,0, medicoID);
        tr.altaTurno(t.fecha,t.medicoID);
    }

    public ArrayList<Turno> verTurnosDisponibles(){
        ArrayList<Turno> listaTurnos = new ArrayList<>();
        //repository get turnos
        return listaTurnos;
    }

    public void reservarTurno(int turnoID, int pacienteID){
        //ver si el turno esta disponible
        //asignar el paciente al turno
        //devolver una respuesta al front [reservado/no se pudo reservar]
    }

}
