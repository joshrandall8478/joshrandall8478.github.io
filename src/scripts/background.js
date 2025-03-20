let folder = "/assets/backgrounds/gif/";

const limit = 81;
const format = "gif";

const mainRandom = Math.floor( Math.random() * limit ) + 1 ;
let image = folder + mainRandom + '.' + format;
{/* // let image = folder + 81 + '.gif' */}
document.getElementById("main-section").style.backgroundImage = "url('" + image + "')";

// choose a DIFFERENT background for the contact section.
// In the rare case that they are the same, this will ensure different backgrounds.
let contactRandom = Math.floor( Math.random() * limit ) + 1 ;
let randomsDifferent = false;
while(!randomsDifferent) {
    // Adding an or condition of limit <= 1 makes sure the loop does not crash the site
    if(mainRandom != contactRandom || limit <= 1){
        randomsDifferent = true;
    }
    else{
        console.log("Backgrounds are the same, shuffling again...");
        contactRandom = Math.floor( Math.random() * limit ) + 1 ;
    }
}
image = folder + contactRandom + '.' + format;
document.getElementById("contact").style.backgroundImage = "url('" + image + "')";