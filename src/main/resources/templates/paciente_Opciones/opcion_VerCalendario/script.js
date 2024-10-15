let selectedDay = null; // Variable para almacenar el día seleccionado
let selectedHour = null; // Variable para almacenar la hora seleccionada

// Fechas y horas no disponibles (formato: 'DD/MM/YYYY HH:MM')
const unavailableDates = [
  { day: 0 }, // Todos los domingos
  { date: '03/10/2024', hour: '15:00' }, // 3 de octubre de 2024 a las 15:00
  { date: '04/10/2024', hour: '10:30' }, // 4 de octubre de 2024 a las 10:30
  { date: '05/10/2024', hour: '14:00' }, // 5 de octubre de 2024 a las 14:00
  { date: '10/10/2024', hour: '16:00' }  // 10 de octubre de 2024 a las 16:00
];

// Función para verificar si la hora en el día seleccionado está disponible
function isUnavailableHour(hour) {
  const year = document.getElementById("yearSelect").value;
  const month = document.getElementById("monthSelect").value;
  const formattedDate = `${selectedDay.toString().padStart(2, '0')}/${(parseInt(month) + 1).toString().padStart(2, '0')}/${year}`;

  // Bloquear las fechas y horas definidas en el arreglo `unavailableDates`
  return unavailableDates.some(date => date.date === formattedDate && date.hour === hour);
}

// Función para generar los días en base al mes y año seleccionados
function generateDays() {
  const daysTable = document.getElementById("daysTable");
  daysTable.innerHTML = ""; // Limpiar la tabla existente

  const year = document.getElementById("yearSelect").value;
  const month = document.getElementById("monthSelect").value;

  // Obtener el primer día del mes y el último día
  const firstDay = new Date(year, month, 1).getDay();
  const lastDay = new Date(year, parseInt(month) + 1, 0).getDate();

  // Crear los encabezados para los días de la semana
  const weekDays = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  let headerRow = document.createElement("tr");
  for (let day of weekDays) {
    let th = document.createElement("th");
    th.textContent = day;
    headerRow.appendChild(th);
  }
  daysTable.appendChild(headerRow);

  // Crear las filas de la tabla para los días
  let row = document.createElement("tr");
  // Crear celdas vacías antes del primer día
  for (let i = 0; i < firstDay; i++) {
    let cell = document.createElement("td");
    row.appendChild(cell);
  }

  // Crear celdas para cada día del mes
  for (let day = 1; day <= lastDay; day++) {
    if (row.children.length === 7) {
      daysTable.appendChild(row);
      row = document.createElement("tr");
    }

    let cell = document.createElement("td");
    cell.textContent = day;

    // Obtener el día de la semana (0: Domingo, 1: Lunes, etc.)
    let currentDate = new Date(year, month, day);
    let weekDay = currentDate.getDay();

    // Verificar si es un domingo o una fecha específica no disponible
    if (weekDay === 0 || isUnavailableDay(day, month, year)) {
      cell.classList.add("unavailable");
    } else {
      // Solo permitir clic en días disponibles
      cell.onclick = function() {
        selectDay(cell, day);
      };
    }
    row.appendChild(cell);
  }

  // Añadir la fila restante
  if (row.children.length > 0) {
    daysTable.appendChild(row);
  }

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
  selectedDay = day; // Guardar el día seleccionado

  // Mostrar el día seleccionado
  document.getElementById("selectedValue").textContent = "Día seleccionado: " + day;

  // Generar las horas disponibles para el día seleccionado
  generateHours();
}

// Función para generar los años en el selector de año
function generateYears() {
  const yearSelect = document.getElementById("yearSelect");
  const currentYear = new Date().getFullYear();

  // Generar opciones de año dinámicamente (últimos 100 años)
  for (let year = currentYear; year >= currentYear - 100; year--) {
    const option = document.createElement('option');
    option.value = year;
    option.textContent = year;
    yearSelect.appendChild(option);
  }
}

// Función para actualizar los días cuando cambian el mes o el año
function updateDays() {
  generateDays(); // Regenerar los días disponibles
}

