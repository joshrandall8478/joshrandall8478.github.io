


document.addEventListener('mouseover', (element)=>{
    // if the click is not on the dropdown button or inside the dropdown, close all dropdowns
    const isDropDownBtn = element.target.matches("[data-dropdown-button]")
    if (!isDropDownBtn && element.target.closest('[data-dropdown]') != null){
        return
    }
    
    // if the click is on the dropdown button, toggle the dropdown
    let currentDropdown;
    if (isDropDownBtn){
        currentDropdown = element.target.closest('[data-dropdown]')
        currentDropdown.classList.toggle('active')
    }

    // close all other dropdowns
    document.querySelectorAll('[data-dropdown].active').forEach((dropdown => {
        if(dropdown == currentDropdown) return
        dropdown.classList.remove('active')
    }))
})

