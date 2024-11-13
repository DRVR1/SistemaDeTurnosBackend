// Obtener el elemento del select
const selectEspecialidad = document.getElementById('especialidad');
const selectObraSocial = document.getElementById('obrasocial');

opcionesEspecialidad = [];
opcionesObraSocial = [];

// Cargar especialidades
async function cargarEspecialidades() {
    let listaEspecialidades = await api_queryEspecialidades();
    listaEspecialidades.forEach(especialidad => {
        opcionesEspecialidad.push({ key: especialidad.id, value: especialidad.nombre });
    });
    populateSelectEspecialidad();
}

// Cargar obras sociales
async function cargarObrasSociales() {
    let listaObrasSociales = await api_queryObrasSociales();
    listaObrasSociales.forEach(obraSocial => {
        opcionesObraSocial.push({ key: obraSocial.id, value: obraSocial.nombre });
    });
    populateSelectObraSocial();
}

// Poblar select de especialidades
function populateSelectEspecialidad() {
    opcionesEspecialidad.forEach(opcion => {
        const newOption = document.createElement('option');
        newOption.value = opcion.key;
        newOption.textContent = opcion.value;
        selectEspecialidad.appendChild(newOption);
    });
}

// Poblar select de obras sociales
function populateSelectObraSocial() {
    opcionesObraSocial.forEach(opcion => {
        const newOption = document.createElement('option');
        newOption.value = opcion.key;
        newOption.textContent = opcion.value;
        selectObraSocial.appendChild(newOption);
    });
}

// Guardar selección en localStorage
function guardarSeleccion() {
    const especialidadId = selectEspecialidad.value;
    const obrasocialId = selectObraSocial.value || null; // Si no se selecciona obra social, se guarda como null
    localStorage.setItem('especialidadId', especialidadId);
    localStorage.setItem('obrasocialId', obrasocialId);
}


// Llamar las funciones para cargar datos
cargarEspecialidades();
cargarObrasSociales();
