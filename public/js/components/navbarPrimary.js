class NavbarPrimary extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: "open"});
    }

    static get styles() {
        return `
        @import url('../../style/style.css');
            :host {
                
            }
        `;
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>${NavbarPrimary.styles}</style>
            <nav class="menuPrincipal">
        <a href="/" class="menuPrincipal__back u-hidde u-hiddeDesktop"><i class="fa fa-chevron-left" aria-hidden="true"></i></a>
        <div class="menuPrincipal__leftWrapper">
            <h1 class="menuPrincipal__logo gelatina"><a class="menuPrincipal__logoLink" href="./">BOA</a></h1>
            <select name="ciudad" id="ciudad" class="menuPrincipal__select">
                <option value="Mar del Plata" selected>Mar del Plata</option>
                <option value="Mar del Plata" >Miramar</option>
                <option value="Mar del Plata" >Cariló</option>
                <option value="Mar del Plata" >Pinamar</option>
                <option value="Mar del Plata" >San Bernardo</option>
            </select>
        </div>
        <button id="btnOpen" class="menuPrincipal__controlOpen u-hiddeDesktop" aria-expanded="false" aria-labelledby="nav-label"><span class="mdi mdi-menu"></span></button>
        <div class="menuPrincipal__wrappItems" data-state="close" role="dialog">
            <button id="btnClose" class="menuPrincipal__controlClose u-hiddeDesktop"  aria-label="Close"><span class="mdi mdi-close"></span></button>
            <ul class="menuPrincipal__items">
                <li class="menuPrincipal__item">
                    <a href="./" class="menuPrincipal__link"><span class="mdi mdi-home"></span> Inicio</a>
                </li>
                <li class="menuPrincipal__item">
                    <a href="./mapa" class="menuPrincipal__link"><span class="mdi mdi-map"></span> Mapa de ofertas</a>
                </li>
                <li class="menuPrincipal__item">
                    <a href="/#faqs" class="menuPrincipal__link"><span class="mdi mdi-frequently-asked-questions"></span> Preguntas Frecuentes</a>
                </li>
                <li class="menuPrincipal__item">
                    <a href="./registro" class="menuPrincipal__link"><span class="mdi mdi-account-plus"></span> Registrarse</a>
                </li>
                <li class="menuPrincipal__item">
                    <a href="./login" class="menuPrincipal__link"><span class="mdi mdi-login"></span>Ingresar</a>
                </li>
            </ul>
        </div>
    </nav>
        `;
    }
}

window.customElements.define("navbar-primary", NavbarPrimary);