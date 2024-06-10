document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('navbar-primary');

    if (navbar) {
        const shadowRoot = navbar.shadowRoot;
        const btnOpen = shadowRoot.querySelector('#btnOpen');
        const btnClose = shadowRoot.querySelector('#btnClose');
        const links = shadowRoot.querySelectorAll('.menuPrincipal__link');
        const menu = shadowRoot.querySelector('.menuPrincipal__wrappItems');

        if (btnOpen && btnClose && menu) {
            function openMenu() {
                btnOpen.setAttribute('aria-expanded', 'true');
                menu.setAttribute('data-state', 'open');
                btnClose.focus();
            }

            function closeMenu() {
                btnOpen.setAttribute('aria-expanded', 'false');
                menu.setAttribute('data-state', 'close');
            }

            btnOpen.addEventListener('click', openMenu);
            btnClose.addEventListener('click', closeMenu);
            links.forEach(link => link.addEventListener('click', closeMenu));
        } else {
            console.error('Uno o más elementos no fueron encontrados en el shadow DOM');
        }
    } else {
        console.error('El componente navbar-primary no fue encontrado en el DOM');
    }
});
