
/**
 * Presionar login en el register
 */
document.getElementById('toggleLogin').addEventListener('click', function () {
    var login_form = document.getElementById('loginBox');
    login_form.classList.remove('hidden');

    var register_form = document.getElementById('registerBox');
    register_form.classList.add('hidden');
});


/**
 * Presionar registrarse en el login
 */
document.getElementById('toggleRegister').addEventListener('click', function () {
    var login_form = document.getElementById('loginBox');
    login_form.classList.add('hidden');

    var register_form = document.getElementById('registerBox');
    register_form.classList.remove('hidden');
});

/**
 * Mostrar y ocultar contraseña en el formulario de login
 */
var loginShowingPassword = false;
document.getElementById('loginShowPasswordDiv').addEventListener('click', function () {
    var checkbox = document.getElementById('loginShowPasswordInput');
    var pass = document.getElementById('loginPassword')
    if(!loginShowingPassword){
        checkbox.checked = true;
        loginShowingPassword = true;
        pass.type = 'text'
    }else{
        checkbox.checked = false;
        loginShowingPassword = false;
        pass.type = 'password'
    }
    
});


document.getElementById('registerBtn').addEventListener('click', function () {
    const dni = document.getElementById('dni').value;
    const telefono = document.getElementById('telefono').value;
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const passwordReplay = document.getElementById('passwordReplay').value;

    if (password != passwordReplay){
        popup("Las contraseñas no coinciden");
        return;
    }

    const pacienteData = {
        dni: dni,
        telefono: telefono,
        nombre: nombre,
        apellido: apellido,
        email: email,
        password: password
    };

    fetch(app_url+'/api/altaPaciente', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(pacienteData)
    })
    .then(popupLoadingOn())
    .then(response => response.json())
    .then(data => {
        popupLoadingOff();
        popup(data.message);
    })
    .catch(error => {
        popupLoadingOff();
        popup(error);
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
    
    fetch(app_url+'/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
    })
    .then(popupLoadingOn())
    .then(response => {
        if (response.status === 403) {
            throw new Error('Credenciales inválidas'); // Lanza un error para manejarlo en el catch
        }
        return response.json()})

    .then(data => {
        popupLoadingOff();
        localStorage.setItem('accessToken',data.accessToken);
        localStorage.setItem('role',data.role);
        localStorage.setItem('userId',data.userId);
        location.reload();
    })
    .catch(error => {
        popupLoadingOff()
        popup(error)
    });
});



//Si existe un token de acceso, redirigir a la pestaña de medicos o pacientes.
if(localStorage.getItem('accessToken') != null){
    var rol = localStorage.getItem('role'); 
    if(rol === 'ROLE_PACIENTE'){
        window.location.href = app_url+'/html/paciente/home_opciones.html';
    }else if(rol === 'ROLE_MEDICO'){
        window.location.href = app_url+'/html/medico/home_opciones.html';
    }
    
}
