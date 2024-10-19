
function cerrarSesion(){
    localStorage.clear(); window.location.href = 'http://localhost:8080';
}


document.addEventListener('DOMContentLoaded', function() {
    const titulo = document.getElementById('navTitulo');
    const botonReservarTurno = document.getElementById('botonReservarTurno');
    const botonVerTurnosReservados = document.getElementById('botonVerTurnosReservados');

    titulo.addEventListener('click', function() {
        window.location.href = 'http://localhost:8080';
    });


    botonReservarTurno.addEventListener('click', function() {
        window.location.href = 'http://localhost:8080/html/paciente/seleccionar_especialidad.html';
    });

    botonVerTurnosReservados.addEventListener('click', function() {
        window.location.href = 'http://localhost:8080/html/paciente/ver_mis_turnos.html';
    });

});

