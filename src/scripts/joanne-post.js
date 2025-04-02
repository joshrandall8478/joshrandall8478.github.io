// Select all elements with the class 'joanne__img'
const image = document.querySelector('.joanne__img');
const cover = document.querySelector('.cover');

// Array of image URLs to cycle through
const imageUrls = [
    '/assets/joanne/A170F83B-FCDC-467A-95C3-36612EB7FB19.jpeg',
    '/assets/joanne/Facetune_23-03-2025-09-17-41.jpeg',
    '/assets/joanne/IMG_0449.jpeg',
    '/assets/joanne/IMG_1076.jpeg',
    '/assets/joanne/IMG_1577.jpeg',
    '/assets/joanne/IMG_1988.jpeg',
    '/assets/joanne/IMG_4934.jpeg'
];

// Function to create a slideshow
function spawnImage(){
    image.classList.add('fade-in');
}
function startSlideshow() {
    let currentIndex = 0;


    setInterval(() => {
        image.classList.remove('fade-in');
        image.classList.add('fade-out');
        setTimeout(() => {
            image.style.backgroundImage = `url(${imageUrls[currentIndex]})`;
            image.classList.remove('fade-out');
            image.classList.add('fade-in');
        }, 1000); // Delay for 1 second before changing the background image
        currentIndex = (currentIndex + 1) % imageUrls.length; // Cycle through the images
    }, 5000); // Change image every 5 seconds
}

// Start the slideshow
spawnImage();
startSlideshow();