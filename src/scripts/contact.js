const arr = ["Get in contact.", "Have inquiries?", "Want to work together?", "Need help with something?", "Want to get in touch?", "Business idea?", "Project idea?"];
const random = Math.floor( Math.random() * arr.length );
document.getElementById("contact").getElementsByTagName("h2")[0].innerHTML = arr[random];