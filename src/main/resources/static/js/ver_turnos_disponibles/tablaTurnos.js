function llenarTurnosDisponibles(turnos){
    turnos.forEach(turno => {
        // Obtener la tabla donde se insertarán los datos
        const tableBody = document.querySelector("#tablaTurnos tbody");
        // Crear una fila de la tabla
        const row = document.createElement("tr");

        var turnoID = turno.id;
        var fechaIso = turno.fecha;
        var fechaDate = new Date(fechaIso);

        /*
        var pacienteID = turno.paciente.id;
        var pacienteDNI = turno.paciente.dni;
        const pacienteNombre = turno.paciente.nombre;
        const pacienteApellido = turno.paciente.apellido;
        const pacienteTelefono = turno.paciente.telefono;
        const pacienteEmail = turno.paciente.email;

        const medicoID = turno.medico.id;
        const medicoDNI = turno.medico.dni;
        const medicoTelefono = turno.medico.telefono;
        const medicoEmail = turno.medico.email;
        const especialidadID = turno.medico.especialidad.id;
        */

        var medicoNombre = turno.medico.nombre;
        var medicoApellido = turno.medico.apellido;
        var especialidadNombre = turno.medico.especialidad.nombre;


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
        // Formato día/mes/año
        const dia = fechaDate.getDate()
        const mes = fechaDate.getMonth()
        const año = fechaDate.getFullYear();
        fechaFormateada = getFechaCompleta(dia,mes,año);
        fechaCell.textContent = fechaFormateada;
        row.appendChild(fechaCell);

        // hora
        const horaCell = document.createElement("td");
        const horas = fechaDate.getHours().toString().padStart(2, '0');
        const minutos = fechaDate.getMinutes().toString().padStart(2, '0');
        const horaFormateada = `${horas}:${minutos}`;
        horaCell.textContent = horaFormateada;
        row.appendChild(horaCell);

        // ReservarTurno
        const buttonCell = document.createElement("td");
        const button = document.createElement("button");
        button.textContent = "Reservar"
        button.classList.add("reservarBoton");
        buttonCell.appendChild(button);
        button.addEventListener("click", function() {
        api_reservarTurno(turnoID);
        });
        row.appendChild(buttonCell);


        // Añadir la fila a la tabla
        console.log("generando row de turno")
        tableBody.appendChild(row);
    });
}

function isAvaliable(fechaCompleta){ //formato DD/MM/AAAA
    const fechaFiltro = fechaCompleta;
    const tabla = document.getElementById("tablaTurnos");
    const filas = tabla.getElementsByTagName("tbody")[0].getElementsByTagName("tr");

    for (let i = 0; i < filas.length; i++) {
        const celdaFecha = filas[i].getElementsByTagName("td")[3];
        const fecha = celdaFecha.innerText;

        // Si la fecha coincide con la solicitada, devolver true
        if (fecha == fechaFiltro) {
            return true;
        }else{
        }
    }
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
            console.log("la fecha buscada " + fechaFiltro + "no coincide con la fecha " + fecha )
            filas[i].style.display = "none"; // Ocultar la fila
        } else {
            filas[i].style.display = ""; // Mostrar la fila
        }
    }
}
