
function cerrarSesion(){
    popup("¿Desea cerrar sesion?","Continuar","Cancelar").then((result) => {
        if (result) {
            localStorage.clear(); window.location.href = app_url;
        }else{
            
        }
    });
    
}

document.addEventListener('DOMContentLoaded', function() {
    const selectEspecialidad = document.getElementById('especialidad');
    const aceptarButton = document.getElementById('aceptarbutton');

    // Agregar eventListener para guardar el especialidadId cuando el usuario selecciona una especialidad
    selectEspecialidad.addEventListener('change', function() {
        const especialidadId = selectEspecialidad.value;
        localStorage.setItem('especialidadId', especialidadId);  // Guardamos el especialidadId en localStorage
    });

    // Manejar el clic en "Buscar Turno"
    aceptarButton.addEventListener('click', async function(event) {
        const hayTurnos = await verificarTurnosDisponibles();
        if (!hayTurnos) {
            popup("No hay turnos disponibles, vuelva en otro momento.");
            return;  // No redirigir si no hay turnos
        } else {
            window.location.href = app_url + '/html/paciente/ver_turnos_disponibles.html';  // Redirigir si hay turnos
        }
    });
});

// Función para verificar si hay turnos disponibles
async function verificarTurnosDisponibles() {
    const especialidadId = localStorage.getItem('especialidadId');

    if (!especialidadId) {
        return false;  // Si no hay especialidadId, no se pueden mostrar los turnos
    }

    // Aquí se hace la consulta a la API para obtener los turnos según el especialidadId
    let turnos = await api_queryTurnos(especialidadId);

    return turnos.length > 0;  // Devuelve verdadero si hay turnos
}
