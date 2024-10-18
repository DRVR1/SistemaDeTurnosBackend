

api_url = 'http://localhost:8080'

function guardarToken(token) {
    localStorage.setItem('bearerToken', token);
}

function cargarToken() {
    return localStorage.getItem('bearerToken');
}


async function api_queryTurnos(especialidadID) {
  var listaTurnos = [];
  try {
      url = 'http://localhost:8080/api/verTurnos?id=' + especialidadID
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
}

//hardcoded
async function api_queryTurnosReservados(pacienteId) {
    var listaTurnos = [];
    try {
        url = 'http://localhost:8080/api/verTurnosReservados?pacienteId=' + pacienteId
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
  }

async function api_queryEspecialidades() {
    try {
        const url = 'http://localhost:8080/api/verEspecialidades';

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
        popup("No se pudo conectar con el servidor, inténtelo más tarde. " + url);
    }
}


//hardcoded
function api_reservarTurno(id) {
    const turno = {
        id: id,
        paciente: {
            id: 1
        }
    };
    fetch("http://localhost:8080/api/reservarTurno", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(turno)
    })
    .then(response => response.json()) //Convertir respuesta a json
    .then(data => {                    //El json.message imprimirlo en el popup
        popup(data.message);
        console.log("Respuesta del servidor:", text);
    })
    .catch(error => {
        console.error("Error:", error);
    });
}

//hardcoded
function api_cancelarTurno(id) {
    const turno = {
        id: id
    };
    fetch("http://localhost:8080/api/cancelarTurno", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(turno)
    })
    .then(response => response.json()) //Convertir respuesta a json
    .then(data => {                    //El json.message imprimirlo en el popup
        popup(data.message);
        console.log("Respuesta del servidor:", text);
    })
    .catch(error => {
        console.error("Error:", error);
    });
}


