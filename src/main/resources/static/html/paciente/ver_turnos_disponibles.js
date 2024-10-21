
async function main(){
  try{
    turnos = await api_queryTurnos(localStorage.getItem('especialidadId'));

  }catch(e){
    
  }
    generarTurnos(turnos,true);
    // Inicializar todo
    setCalendarioTurnosList(turnos);
    generarCalendario();
  }
  
main();