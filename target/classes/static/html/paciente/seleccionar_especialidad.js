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
    localStorage.setItem('especialidadId',select.value);
}
