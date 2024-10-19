
const turnosDePrueba = [
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

function convertirFecha(fecha) {
    const date = new Date(fecha); // Crear un objeto Date a partir de la cadena

    // Obtener los componentes de la fecha
    const dia = String(date.getDate()).padStart(2, '0'); // Día (con ceros a la izquierda)
    const mes = String(date.getMonth() + 1).padStart(2, '0'); // Mes (sumar 1 porque getMonth() devuelve 0-11)
    const anio = date.getFullYear(); // Año

    // Devolver la fecha en formato DD/MM/AAAA
    return `${dia}/${mes}/${anio}`;
}

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
            <p><strong>Fecha del turno:</strong> ${convertirFecha(turno.fecha)}</p>
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
