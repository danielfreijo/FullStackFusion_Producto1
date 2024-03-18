document.write('<script src="proyectos.js"></script>');
/* >>>>>>>>>>>>>>>>>>>>>>
 * Recuperar datos de session *
 <<<<<<<<<<<<<<<<<<<<<<<<*/
var getDataStorageProjects = sessionStorage.getItem('projectsdb');
var projectsDb = JSON.parse(getDataStorageProjects);
console.log(projectsDb);

var contador = 1;
document.addEventListener("DOMContentLoaded", function () {
  // Espera a que el documento HTML esté completamente cargado antes de ejecutar el código dentro de la función.

  // Obtiene el botón "Añadir elemento" por su ID
  var addCardButton = document.getElementById("addCardButton");

  // Agrega un listener de eventos al botón "Añadir elemento"
  addCardButton.addEventListener("click", function () {
    openModal();
  });
  // Inicializa la aplicación con los proyectos cargados
  inicializarApp(projectsDb);
});

/* >>>>>>>>>>>>>>>>>>>>>>
 * CARGAR DATOS DE ORIGEN *
 <<<<<<<<<<<<<<<<<<<<<<<<*/
function inicializarApp(proDb) {
  console.log(proDb);
  // Acciones para iniciar la aplicación
  // Crear las tarjetas de proyecto con los datos cargados
  var cardList = document.getElementById("cajapadre");
  proDb.forEach(function (project) {
    //Crear nueva tarjeta
    crearNuevaTarjetaProyecto(project);
  });
}

/* >>>>>>>>>>>>>>>>>>>>>>
 * FUNCION PARA CHECKEAR LA PRIORIDAD *
 <<<<<<<<<<<<<<<<<<<<<<<<*/
function checkPriorityColor(priority) {
  console.log('priority ' + priority);
  if (priority === 1) {
    console.log('cambia a rojo');
    return 'red';

  } else {
    console.log('cambia a amarillo');
    return 'rgb(147, 147, 103)';
  }
}

/* >>>>>>>>>>>>>>>>>>>>>>
 * CARGAR Y MOSTRAR EL MODAL *
 <<<<<<<<<<<<<<<<<<<<<<<<*/
function openModal() {
  // Crear una instancia del objeto XMLHttpRequest
  var xhr = new XMLHttpRequest();

  // Configurar la solicitud
  xhr.open('GET', 'modal_template.html', true);

  // Configurar el controlador de eventos para la carga exitosa de la solicitud
  xhr.onload = function () {
    // Verificar si la solicitud fue exitosa
    if (xhr.status >= 200 && xhr.status < 400) {
      // Obtener el contenido de la respuesta
      var modalContent = xhr.responseText;

      // Insertar el contenido del modal en el cuerpo del documento
      document.body.insertAdjacentHTML('beforeend', modalContent);

      validacionSelectDepartment(document.getElementById('department')); 

      // Mostrar el modal (si estás utilizando alguna biblioteca o framework para modales)
      $('#exampleModal').modal('show');

      // Asignar el evento de clic al botón "Añadir proyecto" dentro del modal
      document.querySelector('#exampleModal button.btn-primary').addEventListener('click', captureFormValues);
    } else {
      // Manejar errores si la solicitud falla
      console.error('Error al cargar la plantilla: ' + xhr.status);
    }
  };

  // Configurar el controlador de eventos para errores de red
  xhr.onerror = function () {
    console.error('Error de red al cargar la plantilla');
  };

  // Enviar la solicitud al servidor
  xhr.send();
}

// Asignar el evento de clic al botón para abrir el modal
// document.getElementById('openModalButton').addEventListener('click', openModal);

/* >>>>>>>>>>>>>>>>>>>>>>
 * CAPTURAR VALORES DEL MODAL PROYECTO *
 <<<<<<<<<<<<<<<<<<<<<<<<*/
// Función para capturar los valores del formulario
function captureFormValues(event) {
  console.log('Entra en capturar');
  //primero validar los datos
  // Evitar que el formulario se envíe automáticamente
  event.preventDefault();

  // Obtener los valores de los campos del formulario
  var projectName = document.getElementById('name').value;
  var department = document.getElementById('department').value;
  var description = document.getElementById('description').value;

  // Verificar el estado de validación de cada campo
  var isNameValid = document.getElementById('name').validity.valid;
  var isDescriptionValid = document.getElementById('description').validity.valid;
  // Con el select department parece que no funciona
  var isDepartmentValid = document.getElementById('department').validity.valid;
  var selectedDepartment = document.getElementById('department').value;
  validacionSelectDepartment(document.getElementById('department'));
  // Verificar si el departamento seleccionado es válido
  if (selectedDepartment === "Departamento") {
    // Marcar como no válido si el valor seleccionado es el predeterminado
    console.log('invalido :>> ', 'invalido');
    isDepartmentValid = false;
  } else {
    console.log('invalido :>> ', 'valido');
    isDepartmentValid = true;
  }
  // Comprobar si todos los datos son válidos
  if (isNameValid && isDepartmentValid && isDescriptionValid) {
    //TODO
    // Añadir datos al array de sessionStorage
    console.log("Nombre del proyecto: " + projectName);
    console.log("Departamento: " + department);
    console.log("Descripción: " + description);


    let newProject = {
      id: projectsDb.length + 1,
      name: projectName,
      description: description,
      department: department,
      backgroundColor: "rgb(150,200,135)",
      priority: 0,
      status: 1
    }
    console.log('newProject :>> ', newProject);
    projectsDb.push(newProject);

    //TODO
    // Crear una nueva tarjeta
    crearNuevaTarjetaProyecto(newProject);
    //TODO
    //Cerrar el modal
    // Limpiar los valores de los campos del formulario
    document.getElementById('name').value = '';
    document.getElementById('department').selectedIndex = 0;
    document.getElementById('description').value = '';
    // Cerrar el modal después de capturar los valores
    $('#exampleModal').modal('hide');
  } else {
    //TODO
    // Avisar al usuario que algún dato no es valido

  }

}
/* >>>>>>>>>>>>>>>>>>>>>>
 * CREAR NUEVA TARJETA PROYECTO *
 <<<<<<<<<<<<<<<<<<<<<<<<*/
