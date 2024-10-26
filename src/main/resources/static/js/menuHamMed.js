class MyMenuMed extends HTMLElement {
    connectedCallback() {
        fetch("menuHamMed.html")
            .then(response => response.text())
            .then(data => {
                this.innerHTML = data;
            });
    }
}

customElements.define('my-menu-med', MyMenuMed);