// Función para generar la tabla de horarios con intervalos de 30 minutos
function generateHours() {
  const hoursTable = document.getElementById("hoursTable");
  hoursTable.innerHTML = ""; // Limpiar la tabla existente

  if (selectedDay === null) {
    // Si no hay un día seleccionado, no generamos horas
    document.getElementById("selectedHour").textContent = "Seleccione un día primero";
    return;
  }

  // Generar las horas de 00:00 a 23:30 en intervalos de 30 minutos
  for (let hour = 11; hour < 18; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      let row = document.createElement("tr");
      let cell = document.createElement("td");

      // Formato para mostrar la hora en HH:MM
      let formattedHour = hour.toString().padStart(2, '0') + ":" + minute.toString().padStart(2, '0');
      cell.textContent = formattedHour;

      // Verificar si la hora está bloqueada
      if (isUnavailableHour(formattedHour)) {
        cell.classList.add("unavailable");
      } else {
        cell.onclick = function() {
          selectHour(cell, formattedHour);
        };
      }

      row.appendChild(cell);
      hoursTable.appendChild(row);

    }
  }
}

// Función para verificar si la hora en el día seleccionado está disponible
function isUnavailableHour(hour) {
  const year = document.getElementById("yearSelect").value;
  const month = document.getElementById("monthSelect").value;
  const formattedDate = `${selectedDay.toString().padStart(2, '0')}/${(parseInt(month) + 1).toString().padStart(2, '0')}/${year}`;

  return unavailableDates.some(date => date.date === formattedDate && date.hour === hour);
}

// Función para seleccionar una hora y resaltarla
function selectHour(cell, hour) {
  // Desmarcar cualquier hora previamente seleccionada
  const previousSelectedHour = document.querySelector(".selected-hour");
  if (previousSelectedHour) {
    previousSelectedHour.classList.remove("selected-hour");
  }

  // Marcar la nueva hora seleccionada
  cell.classList.add("selected-hour");
  selectedHour = hour; // Guardar la hora seleccionada

  // Mostrar la hora seleccionada
  document.getElementById("selectedHour").textContent = "Hora seleccionada: " + hour;
}

// Función para enviar la fecha y hora seleccionada al backend
function sendDate() {
  const year = document.getElementById("yearSelect").value;
  const month = document.getElementById("monthSelect").value;

  if (selectedDay === null) {
    alert("Por favor, seleccione un día.");
    return;
  }

  if (selectedHour === null) {
    alert("Por favor, seleccione una hora.");
    return;
  }

  const selectedDateTime = {
    day: selectedDay,
    month: parseInt(month) + 1, // Añadir 1 al mes porque en JavaScript empieza en 0
    year: year,
    hour: selectedHour
  };

  // Hacer una solicitud POST al backend
  fetch('URL_DEL_BACKEND', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(selectedDateTime)
  })
  .then(response => response.json())
  .then(data => {
    console.log('Éxito:', data);
    
    // Formatear la fecha y hora para mostrar en la alerta
    const formattedDateTime = `Fecha: ${selectedDateTime.day}/${selectedDateTime.month}/${selectedDateTime.year} Hora: ${selectedDateTime.hour}`;
    
    // Mostrar la fecha y hora en la alerta
    alert('Fecha y hora enviadas correctamente. ' + formattedDateTime);
  })
  .catch((error) => {
    const formattedDateTime = `Fecha: ${selectedDateTime.day}/${selectedDateTime.month}/${selectedDateTime.year} Hora: ${selectedDateTime.hour}`;
    console.error('Error:', error);
    alert(formattedDateTime);
  });

}

// Inicializar la página al cargar
window.onload = function() {
  generateYears(); // Llenar el selector de años
  const today = new Date();
  document.getElementById("monthSelect").value = today.getMonth(); // Seleccionar el mes actual
  document.getElementById("yearSelect").value = today.getFullYear(); // Seleccionar el año actual
  generateDays(); // Generar los días para el mes y año actuales
  generateHours(); // Generar las horas
};

// Función para verificar si un día está bloqueado
function isUnavailableDay(day, month, year) {
  const formattedDate = `${day.toString().padStart(2, '0')}/${(parseInt(month) + 1).toString().padStart(2, '0')}/${year}`;

  // Bloquear los domingos
  let currentDate = new Date(year, month, day);
  if (currentDate.getDay() === 0) { // 0 es domingo
    return true;
  }

  // No bloquear el 3 de octubre como día, pero manejaremos las horas más tarde
  return false;
}