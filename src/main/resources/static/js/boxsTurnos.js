// Como la tabla de turnos, muestra turnos pero en forma de box. Es mas compatible con mobile

/*

<ul id="turnosList"></ul>

*/

const turnosDePruebaList = [
    {
        id: 1,
        fecha: '2024-10-20T10:00:00',
        medico: {
            nombre: 'Juan',
            apellido: 'Pérez',
            especialidad: {
                nombre: 'Cardiología'
            }
        }
    },
    {
        id: 2,
        fecha: '2024-10-21T14:30:00',
        medico: {
            nombre: 'Ana',
            apellido: 'García',
            especialidad: {
                nombre: 'Dermatología'
            }
        }
    },
    {
        id: 3,
        fecha: '2024-10-22T09:00:00',
        medico: {
            nombre: 'Luis',
            apellido: 'Martínez',
            especialidad: {
                nombre: 'Pediatría'
            }
        }
    },
    {
        id: 4,
        fecha: '2024-10-23T11:15:00',
        medico: {
            nombre: 'María',
            apellido: 'López',
            especialidad: {
                nombre: 'Ginecología'
            }
        }
    }
];




async function generarTurnos(turnosList) {
    if(!turnosList){
        popup("Error de conexion, mostrando turnos de prueba");
        turnosList = turnosDePruebaList;
    }
    const ul = document.getElementById('turnosList');  // Seleccionamos el elemento UL donde añadiremos los LI
    ul.innerHTML = '';  // Limpiar la lista de turnos anterior
        
    turnosList.forEach(turno => {
        const li = document.createElement('li');
        li.id = 'li'+turno.id;
            li.innerHTML = `
            <p><strong>Turno ID:</strong> ${turno.id}</p>
            <p><strong>Fecha del turno:</strong> ${convertirFecha(turno.fecha)}</p>
            <p><strong>Hora del turno:</strong> ${convertirHora(turno.fecha)}</p>
            <p><strong>Médico asignado:</strong> ${turno.medico.nombre} ${turno.medico.apellido}</p>
            <p><strong>Especialidad del Médico:</strong> ${turno.medico.especialidad.nombre}</p>
            <button class="cancelarBoton" onclick="api_cancelarTurno(${turno.id})">Cancelar turno</button>
        `;
        ul.appendChild(li);  // Añadimos el LI a la lista UL
    });

}
