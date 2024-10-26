async function main(){
    pacienteId = localStorage.getItem('userId');
    turnosList=[];

    turnosList =  await api_queryTurnosReservados(pacienteId); 
    if(turnosList.length === 0){
      popup("No hay turnos para mostrar.");
    }else{
      generarTurnos(turnosList,false);
    }
}

main();