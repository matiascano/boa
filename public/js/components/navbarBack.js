class NavbarBack extends HTMLElement {
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
            <style>${NavbarBack.styles}</style>
            <nav class="menuPrincipal">
        <a href="#" class="menuPrincipal__back u-hiddeDesktop"><i class="fa fa-chevron-left" aria-hidden="true"></i></a>
        <div class="menuPrincipal__leftWrapper">
            <h1 class="menuPrincipal__logo gelatina"><a class="menuPrincipal__logoLink" href="/">BOA</a></h1>
        </div>
        <button id="btnOpen" class="menuPrincipal__controlOpen u-hiddeDesktop" aria-expanded="false" aria-labelledby="nav-label"><span class="mdi mdi-menu"></span></button>
        <div class="menuPrincipal__wrappItems" data-state="close" role="dialog">
            <button id="btnClose" class="menuPrincipal__controlClose u-hiddeDesktop"  aria-label="Close"><span class="mdi mdi-close"></span></button>
            <ul class="menuPrincipal__items">
                <li class="menuPrincipal__item">
                    <a href="/back" class="menuPrincipal__link"><span class="mdi mdi-store-plus"></span> Agregar comercio</a>
                </li>
                <li class="menuPrincipal__item">
                    <a href="/" class="menuPrincipal__link"><span class="mdi mdi-exit-run"></span> Salir</a>
                </li>
                <li class="menuPrincipal__item">
                    <span class="menuPrincipal__link"><span class="mdi mdi-account"></span> Matíass Cano</span>
                </li>
            </ul>
        </div>
    </nav>
        `;
    }
}

window.customElements.define("navbar-back", NavbarBack);