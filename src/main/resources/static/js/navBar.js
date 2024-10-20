
function cerrarSesion(){
    localStorage.clear(); window.location.href = app_url;
}


document.addEventListener('DOMContentLoaded', function() {
    const titulo = document.getElementById('navTitulo');
    const botonReservarTurno = document.getElementById('botonReservarTurno');
    const botonVerTurnosReservados = document.getElementById('botonVerTurnosReservados');

    titulo.addEventListener('click', function() {
        window.location.href = app_url;
    });


    botonReservarTurno.addEventListener('click', function() {
        window.location.href = app_url+'/html/paciente/seleccionar_especialidad.html';
    });

    botonVerTurnosReservados.addEventListener('click', function() {
        window.location.href = app_url+'/html/paciente/ver_mis_turnos.html';
    });

});

