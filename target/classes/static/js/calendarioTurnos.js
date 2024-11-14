// Para depurar, ejecutar generarCalendario()

/*
<div class="calendar-container">
        <div class="filters">
            <label for="year">Año:</label>
            <select id="year" onchange="updateFilter()">
                <!-- Se generarán dinámicamente años -->
            </select>
            
            <label for="month">Mes</label>
            <select id="month" onchange="updateFilter()">
                <!-- Se generarán dinámicamente los meses -->
            </select>
        </div>

        <div class="calendar-grid" id="calendar">
            <!-- Aquí se mostrarán los días del calendario -->
        </div>
      </div>
*/

const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth(); // Enero es 0
const calendarGrid = document.getElementById('calendar');
const monthSelect = document.getElementById('month');
const yearSelect = document.getElementById('year');

let turnosList = null;
function setCalendarioTurnosList(newTurnosList) {
    turnosList = newTurnosList; // Asignas el nuevo valor a la variable global turnosList
}


// Inicializar filtros de año y mes
function generarCalendario() {
    if(!turnosList){
        turnosList = turnosDePruebaList;
        popup("Turnos no cargados. el calendario no va a funcionar correctamente.")
    }

    for (let i = currentYear; i <= currentYear + 5; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        yearSelect.appendChild(option);
    }

    populateMonths(currentYear);
    generateCalendar(currentYear, currentMonth);
}

function convertirFechaTurno(fechaTurno) {
    // Extraer la parte de la fecha (YYYY-MM-DD) de la fecha completa (YYYY-MM-DDTHH:mm:ss)
    const fecha = fechaTurno.split('T')[0]; // Tomamos solo la fecha (YYYY-MM-DD)
    return fecha;
}

