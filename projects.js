// TODO: Make this program correctly interface with projects.json.
// !ISSUE: data is undefined
// Load projects from json file into data constant
// const data = fetch('projects.json');

// var data = projects;

// Load projects from data constant into div
const projectsList = document.getElementById('projects-list');
// Loop through projects and add each project to div
// console.log(data.projects);
var listHTML = '';
// for (let i = 0; i < data.length; i++) {
//     const project = data.projects[i];
//     console.log(project.name);
//     // add project name as a button to div with id projects-list
//     const button = document.createElement('button');
//     button.innerHTML = project.name;
//     button.classList.add('project-btn');
//     button.setAttribute('onclick', 'showProject(' + i + ')');
//     listHTML += button.outerHTML;
//     console.log("List HTML: " + listHTML);
// }
let i = 0;
for(let x in data.projects) {
    const project = data.projects[i];
    console.log(project.name);
    // add project name as a button to div with id projects-list
    const button = document.createElement('button');
    button.innerHTML = project.name;
    button.classList.add('project-btn');
    button.setAttribute('onclick', 'showProject(' + x + ')');
    listHTML += button.outerHTML;
    console.log("List HTML: " + listHTML);
    i++;
}
projectsList.innerHTML = listHTML;

function showProject(index) {
    // console.log(data[index]);
    // const project = data[index];
    // const projectDiv = document.getElementById('project');
    // projectDiv.innerHTML = `
    //     <h2>${project.name}</h2>
    //     <p>${project.description}</p>
    //     <p>${project.technologies}</p>
    //     <a href="${project.url}">View Project</a>
    // `;
}