
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
    .then(response => {
        if (response.status === 403) {
            throw new Error('Credenciales inválidas'); // Lanza un error para manejarlo en el catch
        }
        return response.json()})

    .then(data => {
        localStorage.setItem('accessToken',data.accessToken);
        localStorage.setItem('role',data.role);
        localStorage.setItem('userId',data.userId);
        location.reload();
    })
    .catch(error => {
        popup(error)
    });
});


//Diseño de la interfaz LOGIN
const check = document.getElementById('chk');
check.checked = true;
const loginForm = document.getElementById('login');

document.getElementById('signup').addEventListener('click', function() {
    check.checked = false;
});

loginForm.addEventListener('click', () => {
    check.checked = true;
  });


//Si existe un token de acceso, redirigir a la pestaña de medicos o pacientes.
if(localStorage.getItem('accessToken') != null){
    var rol = localStorage.getItem('role'); 
    if(rol === 'ROLE_PACIENTE'){
        window.location.href = 'http://localhost:8080/html/paciente/opciones.html';
    }else if(rol === 'ROLE_MEDICO'){
        window.location.href = 'http://localhost:8080/html/medico/opciones.html';
    }
    
}
