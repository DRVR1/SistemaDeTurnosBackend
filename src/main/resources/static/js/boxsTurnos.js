// Como la tabla de turnos, muestra turnos pero en forma de box. Es mas compatible con mobile

/*

<ul id="turnosList"></ul>

*/






async function generarTurnos(turnosList, reservar) {
    if(!turnosList){
        popup("Error de conexion, mostrando turnos de prueba");
        turnosList = turnosDePruebaList;
    }
    const ul = document.getElementById('turnosList');  // Seleccionamos el elemento UL donde añadiremos los LI
    ul.innerHTML = '';  // Limpiar la lista de turnos anterior
        
    turnosList.forEach(turno => {
        const li = document.createElement('li');
        li.id = 'li'+turno.id;
        if(!reservar){
            li.innerHTML = `
            <p><strong>Turno ID:</strong> ${turno.id}</p>
            <p><strong>Fecha del turno:</strong> ${convertirFecha(turno.fecha)}</p>
            <p><strong>Hora del turno:</strong> ${convertirHora(turno.fecha)}</p>
            <p><strong>Médico asignado:</strong> ${turno.medico.nombre} ${turno.medico.apellido}</p>
            <p><strong>Especialidad del Médico:</strong> ${turno.medico.especialidad.nombre}</p>
            <button class="cancelarBoton" onclick="api_cancelarTurno(${turno.id})">Cancelar turno</button>
        `;
        }else{
            li.innerHTML = `
            <p><strong>Turno ID:</strong> ${turno.id}</p>
            <p><strong>Fecha del turno:</strong> ${convertirFecha(turno.fecha)}</p>
            <p><strong>Hora del turno:</strong> ${convertirHora(turno.fecha)}</p>
            <p><strong>Médico asignado:</strong> ${turno.medico.nombre} ${turno.medico.apellido}</p>
            <p><strong>Especialidad del Médico:</strong> ${turno.medico.especialidad.nombre}</p>
            <button class="aceptarBoton" onclick="api_reservarTurno(${turno.id},${localStorage.getItem("userId")})">Reservar turno</button>
        `;
        }

        ul.appendChild(li);  // Añadimos el LI a la lista UL
    });

}
