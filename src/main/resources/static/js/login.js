
document.getElementById('registerBtn').addEventListener('click', function () {
    const dni = document.getElementById('dni').value;
    const telefono = document.getElementById('telefono').value;
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Validar campos requeridos
    if (!dni || !telefono || !nombre || !apellido || !email || !password) {
        popup("Por favor, completa todos los campos.");
    }

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
    .then(response => response.json())
    .then(data => {
        popup(data.message);
    })
    .catch(error => {
        popup('Error:', error);
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
    .then(response => response.json())
    .then(data => {
        sessionStorage.setItem('accessToken',data.accessToken);
        console.log("access token: " + sessionStorage.getItem('accessToken'));
    })
    .catch(error => {
        popup(error)
    });
});
