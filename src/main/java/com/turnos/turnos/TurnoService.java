package com.turnos.turnos;
import java.sql.SQLException;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.LocalDateTime;

public class TurnoService {

    public void altaTurno(LocalDateTime fecha, int pacienteID, int medicoID) throws SQLException {
        Turno t = new Turno(fecha, pacienteID, medicoID);

        TurnoRepository tr = new TurnoRepository();
        tr.guardarTurno(t.fecha,t.pacienteID,t.medicoID);
    }

}
