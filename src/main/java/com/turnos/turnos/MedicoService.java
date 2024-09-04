package com.turnos.turnos;

public class MedicoService {

    SQLServer db = SQLServer.getInstance();

    public void altaMedico(int dni,int telefono, String nombre, String apellido, int especialidadID){

        Medico m = new Medico(dni, telefono, nombre, apellido, especialidadID);

        db.sendQuery("insert into Medico values ('"+m.nombre+"','"+m.apellido+"',"+m.telefono+","+m.dni+","+m.especialidadID+")");
    }




}