// Función para ocultar turnos que no coinciden con la fecha seleccionada
function ocultarTurnosDeOtrosDias(fechaSeleccionada) {
    const rows = document.querySelectorAll("#turnosList li");  // Aquí usamos <li> porque los turnos están en una lista <ul>

    // Convertimos la fecha seleccionada a un objeto Date para comparaciones
    const fechaSeleccionadaDate = new Date(fechaSeleccionada);  // Convertimos la fecha seleccionada a un objeto Date

    rows.forEach(row => {
        const fechaTurno = row.querySelector(".turnoFecha").textContent.trim(); // Suponemos que la fecha del turno está en un elemento con clase 'turnoFecha'

        const fechaTurnoDate = new Date(fechaTurno);  // Convertimos la fecha del turno en un objeto Date

        // Comparamos las fechas: si coinciden, mostramos el turno; si no, lo ocultamos
        if (fechaSeleccionadaDate.getFullYear() === fechaTurnoDate.getFullYear() &&
            fechaSeleccionadaDate.getMonth() === fechaTurnoDate.getMonth() &&
            fechaSeleccionadaDate.getDate() === fechaTurnoDate.getDate()) {
            row.style.display = '';  // Si las fechas coinciden, mostramos el turno
        } else {
            row.style.display = 'none';  // Si no coinciden, ocultamos el turno
        }
    });
}
// Función para mostrar los turnos del día
async function mostrarTurnosDelDia(fechaSeleccionada) {
    try {
        // Obtener todos los turnos de la API
        const especialidadID = localStorage.getItem('especialidadId');
        if (!especialidadID) {
            console.error("Error: especialidadID no está definido");
            popup("No se ha seleccionado una especialidad válida.");
            return;
        }

        const turnos = await api_queryTurnos(especialidadID);  // Obtener los turnos para la especialidad seleccionada

        // Filtrar los turnos que coinciden con la fecha seleccionada
        const turnosFiltrados = turnos.filter(turno => {
            const fechaTurno = compararFecha(turno.fecha);  // Convierte la fecha del turno a formato YYYY-MM-DD
            return fechaTurno === fechaSeleccionada;  // Compara solo la parte de la fecha (sin la hora)
        });

        // Limpiar la lista de turnos mostrados antes de agregar los nuevos turnos filtrados
        const turnosList = document.querySelector("#turnosList");
        turnosList.innerHTML = '';  // Limpiar los turnos previos

        // Verificamos si hay turnos disponibles para la fecha seleccionada
        if (turnosFiltrados.length > 0) {
            // Agregar los turnos filtrados a la lista existente
            turnosFiltrados.forEach(turno => {
                // Extraer los datos del turno
                const turnoId = turno.id;
                const fechaIso = turno.fecha;
                const fechaDate = new Date(fechaIso);
                const medicoNombre = turno.medico.nombre;
                const medicoApellido = turno.medico.apellido;
                const especialidadNombre = turno.medico.especialidad.nombre;

                // Formato día/mes/año
                const dia = fechaDate.getDate();
                const mes = fechaDate.getMonth();
                const año = fechaDate.getFullYear();
                const fechaFormateada = getfechaDDMMAAAA(dia, mes, año);

                // Hora
                const horaFormateada = convertirHora(fechaIso);

                // Crear el item de lista <li>
                const li = document.createElement("li");
                li.id = 'li' + turnoId;  // Asignar un ID único para cada turno
                li.classList.add("turno-item");  // Agregar una clase CSS para estilizar el <li>

                // Crear el contenido HTML para el turno
                const turnoContent = `
                    <div class="turno-info">
                        <p><strong>Código del turno:</strong> ${turno.id}</p>
                        <p><strong>Fecha del turno:</strong> ${fechaFormateada}</p>
                        <p><strong>Hora del turno:</strong> ${horaFormateada}</p>
                        <p><strong>Médico asignado:</strong> ${medicoNombre} ${medicoApellido}</p>
                        <p><strong>Especialidad del Médico:</strong> ${especialidadNombre}</p>
                    </div>
                    <div class="turno-action">
                        <button class="aceptarBoton cancelarAceptarBoton" onclick="api_reservarTurno(${turno.id}, '${localStorage.getItem('userId')}')">Reservar turno</button>
                    </div>
                `;

                // Asignar el contenido HTML al <li>
                li.innerHTML = turnoContent;

                // Si el turno ya está reservado (suponiendo que la API devuelve un campo "reservado")
                if (turno.reservado) {  // Verifica si el turno está reservado
                    li.classList.add("reservado");  // Agregar la clase de fondo gris
                    const boton = li.querySelector(".aceptarBoton");
                    if (boton) boton.classList.add("ocultar-btn");  // Ocultar el botón de "Reservar"
                }

                // Agregar el <li> a la lista
                turnosList.appendChild(li);
            });
        } else {
            // Si no hay turnos disponibles, mostramos un mensaje
            popup("No hay turnos disponibles para esta fecha.");
        }

    } catch (error) {
        console.error("Error al mostrar los turnos:", error);
        popup("No se pudieron obtener los turnos para esta fecha.");
    }
}

function compararFecha(fechaConHora) {
    // Usamos la función Date para crear un objeto Date y luego formateamos a 'YYYY-MM-DD'
    const fecha = new Date(fechaConHora);
    const año = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');  // Mes comienza desde 0, por eso sumamos 1
    const dia = String(fecha.getDate()).padStart(2, '0');  // Aseguramos que el día tenga 2 dígitos
    return `${año}-${mes}-${dia}`;
}


function convertirFechaSeleccionada(dia, mes, anio) {
    // Recordemos que el mes en JavaScript es de 0 a 11, así que restamos 1 al mes seleccionado
    const mesAjustado = mes-1;  // Ajuste del mes (1 -> 0, 11 -> 10)
    
    const fecha = new Date(anio, mesAjustado, dia); // Usamos Date para construir la fecha correctamente
    const fechaFormateada = fecha.toISOString().split('T')[0]; // Formato: YYYY-MM-DD
    
    return fechaFormateada;
}



