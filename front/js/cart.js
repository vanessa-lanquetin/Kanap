// @ts-ignore : cette ligne de code permet à l'éditeur de code de'y ignorer les erreurs de type qui pourraient survenir pour la variable "cart",
// Car il pense que celle-ci est chargée dans des fichiers séparés.

//Ici je crée une nouvelle instance de la classe Cart, qui est utilisée pour stocker les produits ajoutés au panier.
const cart = new Cart();

//J'utilise fonction pour récupérer les informations d'un produit spécifique à partir de l'API en utilisant l'ID du produit.
function getProductFromAPI(id) {
  return fetch(`http://localhost:3000/api/products/${id}`).then((res) =>
    res.json()
  );
}

//Ici j'utilise une fonction asynchrone, qui permet d'afficher le contenu du panier
async function updateDisplayCart() {
  const elements = [];
  //J'initalise les variables
  let totalPanierQuantity = 0;
  let totalPanier = 0;

  // Je Vérifie si le panier est vide
  if (cart.cart.length == 0) {
    // Je crée un élément de div pour le message de panier vide
    let cartItem = document.createElement("div");
    // Je crée un élément de paragraphe pour le contenu du message
    let cartFill = document.createElement("p");
    // J'ajoute le message "Votre panier est vide" à l'élément de paragraphe
    cartFill.innerText = "Votre panier est vide";
    // J'ajoute l'élément de paragraphe à l'élément de div
    cartItem.appendChild(cartFill);
    // Je modifie la taille de police de l'élément de paragraphe à 20px
    cartItem.style.fontSize = "20px";
    // J'obtient le premier élément h1 de la page
    let h1 = document.getElementsByTagName("h1");
    // J'ajoute l'élément de div à l'élément h1
    h1[0].appendChild(cartItem);
  }

  //Je fais une boucle pour chaque produit dans le panier
  for (let i = 0; i < cart.cart.length; i++) {
    // Je récupère le produit actuel dans le panier
    const productInCart = cart.cart[i];
    // J'obtient les détails du produit à partir de l'API
    const productInAPI = await getProductFromAPI(productInCart.id);
    // Je crée un élément pour afficher les détails du produit
    const element = createProductElem(
      productInAPI,
      productInCart.color,
      productInCart.quantity
    );
    // Ajoute l'élément au tableau d'éléments
    elements.push(element);

    //Ici je récupère le prix et la quantité pour obtenir un total article
    const totalArticle = productInAPI.price * productInCart.quantity;
    //Je mets à jour la quantité de mon panier
    totalPanierQuantity += productInCart.quantity;
    //Je mets à jour le montant de mon panier
    totalPanier += totalArticle;
  }
  console.log(totalPanier, totalPanierQuantity);
  // Je récupère l'élément HTML pour afficher le nombre total d'articles dans le panier
  const totalQuantity = document.getElementById("totalQuantity");
  // Si l'élément existe, met à jour le contenu avec la quantité totale de produits dans le panier
  if (totalQuantity) {
    totalQuantity.innerText = totalPanierQuantity.toString();
  }
  // Je récupère l'élément HTML pour afficher le prix total dans le panier
  const totalPrice = document.getElementById("totalPrice");
  // Si l'élément existe, met à jour le contenu avec le prix total des produits dans le panier
  if (totalPrice) {
    totalPrice.innerText = totalPanier.toString();
  }
  // Je récupère l'élément HTML pour afficher les articles dans le panier
  const cart__items = document.getElementById("cart__items");
  // Si l'élément existe, met à jour le contenu en ajoutant les éléments pour chaque produit dans le panier
  if (cart__items) {
    cart__items.innerText = "";
    //Pour chaque éléments
    elements.forEach((element) => {
      //Ajout de l'élément dans le panier
      cart__items.appendChild(element);
    });
  }
}
// Appelle la fonction pour mettre à jour l'affichage initial du panier
updateDisplayCart();

