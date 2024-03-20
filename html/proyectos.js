var projects = [
    {
        "id": 0,
        "name": "Project A",
        "description": "This is a description of the Project A.",
        "department": "Desarrollo",
        "backgroundcolor": "rgb(150,200,135)",
        "backgroundimage": "default.jpg",
        "priority": 0,
        "status": 1
    },
    {
        "id": 1,
        "name": "Project C",
        "description": "This is a description of the Project A.",
        "department": "Marketing",
        "backgroundcolor": "rgb(219,130,140)",
        "backgroundimage": "default.jpg",
        "priority": 1,
        "status": 0
    },
    {
        "id": 2,
        "name": "Project B",
        "description": "This is a description of the Project B.",
        "department": "Diseño",
        "backgroundcolor": "rgb(150,200,190)",
        "backgroundimage": "default.jpg",
        "priority": 0,
        "status": 1
    }
];

/* >>>>>>>>>>>>>>>>>>>>>>
 * Añadir array a variable de sessionStorage *
 <<<<<<<<<<<<<<<<<<<<<<<<*/
var tempProjects = JSON.stringify(projects);
localStorage.setItem('projectsdb', tempProjects);