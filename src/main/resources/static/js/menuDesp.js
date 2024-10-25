const checkbox = document.getElementById("checkbox");
const overlay = document.getElementById("overlay");
const menu = document.getElementById("menuDesp");

// Detecta el cambio de estado del checkbox para abrir/cerrar el menú
checkbox.addEventListener("change", toggleMenu);

function toggleMenu() {
    if (checkbox.checked) {
        overlay.style.display = "block";
        menu.classList.add("open");
    } else {
        overlay.style.display = "none";
        menu.classList.remove("open");
    }
}

// Cierra el menú cuando se hace clic en el overlay
overlay.addEventListener("click", () => {
    checkbox.checked = false; // Deselecciona el checkbox
    toggleMenu();
});