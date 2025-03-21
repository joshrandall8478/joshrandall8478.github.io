const hr = document.querySelectorAll('hr');
// Create the observer, same as before:
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
    if (entry.isIntersecting) {
        hr.forEach((element) => {
            element.classList.add('active');
        })
        return;
    }
    });
});

observer.observe(document.querySelector('hr'));