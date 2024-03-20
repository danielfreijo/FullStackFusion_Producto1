
/* >>>>>>>>>>>>>>>>>>>>>>
 * Recuperar datos de session *
 <<<<<<<<<<<<<<<<<<<<<<<<*/
var getDataStorageProjects = sessionStorage.getItem('projectsdb');
var projectsDb = JSON.parse(getDataStorageProjects);
console.log('MOdal projectsDB :>> ', projectsDB);

