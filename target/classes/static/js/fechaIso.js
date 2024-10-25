function convertirFecha(fechaISO) {
    const fechaDate = new Date(fechaISO); // Crear un objeto Date a partir de la cadena

    // Obtener los componentes de la fecha
    const dia = String(fechaDate.getDate()).padStart(2, '0'); // Día (con ceros a la izquierda)
    const mes = String(fechaDate.getMonth() + 1).padStart(2, '0'); // Mes (sumar 1 porque getMonth() devuelve 0-11)
    const anio = fechaDate.getFullYear(); // Año

    // Devolver la fecha en formato DD/MM/AAAA
    return `${dia}/${mes}/${anio}`;
}


function convertirHora(fechaISO){
    const fechaDate = new Date(fechaISO); // Crear un objeto Date a partir de la cadena
    const horas = fechaDate.getHours().toString().padStart(2, '0');
    const minutos = fechaDate.getMinutes().toString().padStart(2, '0');
    const horaFormateada = `${horas}:${minutos}`;
    return horaFormateada;
}

function getfechaDDMMAAAA(day,month,year){ // Estandarizar el formato fecha en DD/MM/AAAA
    day = String(day).padStart(2, '0');
    month = String(month).padStart(2, '0');
    month = Number(month) + 1;
    month = month.toString()
    year = String(year);
    final = day + "/" + month + "/" + year;
    return final
}