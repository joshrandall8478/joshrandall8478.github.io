const menu = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('.navbar__menu');
let projectItem = document.querySelector('.project__item');
let projectItemActive = document.querySelector('.project__item active');

projectItem.addEventListener('click', function (){
    projectItemActive.classList.remove('active');
    document.querySelector(this.id).classList.add('active');
    document.querySelector(this.id + ' preview').classList.add('active');
})

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

