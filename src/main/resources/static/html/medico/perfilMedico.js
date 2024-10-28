nombre = document.getElementById('nombre-display');
apellido = document.getElementById('apellido-display');
dni = document.getElementById('dni-display');
email = document.getElementById('email-display');
telefono = document.getElementById('telefono-display');

paciente = api_queryMedico(localStorage.getItem('userId')).then((paciente)=> {
    nombre.textContent = paciente.nombre + ", "
    apellido.textContent = paciente.apellido;
    dni.textContent = paciente.dni;
    email.textContent = paciente.email;
    telefono.textContent = paciente.telefono;
});