// Définit une fonction pour supprimer un article du panier
function deleteFromCart(id, color) {
  // Appelle la méthode pour supprimer un article du panier stocké dans le LocalStorage
  cart.deleteItem(id, color);
  // Appelle la fonction pour mettre à jour l'affichage du panier
  updateDisplayCart();
}
// Définit une fonction pour changer la quantité d'un article dans le panier
function changeQuantity(id, color, quantity) {
  console.log(id, color, +quantity);
  // Appelle la méthode pour changer la quantité d'un article dans le panier stocké dans le LocalStorage
  cart.editProductQuantity(id, color, +quantity);
  // Appelle la fonction pour mettre à jour l'affichage du panier
  updateDisplayCart();
}
// L'object produit est composé de :
/**
 *
 * @param {{
 *   "colors": string[],
 *   "_id": string
 *   "name": string
 *   "price": number
 *   "imageUrl": string
 *   "description": string
 *   "altTxt": string
 *   }} product
 * @param {string} color
 * @param {number} quantity
 * @returns {HTMLElement}
 */

//Fonction qui permet de créer facilement un élément sur le dom
function createProductElem(product, color, quantity) {
  const article = createElement(
    "article",
    "cart__item",
    [
      ["data-id", product._id],
      ["data-color", color],
    ],
    createElement(
      "div",
      "cart__item__img",
      [],
      createElement("img", "", [
        ["src", product.imageUrl],
        ["alt", product.altTxt],
      ])
    ),
    createElement(
      "div",
      "cart__item__content",
      [],
      createElement(
        "div",
        "cart__item__content__description",
        [],
        createElement("h2", "", [], product.name),
        createElement("p", "", [], color),
        createElement("p", "", [], product.price.toString() + "€")
      ),
      createElement(
        "div",
        "cart__item__content__settings",
        [],
        createElement(
          "div",
          "cart__item__content__settings__quantity",
          [],
          createElement("p", "", [], `Qté :`),
          createElement(
            "input",
            "itemQuantity",
            [
              ["type", "number"],
              ["name", "itemQuantity"],
              ["min", "1"],
              ["max", "100"],
              ["value", quantity.toString()],
              [
                "onchange",
                (ev) => changeQuantity(product._id, color, ev.target.value),
              ],
            ],
            ``
          )
        ),
        createElement(
          "div",
          "cart__item__content__settings__delete",
          [["onclick", () => deleteFromCart(product._id, color)]],
          createElement("p", "deleteItem", [], "Supprimer")
        )
      )
    )
  );
  return article;
}
//Ajout de la gestion de l'objet contact pour l'envoi au serveur

/**
 *
 * @param {string} type
 * @param {string} classNames
 * @param {[string, any][]} attributes
 * @param {(string| HTMLElement)[]} contents Tous les parametres qui suivent sont regroupés dans ce tableau grace au ...
 */
function createElement(type, classNames = "", attributes = [], ...contents) {
// Je crée un nouvel élément en spécifiant le type
const element = document.createElement(type);
// Si des classNames sont fournies, ajoute ces classes à l'élément
if (classNames) {
element.classList.add(classNames);
}
// Pour chaque attribut fourni, ajoute l'attribut à l'élément
attributes.forEach((attribute) => {
const key = attribute[0];
const value = attribute[1];
// Si la valeur de l'attribut est une fonction, je l'ajoute en tant que propriété de l'élément
if (typeof value === "function") { //alt avec sa valeur pour une image
element[key] = value;
} else {
// Sinon, l'ajoute en tant qu'attribut de l'élément
element.setAttribute(key, value);
}
});

  contents.forEach((content) => {
    if (typeof content === "string") {
      element.innerText = content;
    } else {
      element.appendChild(content);
    }
  });
  return element;
}

const testHasNotNumber = (value) => {
  return /^[a-zA-ZÀ-ž]+$/.test(value);
};
const testIsFilled = (value) => {
  return value ? true : false;
};
const testIsEmail = (value) => {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    value
  );
};

//Fonction pour récupérer les valeurs des champs du formulaire

/**
 * Je configure mes inputs pour tester les erreurs
 */
