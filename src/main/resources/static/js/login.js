document.getElementById('showRegister').addEventListener('click', function (e) {
    e.preventDefault();
    document.getElementById('loginForm').classList.add('hidden');
    document.getElementById('registerForm').classList.remove('hidden');
});

document.getElementById('showLogin').addEventListener('click', function (e) {
    e.preventDefault();
    document.getElementById('registerForm').classList.add('hidden');
    document.getElementById('loginForm').classList.remove('hidden');
});

document.getElementById('registerBtn').addEventListener('click', function () {
    const dni = document.getElementById('dni').value;
    const telefono = document.getElementById('telefono').value;
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const pacienteData = {
        dni: dni,
        telefono: telefono,
        nombre: nombre,
        apellido: apellido,
        email: email,
        password: password
    };

    fetch('http://localhost:8080/api/altaPaciente', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(pacienteData)
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Error en el registro');
    })
    .then(data => {
        console.log('Registro exitoso:', data);
        // Aquí puedes agregar lógica para manejar el registro exitoso
    })
    .catch(error => {
        console.error('Error:', error);
        // Manejo de errores
    });
});

// Funcionalidad de inicio de sesión
document.getElementById('loginBtn').addEventListener('click', function () {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    const loginData = {
        email: email,
        password: password
    };

    fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Error en el inicio de sesión');
    })
    .then(data => {
        console.log('Inicio de sesión exitoso:', data);
        // Aquí puedes agregar lógica para manejar el inicio de sesión exitoso
    })
    .catch(error => {
        console.error('Error:', error);
        // Manejo de errores
    });
});
