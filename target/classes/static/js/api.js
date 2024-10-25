

app_url = 'http://localhost:8080'


function guardarToken(token) {
    localStorage.setItem('bearerToken', token);
}

function cargarToken() {
    return localStorage.getItem('bearerToken');
}


async function api_queryTurnos(especialidadID) {
  var listaTurnos = [];
  try {
        popupLoadingOn();
        url = app_url + '/api/verTurnos?id=' + especialidadID
        const response = await fetch(url);
        popupLoadingOff();
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
}

//hardcoded
async function api_queryTurnosReservados(pacienteId) {
    var listaTurnos = [];
    try {
        popupLoadingOn();
        url = app_url + '/api/verTurnosReservados?pacienteId=' + pacienteId
        const response = await fetch(url);
        popupLoadingOff();
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
        popupLoadingOff();
        if (!response.ok) {
            throw new Error('Error en la respuesta del servidor: ' + response.statusText);
        }

        const data = await response.json();
        return data; 
    } catch (error) {
        console.error('Error:', error);
        popup("No se pudo conectar con el servidor, inténtelo más tarde.");
    }
}


//hardcoded
function api_reservarTurno(id,pacienteId) {
    popup("¿Desea reservar el turno?","Reservar","Cancelar").then((result) => {
        if (result) {
            const turno = {
                id: id,
                paciente: {
                    id: pacienteId
                }
            };
            
            fetch(app_url+"/api/reservarTurno", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(turno)
            })
            .then(popupLoadingOn())
            .then(response => response.json()) //Convertir respuesta a json
            .then(data => {     
                popupLoadingOff();
                popup(data.message);
            })
            .catch(error => {
                popupLoadingOff();
                popup(error);
                console.error("Error:", error);
            });
        }
    });
    
}


//hardcoded
function api_cancelarTurno(id) {
    popup("¿Desea cancelar el turno?","Si","No").then((result) => {
        if (result) {
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
                .then(popupLoadingOn())
                .then(response => response.json()) //Convertir respuesta a json
                .then(data => {
                    popupLoadingOff();                    //El json.message imprimirlo en el popup
                    popup(data.message);
                })
                .catch(error => {
                    popupLoadingOff();     
                    popup(error);
                    console.error("Error:", error);
                });
            }
        else{}
    });

}


