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

        //agregar un listener al div
        dayDiv.onclick = function(){
            
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
