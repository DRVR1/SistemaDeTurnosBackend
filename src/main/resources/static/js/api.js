

api_url = 'http://localhost:8080'

function guardarToken(token) {
    localStorage.setItem('bearerToken', token);
}
// Función para cargar el token desde localStorage
function cargarToken() {
    return localStorage.getItem('bearerToken');
}


async function api_queryTurnos(especialidadID) {
  var listaTurnos = [];
  try {
      // Hacer la solicitud al servidor
      url = 'http://localhost:8080/verTurnos?especialidadID=' + especialidadID
      const response = await fetch(url,{
        'Authorization': `Bearer ${cargarToken()}`
      });
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
        // Definir la URL del servidor
        const url = 'http://localhost:8080/api/verEspecialidades';

        // Hacer la solicitud al servidor
        const response = await fetch(url, {
            method: 'GET', // Método GET
            headers: {
                'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI4IiwiZXhwIjoxNzI5OTg4ODMzLCJlIjoicGFjaWVudGVAZ21haWwuY29tIiwiYSI6WyJST0xFX1BBQ0lFTlRFIl19.8zd9UpRoZZPG0kfR1XP1F_tyclQ3q3rgH2-RLDGyViM`,
                'Content-Type': 'application/json' // Este header es opcional pero recomendable
            }
        });

        if (!response.ok) {
            throw new Error('Error en la respuesta del servidor: ' + response.statusText);
        }

        const data = await response.json();
        return data; // Devolver los datos obtenidos
    } catch (error) {
        console.error('Error:', error);
        popup("No se pudo conectar con el servidor, inténtelo más tarde. " + url);
    }
}



function api_reservarTurno(id) {
    const data = new URLSearchParams();
    data.append('turnoID', id);
    data.append('pacienteID', 2); // Asegúrate de que este ID exista en la base de datos

    fetch('http://localhost:8080/reservarTurno', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: data.toString()
    })
    .then(response => {
        if (response.ok) {
            // Si la respuesta es 200 OK
            return response.text().then(body => {
                popup(body); // Mostrar el cuerpo de la respuesta en el popup
            });
        } else {
            // Si hay un error, lanzar un error con el estado
            return response.json().then(error => {
                throw new Error(error.message || "Error desconocido al reservar el turno");
            });
        }
    })
    
}






