
async function main(){
  turnos = null;
  try{
    turnos = await api_queryTurnos(localStorage.getItem('especialidadId'));
  }catch(e){
    
  }
  if(turnos != null){
    generarTurnos(turnos,true);
    setCalendarioTurnosList(turnos);
  }else{
    popup("No hay turnos disponibles, vuelva en otro momento.");
  }
  generarCalendario();
}
  
main();