const inputs = [
  {
    error: true,
    // Pour ca il me faut un selecteur pour recuperer l'input
    selector: ".cart__order__form input[name='firstName']",
    // Il faut que j'écoute sur un evenement. En l'occurrence a chaque fois que j'appuie sur une touche
    event: "input",
    // Je liste les erreurs a tester
    field: "firstName",
    value: /** @type {any | null} */ (""),
    /* contact.firstName = document.querySelector(".cart__order__form input[name='firstName']").value; */
    errors: [
      // chaque error doit avoir un test et un message d'erreur en cas d'echec de ce meme test
      {
        test: testHasNotNumber,
        errorMsg: "Le prénom ne doit pas contenir de chiffres.",
      },
      // chaque error doit avoir un test et un message d'erreur en cas d'echec de ce meme test
      { test: testIsFilled, errorMsg: "Le champs ne doit pas être vide" },
    ],
  },
  {
    // Je fais la meme chose mais pour lastname
    error: true,
    selector: ".cart__order__form input[name='lastName']",
    event: "input",
    field: "lastName",
    value: /** @type {any | null} */ (""),
    errors: [
      {
        test: testHasNotNumber,
        errorMsg: "Le nom ne doit pas contenir de chiffres.",
      },
      { test: testIsFilled, errorMsg: "Le champs ne doit pas être vide" },
    ],
  },
  {
    // Je fais la meme chose mais pour address
    error: true,
    selector: ".cart__order__form input[name='address']",
    event: "input",
    field: "address",
    value: /** @type {any | null} */ (""),
    errors: [
      { test: testIsFilled, errorMsg: "Le champs ne doit pas être vide" },
    ],
  },
  {
    // Je fais la meme chose mais pour lastname
    error: true,
    selector: ".cart__order__form input[name='city']",
    event: "input",
    field: "city",
    value: /** @type {any | null} */ (""),
    errors: [
      { test: testIsFilled, errorMsg: "Le champs ne doit pas être vide" },
    ],
  },
  {
    // Je fais la meme chose mais pour email mais en testant que ca soit un email cette fois
    error: true,
    selector: ".cart__order__form input[name='email']",
    event: "input",
    field: "email",
    value: /** @type {any | null} */ (""),
    errors: [
      { test: testIsEmail, errorMsg: "L'email n'est pas valide" },
      { test: testIsFilled, errorMsg: "Le champs ne doit pas être vide" },
    ],
  },
];

/**
 *
 * @param {*} input
 * @param {HTMLInputElement} target
 */
function validInput(input, target) {
  // Je récupere la valeur de l'input
  const value = target.value;
  // Je récupere l'emplacement du message d'erreur en remontant sur le parent puis en redescendant sur le paragraphe
  const errorHtml = target?.parentElement?.querySelector("p");
  // J'initialise l'erreur
  let error = "";
  // Pour chaque erreur
  input.errors.forEach((confError) => {
    // je teste si la valeur est valide suivant le test qui a été configuré
    const isGood = confError?.test(value);
    // si il n'est pas valide alors je renseigne l'erreur à afficher
    if (!isGood) error = confError?.errorMsg;
  });

  // J'affiche l'erreur dans le html.
  // Si il n'ya pas eu d'erreur lors du foreach au dessus la varriable error est toujours vide.
  // Donc rien ne s'affiche
  if (errorHtml) errorHtml.innerText = error;
  if (error) input.error = true;
  else input.error = false;
  input.value = value;
}
/** J'itere sur mes confs au dessus et j'implemente le code pour faire fonctionner les confs */
inputs.forEach((input) => {
  const inputHTML = /**@type {HTMLInputElement}*/ (
    document.querySelector(input.selector)
  );
  // Je charge les valeurs par défaut et je les vérifies
  inputHTML.value = input.value;
  validInput(input, inputHTML);
  // J'écoute l'événement sur le selecteur configuré
  inputHTML?.addEventListener(input.event, (event) => {
    validInput(input, /**@type {HTMLInputElement}*/ (event.target));
  });
});

async function validateForm() {
  const isFormValid = inputs.every((conf) => !conf.error);
  // Si mon panier n'est pas vide, l'envoi du formulaire et la redirection peut se faire
  if (cart.cart.length !== 0){
    if (isFormValid) {
      const contact = {};
      inputs.forEach((input) => {
        contact[input.field] = input.value;
      });
      const result = await fetch("http://localhost:3000/api/products/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contact,
          products: cart.cart.map((c) => c.id),
        }),
      });
      const order = await result.json();
      const orderId = order.orderId;
      window.location.href = `confirmation.html?orderId=${orderId}`;
      //Ici je supprime ce qu'il y a dans le localStorage, pour que le panier soit vide après la commande validée
      localStorage.clear();
    } else if (!isFormValid) return alert("Le formulaire n'est pas valide");
    //Si mon panier est vide, une alerte s'affichera
  } else if (cart.cart.length == 0) return alert ("Panier vide");    
}

// Associe la fonction validateForm() à l'événement "click" du bouton avec l'id "order"
let order;
order = document.getElementById("order");
if (order) {
  order.addEventListener("click", function (event) {
    event.preventDefault();
    validateForm();
  });
}
