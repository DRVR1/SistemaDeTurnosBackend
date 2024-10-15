async function main(){
    turnos = await api_queryTurnos(sessionStorage.getItem('especialidadID'));
    llenarTurnosDisponibles(turnos);
    // Inicializar todo
    generarCalendario();
  }
  
main();