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

function buscarTurnos() {
    const pacienteId = parseInt(document.getElementById('pacienteId').value);
    const turnosList = document.getElementById('turnosList');
    turnosList.innerHTML = ''; // Limpiar la lista

    // Filtrar turnos del paciente
    const turnosFiltrados = turnos.filter(turno => turno.pacienteId === pacienteId);

    if (turnosFiltrados.length > 0) {
        turnosFiltrados.forEach(turno => {
            const li = document.createElement('li');
            li.innerHTML = `
                <p><strong>Fecha:</strong> ${turno.fecha}</p>
                <p><strong>Médico:</strong> ${turno.medicoNombre} ${turno.medicoApellido}</p>
                <p><strong>Especialidad:</strong> ${turno.especialidad}</p>
            `;
            turnosList.appendChild(li);
        });
    } else {
        turnosList.innerHTML = '<li>No se encontraron turnos.</li>';
    }
}