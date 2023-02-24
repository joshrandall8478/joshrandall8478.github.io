const menu = document.querySelector('#mobile-menu')
const menuLinks = document.querySelector('.navbar__menu')

menu.addEventListener('click', function() {
    menu.classList.toggle('is-active');
    menuLinks.classList.toggle('active');
})

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        return document.querySelector('.navbar').classList.add('hide')
    }
    return document.querySelector('.navbar').classList.remove('hide')
})