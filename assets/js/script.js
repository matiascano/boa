const btnOpen = document.querySelector('#btnOpen')
const btnClose = document.querySelector('#btnClose')
const menu = document.querySelector('.menuPrincipal__wrappItems')

function openMenu () {
    console.log('hola;')
    btnOpen.setAttribute('aria-expanded', 'true')
    menu.setAttribute('data-state', 'open'),
        btnClose.focus()
    }
    
    function closeMenu () {
        console.log('chau')
        btnOpen.setAttribute('aria-expanded', 'false')
        menu.setAttribute('data-state', 'close'),
        btnOpen.focus()
}

btnOpen.addEventListener('click', openMenu)
btnClose.addEventListener('click', closeMenu)