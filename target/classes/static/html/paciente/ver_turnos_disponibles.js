
async function main() {
    const especialidadId = localStorage.getItem('especialidadId');
    const obrasocialId = localStorage.getItem('obrasocialId'); // Puede ser null si no se seleccionó ninguna obra social

    if (!especialidadId) {
        // Si no hay especialidad seleccionada, mostramos un error
        popup("Debes seleccionar una especialidad.");
        return;
    }

    // Consulta turnos usando especialidadId y si existe, también el obrasocialId
    turnos = await api_queryTurnos(especialidadId, obrasocialId);

    if (turnos.length === 0) {
        popup("No hay turnos disponibles, vuelva en otro momento.");
    } else {
        generarTurnos(turnos, true);
        setCalendarioTurnosList(turnos);
        generarCalendario();
    }
}

main();


async function api_queryTurnos(especialidadId, obrasocialId) {
    let url = `/api/verTurnos?especialidadId=${especialidadId}`;

    // Solo agrega `obrasocialId` al URL si tiene un valor válido (no es null ni una cadena vacía)
    if (obrasocialId && obrasocialId !== "null" && obrasocialId !== "") {
        url += `&obrasocialId=${obrasocialId}`;
    }

    const response = await fetch(url);
    return response.json();
}
