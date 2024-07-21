const menu = document.querySelector('#mobile-menu')
const menuLinks = document.querySelector('.navbar_menu')
const topbar = document.querySelector('#topbar');

topbar.classList.remove('blur');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        topbar.classList.add('blur');
        topbar.classList.remove('top-of-page');
    } else if (window.scrollY < 50){
        topbar.classList.remove('blur');
        topbar.classList.add('top-of-page');
    }
})