
async function main(){
  turnos = null;
  try{
    turnos = await api_queryTurnos(localStorage.getItem('especialidadId'));
  }catch(e){
    
  }
  if(turnos){
    generarTurnos(turnos,true);
  }else{
    popup("No hay turnos disponibles, vuelva en otro momento.");
  }
  
  // Inicializar todo
  setCalendarioTurnosList(turnos);
  generarCalendario();
  }
  
main();