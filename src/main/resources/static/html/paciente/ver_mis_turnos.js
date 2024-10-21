async function main(){
    pacienteId = localStorage.getItem('userId');
    turnosList = await api_queryTurnosReservados(pacienteId);  // Si no le doy turnos, buscar en los reservados
    generarTurnos(turnosList,false);
}

main();