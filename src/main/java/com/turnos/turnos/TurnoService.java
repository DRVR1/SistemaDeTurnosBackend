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

    public  ArrayList<TurnoDTO> verTurnosDisponibles(int especialidadID) throws SQLException {
        ArrayList<TurnoDTO> listaTurnos = tr.verTurnos(especialidadID);
        return listaTurnos;
    }

    public boolean reservarTurno(int turnoID, int pacienteID) throws SQLException {
        return tr.reservarTurno(turnoID,pacienteID);
    }

}
