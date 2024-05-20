const btnOpen = document.querySelector('#btnOpen')
const btnClose = document.querySelector('#btnClose')
const link = document.querySelectorAll('.menuPrincipal__link')
const menu = document.querySelector('.menuPrincipal__wrappItems')

function openMenu () {
    btnOpen.setAttribute('aria-expanded', 'true')
    menu.setAttribute('data-state', 'open'),
        btnClose.focus()
    }
    
    function closeMenu () {
        btnOpen.setAttribute('aria-expanded', 'false')
        menu.setAttribute('data-state', 'close'),
        btnOpen.focus()
}

btnOpen.addEventListener('click', openMenu)
btnClose.addEventListener('click', closeMenu)
link.addEventListener('click', closeMenu)
