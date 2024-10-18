document.getElementById('buscarBtn').addEventListener('click', buscarTurnos);

// Simulación de datos
const pacientes = [
    { id: 1, nombre: 'Juan', apellido: 'Pérez', telefono: '123456789' },
    { id: 2, nombre: 'María', apellido: 'Gómez', telefono: '987654321' },
    { id: 3, nombre: 'Luis', apellido: 'Fernández', telefono: '456123789' }
];

const turnos = [
    { fecha: '2024-10-05 10:00', pacienteId: 1, medicoNombre: 'Dr. Sánchez', medicoApellido: 'López', especialidad: 'Cardiología' },
    { fecha: '2024-10-05 11:00', pacienteId: 1, medicoNombre: 'Dr. Martínez', medicoApellido: 'Hernández', especialidad: 'Pediatría' },
    { fecha: '2024-10-06 09:00', pacienteId: 2, medicoNombre: 'Dr. Torres', medicoApellido: 'Jiménez', especialidad: 'Dermatología' },
    { fecha: '2024-10-06 10:30', pacienteId: 3, medicoNombre: 'Dr. Ramírez', medicoApellido: 'Soto', especialidad: 'Neurología' },
    { fecha: '2024-10-07 14:00', pacienteId: 2, medicoNombre: 'Dr. Sánchez', medicoApellido: 'López', especialidad: 'Cardiología' }
];

document.getElementById('buscarBtn').addEventListener('click', buscarTurnos);

async function buscarTurnos() {
    const pacienteId = parseInt(document.getElementById('pacienteId').value);
    const turnosList = await api_queryTurnosReservados(pacienteId);  // Esperamos la respuesta de los turnos
    const ul = document.getElementById('turnosList');  // Seleccionamos el elemento UL donde añadiremos los LI

    ul.innerHTML = '';  // Limpiar la lista de turnos anterior

    turnosList.forEach(turno => {
        const li = document.createElement('li');
        li.innerHTML = `
            <p><strong>Turno ID:</strong> ${turno.id}</p>
            <p><strong>Fecha del turno:</strong> ${turno.fecha}</p>
            <p><strong>Médico asignado:</strong> ${turno.medico.nombre} ${turno.medico.apellido}</p>
            <p><strong>Especialidad del Médico:</strong> ${turno.medico.especialidad.nombre}</p>
            <button class="cancelarBoton" onclick="api_cancelarTurno(${turno.id})">Cancelar turno</button>

        `;
        ul.appendChild(li);  // Añadimos el LI a la lista UL
    });
}
