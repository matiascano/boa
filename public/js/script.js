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

document.getElementById('registroForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar el envío normal del formulario

    const formData = new FormData(this);
    const data = new URLSearchParams(formData);

    fetch('/usuarios/create', {
        method: 'POST',
        body: data,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded' 
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            document.getElementById('mensaje').innerHTML = `<p>${data.error}</p>`;
        } else {
            document.getElementById('mensaje').innerHTML = '<p>Usuario creado correctamente. ¡Gracias por registrarte!</p>';
            this.reset(); // Limpiar el formulario
        }
    })
    .catch(error => {
        console.error('Error al registrar el usuario:', error);
        document.getElementById('mensaje').innerHTML = '<p>Ocurrió un error al registrar el usuario. Por favor, inténtalo de nuevo.</p>';
    });
});