function crearNuevaTarjetaProyecto(newProject) {
  let cardList = document.getElementById("cajapadre");
  var newCard = document.createElement("div");
  newCard.className = "card";

  // var numeroCaja = "caja" + contador++;
  // le pongo el id
  newCard.id = newProject.id;
  // y el color de fondo
  newCard.style.backgroundColor = newProject.backgroundcolor;
  console.log(newProject.backgroundcolor);
  //Comprobar si es prioritario
  var colorPriority = checkPriorityColor(newProject.priority); // Llama a la función para obtener el color
  newCard.innerHTML = `    
  <div class="card-title" >${newProject.name}</div>
  <div class="card-description">${newProject.description} con id ${newProject.id}.</div>
  <div class="iconFlag"><i class="fas fa-flag"></i></div>
  `;
  newCard.querySelector('.iconFlag .fas').style.color = colorPriority; // Aplica el color al ícono

  cardList.appendChild(newCard);
  // Tras un breve retraso, activar la clase 'show' para aplicar la transición
  setTimeout(function () {
    newCard.classList.add("show");
  }, 10);

  // Agregar evento de clic a los íconos favoritos de proyectos precargados
  // Busca el ícono favorito dentro de un nuevo proyecto
  var iconFlag = newCard.querySelector(".iconFlag .fas");
  if (iconFlag) {// Verifica si se encontró un ícono favorito
    iconFlag.addEventListener("click", function (event) {// Agrega un evento de clic al ícono favorito encontrado
      // Detiene la propagación del evento para evitar que se propague a elementos superiores
      event.stopPropagation();
      // Objtengo el id del div padre en su nivel
      var projectId = parseInt(event.target.parentElement.parentElement.id);
      console.log('projectId :>> ', projectId);
      // como un stream en Java
      var projectIndex = projectsDb.findIndex(newProject => newProject.id === projectId);
      console.log('projectIndex :>> ', projectIndex);
      console.log('newProject.id :>> ', newProject.id);
      if (projectIndex !== -1) {// si existe
        // aplico condicional ternario
        projectsDb[projectIndex].priority = (projectsDb[projectIndex].priority === 0) ? 1 : 0;
        // actualizo la sessionStorage
        sessionStorage.setItem('projectsdb', JSON.stringify(projectsDb));
        // checkeo y cambio el color
        event.target.style.color = checkPriorityColor(projectsDb[projectIndex].priority);
      }
    });
  }
  newCard.querySelector('.iconFlag .fas').addEventListener('mouseover', () => {
    // Change the button's background color
    newCard.querySelector('.iconFlag .fas').style.color = 'rgb(8 112 245)';
  });
  newCard.querySelector('.iconFlag .fas').addEventListener('mouseout', () => {
    // Change the button's background color
    newCard.querySelector('.iconFlag .fas').style.color = checkPriorityColor(newProject.priority);
  });

}
/* >>>>>>>>>>>>>>>>>>>>>>
 * COMPORTAMIENTO Y VALIDACIÓN DEL SELECT DEPARTMENT *
 <<<<<<<<<<<<<<<<<<<<<<<<*/
 function validacionSelectDepartment(selectDepartMent){
 // Obtener el valor del select
//  var selectedDepartment = selectDepartMent.value;

 // Verificar si el departamento seleccionado es válido
 if (selectDepartMent.value === "Departamento") {
   // Marcar como no válido si el valor seleccionado es el predeterminado
   console.log('invalido :>> ', 'invalido');  
   // Agregar una clase al elemento para aplicar estilos específicos
   selectDepartMent.classList.add('border-red');
 } else {
   console.log('invalido :>> ', 'valido');
   // Agregar una clase al elemento para aplicar estilos específicos
   selectDepartMent.classList.remove('border-red');
 }
 // Agregar un event listener para el evento 'change'
 selectDepartMent.addEventListener('change', function (event) {
   // Aquí puedes colocar el código que deseas ejecutar cuando cambia el valor seleccionado
   validacionSelectDepartment(selectDepartMent);
 });
 }