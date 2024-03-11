document.addEventListener('DOMContentLoaded', function () {
  // Espera a que el documento HTML esté completamente cargado antes de ejecutar el código dentro de la función.

  // Obtiene el botón "Añadir elemento" por su ID
  var addCardButton = document.getElementById('addCardButton');

  // Agrega un listener de eventos al botón "Añadir elemento"
  addCardButton.addEventListener('click', function () {
    // Esta función se ejecutará cuando se haga clic en el botón "Añadir elemento"

    // Crea un nuevo elemento "div" para representar la tarjeta
    var newCard = document.createElement('div');

    // Establece la clase CSS del nuevo elemento como "card"
    newCard.className = 'col-md-3 col-xl-4';

    // Define el contenido HTML del nuevo elemento utilizando la propiedad innerHTML
    newCard.innerHTML = `
    <div  class="p-4 text-center shadow-lg m-5 rounded-5 px-5 mx-0 mx-sm-2 px-sm-4 py-sm-0 my-sm-1" style="background: linear-gradient(171deg, var(--bs-pink) 0%, var(--bs-indigo) 100%), var(--bs-purple);width: 178px;margin: 10px;margin-left: 39px;margin-right: 40px;padding: 0px;padding-right: 15px;padding-left: 14px;"><img class="pt-2 w-50" src="swiftui.png" />
    <h3 class="text-white text-center pt-2">Title</h3>
    <p class="fw-bold pt-1 text-white p-0 m-0">Subtitle</p>
    <p class="fw-light text-white m-0">Description</p>
    <hr class="text-white my-sm-2" /><img class="py-sm-0 my-sm-2 mx-sm-3 px-sm-0" src="swiftui.png" style="width: 10%;" />
</div>
      `;

    // Obtiene el contenedor de tarjetas por su ID
    var cardList = document.getElementById('cardList');

    // Agrega el nuevo elemento "div" (tarjeta) como hijo del contenedor de tarjetas
    cardList.appendChild(newCard);
  });
});
