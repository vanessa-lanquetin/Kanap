//Je crée un nouvel objet URLSearchParams qui va stocker la chaîne de requête de l'URL.
//La chaîne de requête est la partie se trouve après le "?"
const urlParams = new URLSearchParams(window.location.search);
//Je récupère la valeur de l'id dans la chaîne de requête de l'URL.
//Cette partie "|| ''" permet de retourner une chaine vide si la méthode "get" ne trouve pas l'id.
const id = urlParams.get("id") || "";
//Ici je récupère les éléments dont j'ai besoins avec leurs id et les affectent à des variables
//Le commentaire /** @type {HTMLElement}*/ est utilisé pour indiquer au compilateur que cette variable est de type HTMLElement.
const titre = /** @type {HTMLElement}*/ (document.getElementById("title"));
const price = /** @type {HTMLElement}*/ (document.getElementById("price"));
const description = /** @type {HTMLElement}*/ (
  document.getElementById("description")
);
const couleurs = /** @type {HTMLElement}*/ (document.getElementById("colors"));

//J'utilise  ici l'opérateur "[]" pour sélectionner le premier élément de la liste item_img etpour l'attribuer à la variable image.
//Cela permet de travailler avec un seul élément plutôt qu'avec tous les éléments qui ont la classe "item__img".
const [image] = document.getElementsByClassName("item__img");
function getData() {
  //Ici j'utilise la méthode "fetch" pour récupérer les données d'un produit à partir de l'URL avec l'ID du produit
  fetch(`http://localhost:3000/api/products/${id}`).then((res) =>
    //Je convertis les données en format JSON (objet javascript)
    res.json().then((data) => {
      //Je stockes les données dans une variable nommée "element"
      const element = data;
      // J'utilise les données pour remplir l'élément HTML qui affiche le nom du produit
      titre.innerText = element.name;
      // J'utilise les données pour remplir l'élément HTML qui affiche le prix du produit
      price.innerText = element.price;
      // J'utilise les données pour remplir l'élément HTML qui affiche la description du produit
      description.innerText = element.description;
      const title = document.getElementsByTagName("title");
      document.title=element.name;

      //Je fais une boucle pour ajouter les couleurs disponibles pour le produit en tant qu'options dans une liste déroulante
      for (let index = 0; index < element.colors.length; index++) {
        const colors = element.colors;
        const color = createElem("option");
        color.innerText = colors[index];
        color.value = colors[index];
        couleurs.appendChild(color);
      }

      // Je crée un élément image et j'ajoute l'URL de l'image et le texte alternatif
      const img = createElem("img");
      const imgUrl = element.imageUrl;
      img.setAttribute("src", imgUrl);
      const altTxt = element.altTxt;
      img.alt = altTxt;
      image.appendChild(img);
    })
  );
}

//J'utilise à nouveau cette fonction pour facilier la création d'éléments
function createElem(ele) {
  return document.createElement(ele);
}

//J'appelle la fonction getData
getData();

const getColorProductElement = () =>
  // Ici je récupère l'élément "colors", je l'assigne à getColorProductElement
  /**@type {HTMLInputElement}*/ (document.getElementById("colors"));
// Je rècupère la valeur de l'élément "colors"
// Utilisation de la notation "?" pour éviter une erreur si l'élément HTML n'existe pas
const getColorProduct = () => getColorProductElement()?.value; // "?" si getColorProductElement renvoie null alors ne vas pas rechercher .value

const getQuantityElement = () =>
  // Je récupère l'élément ayant l'id "quantity"
  /**@type {HTMLInputElement}*/ (document.getElementById("quantity"));
// Je récupère la valeur de l'élément ayant l'id "quantity" et je la convertie en nombre
// Utilisation de la notation "+" pour convertir la valeur en nombre
// Utilisation de la notation "?" pour éviter une erreur si l'élément HTML n'existe pas
let getQuantity = () => +getQuantityElement()?.value; //+ est un un raccourci pour transformer une valeur en nombre

// Je récupère le bouton d'ajout au panier ayant l'id "addToCart"
const addCart = document.getElementById("addToCart");
// @ts-ignore vs code pense que cart est chargé dans  des fichiers séparés
//Je crée d'une nouvelle instance de la classe Cart
const cart = new Cart();

//Ici j'écoute l'évenement change sur couleurs, pour que la quantité se remette à 0 quand la couleur change
// Lorsque la valeur de l'input est modifiée, la valeur de l'input ayant l'id "quantity" est remise à 0
couleurs.addEventListener("change", function () {
  getQuantityElement().value = "0";
});
// Si le bouton d'ajout au panier existe

if (addCart) {
  // Lorsque le bouton est cliqué, la fonction "addProduct" de l'objet cart est appelée avec les valeurs de couleur et de quantité
  addCart.addEventListener("click", function () {
    const color = getColorProduct();
    let quantity = getQuantity();
    cart.addProduct({ id, color, quantity });
  });
} else {
  //Si addCart n'existe pas, on affiche une erreur dans la console.
  console.error("Le bouton d'ajout de panier n'existe pas");
}
