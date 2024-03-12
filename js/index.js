document.write('<script src="proyectos.js"></script>');
var contador = 1
document.addEventListener('DOMContentLoaded', function () {
  // Espera a que el documento HTML esté completamente cargado antes de ejecutar el código dentro de la función.
  // Inicializa la aplicación con los proyectos cargados
  inicializarApp(proyectos);
  // Obtiene el botón "Añadir elemento" por su ID
  var addCardButton = document.getElementById('addCardButton');

  // Agrega un listener de eventos al botón "Añadir elemento"
  addCardButton.addEventListener('click', function () {
    // Esta función se ejecutará cuando se haga clic en el botón "Añadir elemento"

    // Crea un nuevo elemento "div" para representar la tarjeta
    var newCard = document.createElement('div');

    // Establece la clase CSS del nuevo elemento como "card"
    newCard.className = 'card';

    // Define el contenido HTML del nuevo elemento utilizando la propiedad innerHTML

    var numeroCaja = "caja" + contador; // Variable con el número de caja
    newCard.id = numeroCaja;
    newCard.innerHTML = `    
    <div class="card-title">Proyecto ${contador}</div>
    <div class="card-description">Descripción del proyecto con id ${numeroCaja}.</div>    
    <div class="iconFav"><i class="fas fa-star"></i></div>
    `;
    contador++;
    // Obtiene el contenedor de tarjetas por su ID
    var cardList = document.getElementById('cajapadre');

    // Agrega el nuevo elemento "div" (tarjeta) como hijo del contenedor de tarjetas
    cardList.appendChild(newCard);
    // Tras un breve retraso, activar la clase 'show' para aplicar la transición
    setTimeout(function () {
      newCard.classList.add('show');
    }, 10);
  });
});

function inicializarApp(proyectos) {
  // Aquí puedes realizar cualquier inicialización necesaria de tu aplicación
  // Por ejemplo, crear las tarjetas de proyecto con los datos cargados
  var cardList = document.getElementById('cajapadre');
  proyectos.forEach(function (proyecto) {
    var newCard = document.createElement('div');
    newCard.className = 'card';
    var numeroCaja = "caja" + contador++;
    newCard.id = numeroCaja;
    newCard.innerHTML = `    
          <div class="card-title">${proyecto.nombre}</div>
          <div class="card-description">${proyecto.descripcion} con id ${numeroCaja}.</div>
          <div class="iconFav"><i class="fas fa-star" style="color: red"></i></div>
      `;
    cardList.appendChild(newCard);
    // Tras un breve retraso, activar la clase 'show' para aplicar la transición
    setTimeout(function () {
      newCard.classList.add('show');
    }, 10);
  });
}
