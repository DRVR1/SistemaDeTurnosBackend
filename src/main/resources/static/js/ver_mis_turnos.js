

async function buscarTurnos() {
    const pacienteId = localStorage.getItem('userId');
    const turnosList = await api_queryTurnosReservados(pacienteId);  // Esperamos la respuesta de los turnos
    const ul = document.getElementById('turnosList');  // Seleccionamos el elemento UL donde añadiremos los LI

    ul.innerHTML = '';  // Limpiar la lista de turnos anterior

    turnosList.forEach(turno => {
        const li = document.createElement('li');
        li.id = 'li'+turno.id;
        li.innerHTML = `
            <p><strong>Turno ID:</strong> ${turno.id}</p>
            <p><strong>Fecha del turno:</strong> ${turno.fecha}</p>
            <p><strong>Médico asignado:</strong> ${turno.medico.nombre} ${turno.medico.apellido}</p>
            <p><strong>Especialidad del Médico:</strong> ${turno.medico.especialidad.nombre}</p>
            <button class="cancelarBoton" onclick="cancelarTurno(${turno.id})">Cancelar turno</button>

        `;
        ul.appendChild(li);  // Añadimos el LI a la lista UL
    });
}


function cancelarTurno(turnoId){
    pop1("¿Desea cancelar el turno?").then((result) => {
        if (result) {
            console.log("cancelando turno " + turnoId);
            api_cancelarTurno(turnoId);
        }else{
            console.log("salir");
        }
    });
        
}

buscarTurnos();
