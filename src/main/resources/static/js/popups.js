
function popup(message,aceptar,cancelar) {
    return new Promise((resolve) => {
        let popupOverlay = document.getElementById("custom-popup");

        // Si el popup ya existe, eliminarlo para evitar conflictos
        if (popupOverlay) {
            popupOverlay.remove();
        }

        // Crear el contenedor del popup
        popupOverlay = document.createElement("div");
        popupOverlay.id = "custom-popup";
        popupOverlay.className = "popup-overlay";
        popupOverlay.style.display = "none";

        // Crear el contenido del popup
        const popupContent = document.createElement("div");
        popupContent.className = "popup-content";

        // Crear el mensaje
        const popupMessage = document.createElement("p");
        popupMessage.id = "popup-message";

        // Crear el botón de Aceptar
        const acceptButton = document.createElement("button");
        acceptButton.id = "popup-accept-btn";
        acceptButton.classList.add("aceptarBoton","cancelarAceptarBoton");
        if(aceptar){
            acceptButton.textContent = aceptar;
        }else{
            acceptButton.textContent = "Aceptar";
        }
        
        acceptButton.onclick = function() {
            popupOverlay.style.display = "none";
            popupOverlay.remove();
            resolve(true);  // Resuelve la promesa con true
        };

        // Agregar el mensaje y los botones al contenido
        popupContent.appendChild(popupMessage);
        popupContent.appendChild(acceptButton);

        if(cancelar){
            // Crear el botón de Cancelar
            const cancelButton = document.createElement("button");
            cancelButton.id = "popup-cancel-btn";
            cancelButton.className = "cancelarBoton";
            cancelButton.classList.add("cancelarBoton","cancelarAceptarBoton");
            cancelButton.textContent = cancelar;
            cancelButton.onclick = function() {
                popupOverlay.style.display = "none";
                popupOverlay.remove();
                resolve(false);  // Resuelve la promesa con false
            };
            popupContent.appendChild(cancelButton);
        }

        // Agregar el contenido al overlay
        popupOverlay.appendChild(popupContent);

        // Agregar el overlay al cuerpo del documento
        document.body.appendChild(popupOverlay);

        // Mostrar el mensaje en el popup
        document.getElementById("popup-message").textContent = message;

        // Mostrar el popup
        popupOverlay.style.display = "flex";
    });
}
