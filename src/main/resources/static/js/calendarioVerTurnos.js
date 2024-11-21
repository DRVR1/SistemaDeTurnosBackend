/*document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendario');

    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        locale: 'es',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        events: [
            {
                title: 'Consulta: Juan Pérez',
                start: '2024-10-28T10:00:00',
                description: 'Motivo: Dolor de cabeza persistente'
            },
            {
                title: 'Consulta: María López',
                start: '2024-10-28T14:00:00',
                description: 'Motivo: Control post-operatorio'
            }
            // Agrega más eventos aquí
        ],
        eventClick: function(info) {
            alert(`Paciente: ${info.event.title}\nHora: ${info.event.start.toLocaleString()}\nMotivo: ${info.event.extendedProps.description}`);
        }
    });

    calendar.render();
});

*/
/* harcodeado el paciente id=1
document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendario');
    if (!calendarEl) {
        console.error('El elemento con id "calendario" no se encuentra en el DOM.');
        return; // Salimos si el elemento no existe
    }
    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        locale: 'es',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        // Obtener los eventos desde la API y filtrarlos por medicoId
        events: async function(info, successCallback, failureCallback) {
            try {
                // Obtener el ID del médico desde localStorage
                const medicoId = localStorage.getItem('userId'); // ID del médico logueado
                
                // Llamamos a la API para obtener todos los turnos (sin filtrar por paciente)
                const pacienteId = 1;
                const listaTurnos = await api_queryTurnosReservados(pacienteId);

                // Filtramos los turnos para obtener solo los del médico actual
                const turnosDelMedico = listaTurnos.filter(turno => turno.medico.id === parseInt(medicoId));

                // Mapeamos los turnos al formato que FullCalendar necesita
                const events = turnosDelMedico.map(turno => ({
                    title: `${turno.paciente.nombre} ${turno.paciente.apellido}`, // Nombre del paciente
                    start: turno.fecha,   // Fecha y hora del turno
                    description: `Motivo: ${turno.paciente.obrasocial ? turno.paciente.obrasocial : 'Sin obra social'}`, // Descripción opcional
                    extendedProps: {
                        paciente: turno.paciente.nombre,
                        telefono: turno.paciente.telefono,
                        email: turno.paciente.email
                    }
                }));

                successCallback(events);  // Pasamos los eventos al calendario
            } catch (error) {
                console.error('Error al cargar los turnos:', error);
                failureCallback(error);  // En caso de error, pasamos el error al callback
            }
        },
        eventClick: function(info) {
            // Mostramos un alert con los detalles del evento
            const { paciente, telefono, email } = info.event.extendedProps;
            alert(`Paciente: ${info.event.title}\nHora: ${info.event.start.toLocaleString()}\nMotivo: ${info.event.extendedProps.description}\nTelefono: ${telefono}\nEmail: ${email}`);
        }
    });

    // Renderizamos el calendario
    calendar.render();
});
*/
/*funciona pero con 5 turnos
document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendario');

    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        locale: 'es',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        events: async function(info, successCallback, failureCallback) {
            try {
                const medicoId = localStorage.getItem('userId'); // Obtener el ID del médico logueado
                if (!medicoId) {
                    console.error("ID de médico no encontrado en localStorage");
                    failureCallback("ID de médico no encontrado");
                    return;
                }

                // Supongamos que tienes una lista de pacientes (esto debe venir de algún lado)
                const listaPacientes = [1, 2, 3, 4, 5]; // Ejemplo de lista de pacienteId

                // Inicializamos una lista para los turnos filtrados
                let turnosDelMedico = [];

                // Recorremos todos los pacientes y obtenemos sus turnos
                for (let pacienteId of listaPacientes) {
                    // Llamamos a la API para obtener los turnos de este paciente
                    const listaTurnos = await api_queryTurnosReservados(pacienteId);
                    if (Array.isArray(listaTurnos)) {
                        // Filtramos los turnos que pertenecen al médico actual
                        const turnosFiltrados = listaTurnos.filter(turno => turno.medico.id === parseInt(medicoId));
                        turnosDelMedico = [...turnosDelMedico, ...turnosFiltrados];
                    }
                }

                // Mapeamos los turnos al formato que FullCalendar necesita
                const events = turnosDelMedico.map(turno => ({
                    title: `${turno.paciente.nombre} ${turno.paciente.apellido}`, // Nombre del paciente
                    start: turno.fecha,   // Fecha y hora del turno
                    description: `Motivo: ${turno.paciente.obrasocial ? turno.paciente.obrasocial : 'Sin obra social'}`, // Descripción opcional
                    extendedProps: {
                        paciente: turno.paciente.nombre,
                        telefono: turno.paciente.telefono,
                        email: turno.paciente.email
                    }
                }));

                successCallback(events);  // Pasamos los eventos al calendario
            } catch (error) {
                console.error('Error al cargar los turnos:', error);
                failureCallback(error);  // En caso de error, pasamos el error al callback
            }
        },
        eventClick: function(info) {
            // Mostramos un alert con los detalles del evento
            const { paciente, telefono, email } = info.event.extendedProps;
            alert(`Paciente: ${info.event.title}\nHora: ${info.event.start.toLocaleString()}\nMotivo: ${info.event.extendedProps.description}\nTelefono: ${telefono}\nEmail: ${email}`);
        }
    });

    // Renderizamos el calendario
    calendar.render();
});

*/
//agenda del medico

