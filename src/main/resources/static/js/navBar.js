
function cerrarSesion(){
    localStorage.clear(); window.location.href = 'http://localhost:80';
}


document.addEventListener('DOMContentLoaded', function() {
    const titulo = document.getElementById('navTitulo');
    const botonReservarTurno = document.getElementById('botonReservarTurno');
    const botonVerTurnosReservados = document.getElementById('botonVerTurnosReservados');

    titulo.addEventListener('click', function() {
        window.location.href = 'http://localhost:80';
    });


    botonReservarTurno.addEventListener('click', function() {
        window.location.href = 'http://localhost:80/html/paciente/seleccionar_especialidad.html';
    });

    botonVerTurnosReservados.addEventListener('click', function() {
        window.location.href = 'http://localhost:80/html/paciente/ver_mis_turnos.html';
    });

});

