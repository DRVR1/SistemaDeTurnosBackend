class MyHeader extends HTMLElement {
    connectedCallback() {
        fetch("../header.html")
            .then(response => response.text())
            .then(data => {
                this.innerHTML = data;
            });
    }
}

customElements.define('my-header', MyHeader);