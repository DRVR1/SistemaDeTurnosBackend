
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

        // Agregar estilos CSS
        const style = document.createElement('style');
        style.innerHTML = `
            .popup-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.5);
                z-index: 9999;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .popup-content {
                background-color: white;
                padding: 20px;
                border-radius: 10px;
                box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.3);
                text-align: center;
                max-width: 400px;
                width: 80%;
            }
            #popup-accept-btn, #popup-cancel-btn {
                background-color: #4CAF50;
                color: white;
                padding: 10px 20px;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                margin: 5px;
            }
            #popup-cancel-btn {
                background-color: #f44336;
            }
            #popup-accept-btn:hover {
                background-color: #45a049;
            }
            #popup-cancel-btn:hover {
                background-color: #d32f2f;
            }
        `;
        document.head.appendChild(style);

        // Mostrar el mensaje en el popup
        document.getElementById("popup-message").textContent = message;

        // Mostrar el popup
        popupOverlay.style.display = "flex";
    });
}
