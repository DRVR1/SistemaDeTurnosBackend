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

