
async function main(){
  turnos = await api_queryTurnos(localStorage.getItem('especialidadId'));

  if(turnos.length === 0){
    popup("No hay turnos disponibles, vuelva en otro momento.");
  }else{
    generarTurnos(turnos,true);
    setCalendarioTurnosList(turnos);
    generarCalendario();
  }
  
}
  
main();