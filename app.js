const menu = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('.navbar__menu');

function showProject(project_id, preview_id){
    var projectPreview = document.querySelector('.project__preview.active');
    var projectItem = document.querySelector('.project__item.active');
    var proj_id = document.querySelector(project_id);
    var prev_id = document.querySelector(preview_id);
    projectPreview.classList.remove('active');
    projectItem.classList.remove('active');
    proj_id.classList.add('active');
    prev_id.classList.add('active');
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

