const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id") || '';
const titre = /** @type {HTMLElement}*/(document.getElementById("title"));
const price = /** @type {HTMLElement}*/(document.getElementById("price"));
const description = /** @type {HTMLElement}*/(document.getElementById("description"));
const couleurs = /** @type {HTMLElement}*/(document.getElementById("colors"));
const [image] = document.getElementsByClassName("item__img");
function getData() {
  fetch(`http://localhost:3000/api/products/${id}`).then((res) =>
    res.json().then((data) => {
      const element = data;
      titre.innerText = element.name;
      price.innerText = element.price;
      description.innerText = element.description;

      for (let index = 0; index < element.colors.length; index++) {
        const colors = element.colors;
        const color = createElem("option");
        color.innerText = colors[index];
        color.value = colors[index];
        couleurs.appendChild(color);
      }

      const img = createElem("img");
      const imgUrl = element.imageUrl;
      img.setAttribute("src", imgUrl);
      const altTxt = element.altTxt;
      img.alt = altTxt;
      image.appendChild(img);
    })
  );
}

function createElem(ele) {
  return document.createElement(ele);
}

getData();

const getColorProductElement = () => /**@type {HTMLInputElement}*/ (document.getElementById("colors"));
const getColorProduct = () => getColorProductElement()?.value; // "?" si getColorProductElement renvoie null alors ne vas pas rechercher .value
const getQuantityElement = () => /**@type {HTMLInputElement}*/ (document.getElementById("quantity"));
const getQuantity = () => +getQuantityElement()?.value;//+ est un un raccourci pour transformer une valeur en nombre
const addCart = document.getElementById("addToCart");
// @ts-ignore vs code pense que cart est chargé dans dans des fichiers séparés
const cart = new Cart();

if(addCart) {
  addCart.addEventListener("click", function () {
    const color = getColorProduct();
    const quantity = getQuantity();
    cart.addProduct({id, color, quantity})
  });
} else {
  console.error('Le bouton d\'ajout de panier n\'existe pas')
}
