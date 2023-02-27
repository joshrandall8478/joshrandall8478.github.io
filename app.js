const menu = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('.navbar__menu');
let projectPreviewActive = document.querySelector('.project__preview.active');
let projectItemActive = document.querySelector('.project__item.active');

function showProject(project_id){
    let preview_id = project_id+'preview';
    projectItemActive.classList.remove('active');
    projectPreviewActive.classList.remove('active');
    document.querySelector(project_id).classList.add('active');
    document.querySelector(preview_id).classList.add('active');
}



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

