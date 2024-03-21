
/* >>>>>>>>>>>>>>>>>>>>>>
 * Recuperar datos de session *
 <<<<<<<<<<<<<<<<<<<<<<<<*/
var getDataStorageProjects = localStorage.getItem('projectsdb');
var projectsDb = JSON.parse(getDataStorageProjects);
console.log('MOdal projectsDb :>> ', projectsDb);

/* >>>>>>>>>>>>>>>>>>>>>>
 * DRAG&DROP *
 <<<<<<<<<<<<<<<<<<<<<<<<*/
 function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  if(ev.target.classList.contains("comlumna-tareas")){
      ev.target.appendChild(document.getElementById(data));
  }

}