// Generar el calendario según el año y el mes
function generateCalendar(year, month) {
    calendarGrid.innerHTML = ''; // Limpiar calendario previo
    const firstDay = new Date(year, month, 1).getDay(); // Primer día del mes
    const daysInMonth = new Date(year, month + 1, 0).getDate(); // Cantidad de días en el mes

    // Añadir días de la semana
    const weekdays = ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa', 'Do'];
    weekdays.forEach(day => {
        const dayDiv = document.createElement('div');
        dayDiv.classList.add('weekdays');
        dayDiv.textContent = day;
        calendarGrid.appendChild(dayDiv);
    });

    // Generar días vacíos hasta el primer día del mes
    for (let i = 1; i < firstDay; i++) {
        const emptyDiv = document.createElement('div');
        calendarGrid.appendChild(emptyDiv);
    }


    // Generar los días del mes
    for (let i = 1; i <= daysInMonth; i++) {
        const dayDiv = document.createElement('div');
        dayDiv.classList.add("dayDiv");
        dayDiv.textContent = i;

        year = yearSelect.value;
        fechaDDMMAAAA = getfechaDDMMAAAA(i.toString(),monthSelect.value,year)


        //Resaltar los dias disponibles (segun los turnos)
        if (isAvaliable(fechaDDMMAAAA)){
            dayDiv.classList.add('day-available');
        }else{
            dayDiv.classList.remove('day-available');
        }

// Agregar el listener para capturar el día seleccionado
dayDiv.onclick = function() {
    const dia = i;  // 'i' es el día actual en el bucle de generación del calendario
    const mes = parseInt(monthSelect.value, 10) + 1; 
    const anio = yearSelect.value; // El año seleccionado

        // Obtener especialidadID de localStorage dentro del onclick
        const especialidadID = localStorage.getItem('especialidadId');
    
        // Si especialidadID es nulo o indefinido, mostrar error y no continuar
        if (!especialidadID) {
            console.error("Error: especialidadID no está definido");
            popup("No se ha seleccionado una especialidad válida.");
            return; // Terminar la función si no se encuentra especialidadID
        }
    
    
    // Ahora convertimos esa fecha seleccionada a formato YYYY-MM-DD
    const fechaSeleccionada = convertirFechaSeleccionada(dia, mes, anio);
    
    
    // Mostrar los turnos disponibles para esa fecha
    mostrarTurnosDelDia(fechaSeleccionada,especialidadID);
}

        calendarGrid.appendChild(dayDiv);
    }
}

function populateMonths(selectedYear) {
    oldValue = monthSelect.value;
    if (oldValue == ""){
        oldValue = currentMonth.toString();
    }
    monthSelect.innerHTML = ''; // Limpiar meses previos
    const startMonth = (selectedYear === currentYear) ? currentMonth : 0;
    const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    
    for (let i = startMonth; i < months.length; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = months[i];
        monthSelect.appendChild(option);
    }
    monthSelect.value = oldValue;
}





// Filtrar el calendario según año y mes seleccionados
function updateFilter() {
    const selectedYear = parseInt(yearSelect.value);
    const selectedMonth = parseInt(monthSelect.value);
    populateMonths(selectedYear);
    generateCalendar(selectedYear, selectedMonth);
}



  // Función para seleccionar un día y resaltarlo
function selectDay(cell, day) {
    // Desmarcar cualquier día previamente seleccionado
    const previousSelected = document.querySelector(".selected-day");
    if (previousSelected) {
      previousSelected.classList.remove("selected-day");
    }
  
    // Marcar el nuevo día seleccionado
    cell.classList.add("selected-day");
  
    // Mostrar el día seleccionado
    document.getElementById("selectedValue").textContent = "Día seleccionado: " + day;
    
}
  

// revisa los turnos para colorear el calendario con los turnos disponibles
function isAvaliable(fechaDDMMAAAA) { // formato DD/MM/AAAA
    return turnosList.some(turno => convertirFecha(turno.fecha) === fechaDDMMAAAA);
}

//aca se reserva luego de filtrar los turnos. Deberían unirse con el prefiltrado.
