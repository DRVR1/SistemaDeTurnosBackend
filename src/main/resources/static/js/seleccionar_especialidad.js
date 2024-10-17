/*
document.getElementById('form-turno').addEventListener('submit', function(e) {
    e.preventDefault();

    const especialidad = document.getElementById('especialidad').value;
    const fecha = document.getElementById('fecha').value;
    const resultadoDiv = document.getElementById('resultado');

    if (especialidad && fecha) {
        resultadoDiv.innerHTML = `
            <p>Especialidad seleccionada: <strong>${especialidad.charAt(0).toUpperCase() + especialidad.slice(1)}</strong></p>
            <p>Fecha de consulta: <strong>${fecha}</strong></p>
            <p>¡Turno reservado exitosamente!</p>
        `;
    } else {
        resultadoDiv.innerHTML = '<p style="color: red;">Por favor, selecciona una especialidad y una fecha válida.</p>';
    }
});
*/

select = document.getElementById('especialidad');

opciones = [];
async function cargarEspecialidades(){
    let listaEspecialidades = await api_queryEspecialidades();

    listaEspecialidades.forEach(especialidad => {
        opciones.push({key:especialidad.id, value:especialidad.nombre});
    });
    populateSelect();
}

function populateSelect(){
    // Agregamos las opciones al <select>
    opciones.forEach(opcion => {
      const newOption = document.createElement('option'); // Creamos un nuevo <option>
      newOption.value = opcion.key; // Asignamos el valor del option
      newOption.textContent = opcion.value; // Asignamos el texto que verá el usuario
      select.appendChild(newOption); // Lo añadimos al <select>
    });
}

cargarEspecialidades();

function guardarId(){
    sessionStorage.setItem('especialidadID',select.value);
}
