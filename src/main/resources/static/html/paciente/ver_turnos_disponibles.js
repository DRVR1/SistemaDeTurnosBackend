
async function main(){
    turnos = await api_queryTurnos(localStorage.getItem('especialidadId'));
    llenarTurnosDisponibles(turnos); // Renderizar calendario
    // Inicializar todo
    generarCalendario();
  }
  
main();