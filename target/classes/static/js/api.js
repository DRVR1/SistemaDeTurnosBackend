
app_url = 'http://localhost:8080'


function guardarToken(token) {
    localStorage.setItem('bearerToken', token);
}

function cargarToken() {
    return localStorage.getItem('bearerToken');
}


async function api_queryPaciente(id){
    try {
        popupLoadingOn(); 
        url = app_url + '/api/verDatosPaciente?id=' + id
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Error en la respuesta del servidor');
        }
        const data = await response.json();
        return data;
  } catch (error) {
        console.error('Error:', error);
        popup("No se pudo conectar con el servidor, inténtelo más tarde." + url);
  }finally{
    popupLoadingOff(); 
  }
}

async function api_queryMedico(id){
    try {
        popupLoadingOn(); 
        url = app_url + '/api/verDatosMedico?id=' + id
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Error en la respuesta del servidor');
        }
        const data = await response.json();
        return data;
  } catch (error) {
        console.error('Error:', error);
        popup("No se pudo conectar con el servidor, inténtelo más tarde." + url);
  }finally{
    popupLoadingOff(); 
  }
}

async function api_queryTurnos(especialidadID) {
    var listaTurnos = [];
    try {
          popupLoadingOn(); 
          url = app_url + '/api/verTurnos?id=' + especialidadID
          const response = await fetch(url);
          if (!response.ok) {
              throw new Error('Error en la respuesta del servidor');
          }
          const data = await response.json();
          listaTurnos = data;
          return listaTurnos;
    } catch (error) {
          console.error('Error:', error);
          popup("No se pudo conectar con el servidor, inténtelo más tarde." + url);
    }finally{
      popupLoadingOff(); 
    }
  }
  

//hardcoded
async function api_queryTurnosReservados(pacienteId) {
    var listaTurnos = [];
    try {
        popupLoadingOn();
        url = app_url + '/api/verTurnosReservados?pacienteId=' + pacienteId
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Error en la respuesta del servidor');
        }
        const data = await response.json();
        listaTurnos = data;
        return listaTurnos;
    } catch (error) {
        console.error('Error:', error);
        popup("No se pudo conectar con el servidor, inténtelo más tarde." + url);
    }
    finally{
        popupLoadingOff();
    }
  }

async function api_queryEspecialidades() {
    try {
        popupLoadingOn();
        const url = app_url +'/api/verEspecialidades';

        const response = await fetch(url, {
            method: 'GET', 
            headers: {
                'Content-Type': 'application/json' // Este header es opcional pero recomendable
            }
        });
        if (!response.ok) {
            throw new Error('Error en la respuesta del servidor: ' + response.statusText);
        }

        const data = await response.json();
        return data; 
    } catch (error) {
        console.error('Error:', error);
        popup("No se pudo conectar con el servidor, inténtelo más tarde.");
    }
    finally{
        popupLoadingOff();
    }
}


function api_reservarTurno(id, pacienteId) {
    popup("¿Desea reservar el turno?", "Reservar", "Cancelar").then((result) => {
        if (result) {
            popupLoadingOn(); // Mostrar el popup de carga antes de la solicitud
            
            const turno = {
                id: id,
                paciente: {
                    id: pacienteId
                }
            };
            
            fetch(app_url + "/api/reservarTurno", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(turno)
            })
            .then(response => response.json()) // Convertir respuesta a JSON
            .then(data => {     
                popup("Turno cancelado con éxito");
                // Cambiar el estilo del turno en la interfaz
                const li = document.getElementById('li' + id);
                const boton = li.querySelector('.aceptarBoton');
                li.classList.add("reservado");  // Agregar clase para el fondo gris
                boton.classList.add("ocultar-btn");  // Ocultar el botón de "Reservar"
            })
            .catch(error => {
                popup("No se pudo conectar con el servidor, inténtelo más tarde.");
                console.error("Error:", error);
            })
            .finally(() => {
                popupLoadingOff(); // Asegurarse de que siempre se apague el popup de carga
            });
        } else {
            // Si el usuario cancela, no hacemos nada
            console.log("Reserva cancelada");
        }
        // Espera de 5 segundos (5000 milisegundos)
        setTimeout(function() {
          //location.reload();
          // Aquí puedes colocar la acción que deseas ejecutar después de la espera
        }, 7500);
    });
}


//hardcoded
function api_cancelarTurno(id) {
    popup("¿Desea cancelar el turno?","Si","No").then((result) => {
        if (result) {
            popupLoadingOn(); // Mostrar el popup de carga antes de la solicitud
            const turno = {
                id: id
            };
            fetch(app_url+"/api/cancelarTurno", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(turno)
            })
            .then(response => response.json()) //Convertir respuesta a json
            .then(data => {
                popup("Turno cancelado con éxito");
                const li = document.getElementById('li' + id);
                const botonCancelar = li.querySelector(".cancelarBoton");
                li.classList.add("cancelado");  // Aplicamos fondo gris
                botonCancelar.classList.add("ocultar-btn");  // Ocultamos el botón "Cancelar turno"
                botonCancelar.disabled = true; // Deshabilitar el botón
                botonCancelar.textContent = "Turno cancelado"; 
            })
            .catch(error => {
                popup(error);
                console.error("Error:", error);
            })
            .finally(() => {popupLoadingOff()});
        }
        // Espera de 7 segundos (5000 milisegundos)
                    setTimeout(function() {
                      location.reload();
                      // Aquí puedes colocar la acción que deseas ejecutar después de la espera
                    }, 7500);
    });
}


async function api_queryObrasSociales() {
    try {
        const response = await fetch('/api/verObrasSociales'); // Ajusta el endpoint según tu backend
        if (!response.ok) {
            throw new Error('Error al obtener las obras sociales');
        }
        return await response.json();
    } catch (error) {
        console.error('Error en api_queryObrasSociales:', error);
        return [];
    }
}

