
async function main(){
    turnos = await api_queryTurnos(sessionStorage.getItem('especialidadId'));
    llenarTurnosDisponibles(turnos); // Renderizar calendario
    // Inicializar todo
    generarCalendario();
  }
  
main();