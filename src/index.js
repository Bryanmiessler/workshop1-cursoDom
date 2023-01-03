/**
 * This file is just a silly example to show everything working in the browser.
 * When you're ready to start on your site, clear the file. Happy hacking!
 **/
const url = 'https://platzi-avo.vercel.app/api/avo';
const appNode = document.querySelector('#app');
appNode.className = 'mt-10 grid grid-cols-2 gap2'

const formatPrice = (price) => {
  const newFormat = new window.Intl.NumberFormat(
    "es-CO",{
      style: "currency",
      currency : "COP"
    }
  ).format(price);

  return newFormat;

}

// web api
// conectamos al servidor
window.fetch(url)
// procesamos la respuesta y la convertimos en json
.then((respuesta) => respuesta.json())
//json -> data -> render info en navegador
.then((data) => {
  console.log(data);
  const todosLosItems = [];
  data.data.forEach(element => {
      //crear imagen
      const img = document.createElement('img');
      img.setAttribute('src','https://platzi-avo.vercel.app/'+ element.image);
      img.className =("h-16 w-16 md:h-24 md:w-24 rounded-full mx-auto md:mx-0 md:mr-6");
      //crear titulo
      const title = document.createElement('h2');
      title.textContent = element.name;
      title.classList.add('text-lg');
      //crear precio
      const price = document.createElement('div');
      price.textContent = formatPrice(element.price);
      price.classList.add('text-gray-600');

      //creo contenedor titulo y precio
      const priceAndTitle = document.createElement("div")
      priceAndTitle.className = "text-center md:text-left";
      priceAndTitle.appendChild(title);
      priceAndTitle.appendChild(price);

      //metemos todo dentro de un card
      const card = document.createElement("div");
      card.className = "md:flex bg-white rounded-lg p-6 hover:bg-gray-300";
      card.append(img, priceAndTitle);

      //metemos todo dentro del container principal
      const container = document.createElement("div");
      container.appendChild(card);

      todosLosItems.push(container);
  });

  appNode.append(...todosLosItems);

})