const listaPacientes = Array.from({ length: 25 }, (_, i) => i + 1); // Lista de pacientes del 1 a x
//const listaPacientes = [22,25]; // Ejemplo de lista de pacienteId
// Función personalizada para mostrar el popup con los detalles de la agenda
function popupAgenda(message) {
    return new Promise((resolve) => {
        let popupOverlay = document.getElementById("custom-popup");

        // Si el popup ya existe, eliminarlo para evitar conflictos
        if (popupOverlay) {
            popupOverlay.remove();
        }

        // Crear el contenedor del popup
        popupOverlay = document.createElement("div");
        popupOverlay.id = "custom-popup";
        popupOverlay.className = "popup-overlay";
        popupOverlay.style.display = "none";

        // Crear el contenido del popup
        const popupContent = document.createElement("div");
        popupContent.className = "popup-content";

        // Crear el mensaje
        const popupMessage = document.createElement("p");
        popupMessage.id = "popup-message";

        // Usamos innerHTML para inyectar el mensaje con HTML (con saltos de línea, etc.)
        popupMessage.innerHTML = message;

        // Crear el botón de Aceptar
        const acceptButton = document.createElement("button");
        acceptButton.id = "popup-accept-btn";
        acceptButton.classList.add("aceptarBoton", "cancelarAceptarBoton");
        acceptButton.textContent = "Aceptar";
        
        acceptButton.onclick = function() {
            popupOverlay.style.display = "none";
            popupOverlay.remove();
            resolve(true);  // Resuelve la promesa con true
        };

        // Agregar el mensaje y el botón al contenido
        popupContent.appendChild(popupMessage);
        popupContent.appendChild(acceptButton);

        // Agregar el contenido al overlay
        popupOverlay.appendChild(popupContent);

        // Agregar el overlay al cuerpo del documento
        document.body.appendChild(popupOverlay);

        // Mostrar el popup
        popupOverlay.style.display = "flex";
    });
}

document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendario');

    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        locale: 'es',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        events: async function(info, successCallback, failureCallback) {
            try {
                const medicoId = localStorage.getItem('userId'); // Obtener el ID del médico logueado
                if (!medicoId) {
                    console.error("ID de médico no encontrado en localStorage");
                    failureCallback("ID de médico no encontrado");
                    return;
                }

                let turnosDelMedico = [];

                // Recorremos todos los pacientes
                for (let pacienteId of listaPacientes) {
                    const listaTurnos = await api_queryTurnosReservados(pacienteId); // Obtienes los turnos del paciente
                    if (Array.isArray(listaTurnos)) {
                        // Filtramos los turnos por medicoId
                        const turnosFiltrados = listaTurnos.filter(turno => turno.medico.id === parseInt(medicoId));
                        turnosDelMedico = [...turnosDelMedico, ...turnosFiltrados];
                    }
                }

                // Mapeamos los turnos al formato que FullCalendar necesita
                const events = turnosDelMedico.map(turno => ({
                    title: `${turno.paciente.nombre} ${turno.paciente.apellido}`,
                    start: turno.fecha,
                    description: `Información: ${turno.paciente.obrasocial ? turno.paciente.obrasocial : 'Sin obra social'}`,
                    extendedProps: {
                        paciente: turno.paciente.nombre,
                        telefono: turno.paciente.telefono,
                        email: turno.paciente.email
                    }
                }));

                successCallback(events); // Pasamos los eventos al calendario
            } catch (error) {
                console.error('Error al cargar los turnos:', error);
                failureCallback(error);
            }
        },
eventClick: function(info) {
    const { paciente, telefono, email } = info.event.extendedProps;

    // Crear el mensaje con saltos de línea usando "\n" para representar saltos de línea
    let mensaje = `
        <strong>Paciente:</strong> ${info.event.title}<br>
        <strong>Fecha y hora:</strong> ${info.event.start.toLocaleString()}<br>
        <strong>Teléfono:</strong> ${telefono}<br>
        <strong>Email:</strong> ${email}
    `;

    // Llamar a la nueva función popupAgenda con el mensaje con <br> y HTML
    popupAgenda(mensaje).then(() => {
        // Aquí ya no es necesario hacer nada más, el popupAgenda se encargará de mostrar todo correctamente.
    });
}             
    });

    // Renderizamos el calendario
    calendar.render();
});
