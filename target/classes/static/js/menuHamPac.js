class MyMenuPac extends HTMLElement {
    connectedCallback() {
        fetch("menuHamPac.html")
            .then(response => response.text())
            .then(data => {
                this.innerHTML = data;
            });
    }
}

customElements.define('my-menu-pac', MyMenuPac);