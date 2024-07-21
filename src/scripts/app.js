const menu = document.querySelector('#mobile-menu')
const menuLinks = document.querySelector('.navbar_menu')
const topbar = document.querySelector('#topbar');

menu.addEventListener('click', function() {
    menu.classList.toggle('is-active');
    menuLinks.classList.toggle('active');
    topbar.classList.toggle('blur');
    menuLinks.classList.toggle('blur');
    if (menu.classList.contains('is-active')) {
        return disableScroll();
    }
        return enableScroll();
})

// window.addEventListener('scroll', () => {
//     if (window.scrollY > 50) {
//         return document.querySelector('.navbar').classList.add('hide')
//     }
//     return document.querySelector('.navbar').classList.remove('hide')
// })

// Sam's code
// window.addEventListener('click', (element)=> {
//     if (element.target === "navbar_toggle") { 
//         disableScroll();
//     } else if (element.target === "navbar_toggle.is-active") {
//         enableScroll();
//     }  
// })



function disableScroll() {
    // Get the current page scroll position
    let scrollTop =
    window.pageYOffset || document.documentElement.scrollTop;
    let scrollLeft =
    window.pageXOffset || document.documentElement.scrollLeft;
        // if any scroll is attempted,
        // set this to the previous value
    window.onscroll = ()=> {
        window.scrollTo(scrollLeft, scrollTop);
    };
}


function enableScroll() {
    window.onscroll = function() {};
}