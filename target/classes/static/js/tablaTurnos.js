// tabla con info de turnos para reservar
// depurar con agregarFilaTabla("medicoNombre","medicoApellido","especialidadNombre","fechaFormateada","horaFormateada");

/*
<h1 id="indicadorDisponibilidad">Turnos disponibles:</h1>
<div class="listaTurnos">
    <table id="tablaTurnos" class="medic-table">
        <thead>
            <tr>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Especialidad</th>
                <th>Fecha</th>
                <th>Hora</th>
                <th>Acción</th>
            </tr>
        </thead>
        <tbody>
        </tbody>
    </table>
</div>

*/
function llenarTurnosDisponibles(turnos) {
    const turnosList = document.querySelector("#turnosList");
    
    // Limpiar la lista antes de agregar los nuevos turnos
    turnosList.innerHTML = '';  

    turnos.forEach(turno => {
        var turnoId = turno.id;
        var fechaIso = turno.fecha;
        var fechaDate = new Date(fechaIso);
        var medicoNombre = turno.medico.nombre;
        var medicoApellido = turno.medico.apellido;
        var especialidadNombre = turno.medico.especialidad.nombre;

        // Formato día/mes/año
        const dia = fechaDate.getDate();
        const mes = fechaDate.getMonth();
        const año = fechaDate.getFullYear();
        const fechaFormateada = getfechaDDMMAAAA(dia, mes, año);

        // hora
        const horaFormateada = convertirFecha(fechaIso);

        // Crear el item de lista
        const li = document.createElement("li");
        li.classList.add("turno-item");  // Se puede agregar una clase para aplicar estilos si es necesario

        // Crear el contenido del turno
        const turnoContent = `
            <div class="turno-info">
                <p><strong>Medico:</strong> ${medicoNombre} ${medicoApellido}</p>
                <p><strong>Especialidad:</strong> ${especialidadNombre}</p>
                <p><strong>Fecha:</strong> ${fechaFormateada}</p>
                <p><strong>Hora:</strong> ${horaFormateada}</p>
                <button class="aceptarBoton cancelarAceptarBoton" onclick="api_reservarTurno(${turno.id},${localStorage.getItem("userId")})">Reservar turno</button>

            </div>
       
        `;
/*esto estaba antes del div anterior:
 <div class="turno-action">
 <button class="aceptarBoton cancelarAceptarBoton" onclick="api_reservarTurno(${turno.id},${localStorage.getItem("userId")})">Reservar turno</button>
 </div>*/




        // Asignar el contenido al <li>
        li.innerHTML = turnoContent;

        // Agregar el elemento <li> a la lista
        turnosList.appendChild(li);

        // Agregar el evento de click al botón de reservar
        const button = li.querySelector(".aceptarBoton");
        button.addEventListener("click", function () {
            api_reservarTurno(turnoId, localStorage.getItem('userId'));
        });
    });

    // Asegurarse de actualizar algún indicador si es necesario
    actualizarIndicador();
}


function agregarFilaTabla(turnoId, medicoNombre,medicoApellido,especialidadNombre,fechaFormateada,horaFormateada){
        // Obtener la tabla donde se insertarán los datos
        const tableBody = document.querySelector("#tablaTurnos tbody");
        // Crear una fila de la tabla
        const row = document.createElement("tr");

        // Nombre
        const nombreMedicoCell = document.createElement("td");
        nombreMedicoCell.textContent = medicoNombre;
        row.appendChild(nombreMedicoCell);

        // Apellido
        const apellidoMedicoCell = document.createElement("td");
        apellidoMedicoCell.textContent = medicoApellido;
        row.appendChild(apellidoMedicoCell);

        // Especialidad
        const especialidadCell = document.createElement("td");
        especialidadCell.textContent = especialidadNombre;
        row.appendChild(especialidadCell);

        // fecha
        const fechaCell = document.createElement("td");
        fechaCell.textContent = fechaFormateada;
        row.appendChild(fechaCell);


        const horaCell = document.createElement("td");
        horaCell.textContent = horaFormateada;
        row.appendChild(horaCell);

        // ReservarTurno
        const buttonCell = document.createElement("td");
        const button = document.createElement("button");
        button.textContent = "Reservar"
        button.classList.add("aceptarBoton");
        buttonCell.appendChild(button);
        button.addEventListener("click", function() {
        api_reservarTurno(turnoId,localStorage.getItem('userId'));
        });
        row.appendChild(buttonCell);

        tableBody.appendChild(row);
        actualizarIndicador();
}





function filtrarPorFecha(fechaCompleta) {
    const fechaFiltro = fechaCompleta;
    const tabla = document.getElementById("tablaTurnos");
    const filas = tabla.getElementsByTagName("tbody")[0].getElementsByTagName("tr");

    for (let i = 0; i < filas.length; i++) {
        const celdaFecha = filas[i].getElementsByTagName("td")[3];
        const fecha = celdaFecha.innerText;

        // Si la fecha no coincide con el filtro, ocultamos la fila
        if (fecha !== fechaFiltro) {
            filas[i].style.display = "none"; // Ocultar la fila
        } else {
            filas[i].style.display = ""; // Mostrar la fila
            actualizarIndicador();
        }
    }
}





function actualizarIndicador(){
// Selecciona el tbody de la tabla
const tbody = document.querySelector('#tablaTurnos tbody');
const visibleRows = Array.from(tbody.rows).filter(row => getComputedStyle(row).display !== 'none');

title = document.getElementById("indicadorDisponibilidad");
if (visibleRows.length === 0) {
    title.textContent = "No hay turnos disponibles para el dia seleccionado.";
} else {    
    title.textContent = `Hay ${visibleRows.length} turno/s disponibles para el dia seleccionado.`;
}

}
