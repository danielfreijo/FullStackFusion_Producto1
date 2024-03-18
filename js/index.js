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
  // Inicializa la aplicación con los proyectos cargados
  inicializarApp(projectsDb);
  // Obtiene el botón "Añadir elemento" por su ID
  var addCardButton = document.getElementById("addCardButton");

  // Agrega un listener de eventos al botón "Añadir elemento"
  addCardButton.addEventListener("click", function () {
    openModal();
    /*
    // Esta función se ejecutará cuando se haga clic en el botón "Añadir elemento"

    // Crea un nuevo elemento "div" para representar la tarjeta
    var newCard = document.createElement("div");

    // Establece la clase CSS del nuevo elemento como "card"
    newCard.className = "card";

    // Define el contenido HTML del nuevo elemento utilizando la propiedad innerHTML

    var numeroCaja = "caja" + contador; // Variable con el número de caja
    newCard.id = numeroCaja;
    newCard.innerHTML = `    
    <div class="card-title">Proyecto ${contador}</div>
    <div class="card-description">Descripción del proyecto con id ${numeroCaja}.</div>    
    <div class="iconFlag"><i class="fas fa-star"></i></div>
    `;
    contador++;
    // Obtiene el contenedor de tarjetas por su ID
    var cardList = document.getElementById("cajapadre");

    // Agrega el nuevo elemento "div" (tarjeta) como hijo del contenedor de tarjetas
    cardList.appendChild(newCard);
    // Tras un breve retraso, activar la clase 'show' para aplicar la transición
    setTimeout(function () {
      newCard.classList.add("show");
    }, 10);
    */
  });
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
    var newCard = document.createElement("div");
    newCard.className = "card";
    // var numeroCaja = "caja" + contador++;
    // le pongo el id
    newCard.id = project.id;
    // y el color de fondo
    newCard.style.backgroundColor = project.backgroundcolor;
    console.log(project.backgroundcolor);
    //Comprobar si es prioritario
    var colorPriority = checkPriorityColor(project.priority); // Llama a la función para obtener el color
    newCard.innerHTML = `    
          <div class="card-title" >${project.name}</div>
          <div class="card-description">${project.description} con id ${project.id}.</div>
          <div class="iconFlag"><i class="fas fa-flag" style="color: ${colorPriority}"></i></div>
      `;
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
        console.log(projectId);
        // como un stream en Java
        var projectIndex = projectsDb.findIndex(project => project.id === projectId);
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
  var isNameValid = projectName.validity.valid;
  var isDepartmentValid = department.validity.valid;
  var isDescriptionValid = description.validity.valid;

  // Comprobar si todos los datos son válidos
  if (isNameValid && isDepartmentValid && isDescriptionValid) {
    //TODO
    // Añadir datos al array de sessionStorage

    //TODO
    // Crear una nueva tarjeta

  } else {
    //TODO
    // Avisar al usuario que algún dato no es valido
  }
  // Aquí puedes realizar las acciones necesarias con los valores capturados
  console.log("Nombre del proyecto: " + projectName);
  console.log("Departamento: " + department);
  console.log("Descripción: " + description);


  // Limpiar los valores de los campos del formulario
  document.getElementById('name').value = '';
  document.getElementById('department').value = '';
  document.getElementById('description').value = '';
  // Cerrar el modal después de capturar los valores
  $('#exampleModal').modal('hide');
  // Por ejemplo, puedes enviar los datos al servidor utilizando AJAX o realizar alguna otra operación.
}
/* >>>>>>>>>>>>>>>>>>>>>>
 * CREAR NUEVA TARJETA PROYECTO *
 <<<<<<<<<<<<<<<<<<<<<<<<*/