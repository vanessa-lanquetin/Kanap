// @ts-ignore vs code pense que cart est chargé dans  des fichiers séparés
//On crée une instance
const cart = new Cart();

/* const productIds = cart.cart.map(product => product.id)
fetch(`http://localhost:3000/api/products/${id}`).then((res) =>
    res.json().then((data) => {
      const element = data;
    })
) */

//On récupères les produits de l'API
function getProductFromAPI(id) {
  return fetch(`http://localhost:3000/api/products/${id}`).then((res) =>
    res.json()
  );
}

//Ici nous avons une fonction asynchrone qui permet d'afficher le contenu du panier
async function updateDisplayCart() {
  const elements = [];
  let totalPanierQuantity = 0;
  let totalPanier = 0;
  //Ici je dis que si le panier est vide, affiche " Votre panier est vide"
  if (cart.cart.length==0) {
    let cartItem = document.createElement("div");
    let cartFill = document.createElement("p");
    cartFill.innerText = "Votre panier est vide";
    cartItem.appendChild(cartFill).style.fontSize = "20px";
    let h1 = document.getElementsByTagName("h1");
    h1[0].appendChild(cartItem);
  }
  for (let i = 0; i < cart.cart.length; i++) {
    const productInCart = cart.cart[i];
    const productInAPI = await getProductFromAPI(productInCart.id);
    const element = createProductElem(
      productInAPI,
      productInCart.color,
      productInCart.quantity
    );
    elements.push(element);

    //Ici je récupère le prix et la quantité pour obtenir un total article
    const totalArticle = productInAPI.price * productInCart.quantity;
    //Je mets à jour la quantité de mon panier
    totalPanierQuantity += productInCart.quantity;
    //Je mets à jour le montant de mon panier
    totalPanier += totalArticle;
  }
  console.log(totalPanier, totalPanierQuantity);
  const totalQuantity = document.getElementById("totalQuantity");
  if (totalQuantity) {
    totalQuantity.innerText = totalPanierQuantity.toString();
  }
  const totalPrice = document.getElementById("totalPrice");
  if (totalPrice) {
    totalPrice.innerText = totalPanier.toString();
  }
  const cart__items = document.getElementById("cart__items");
  if (cart__items) {
    cart__items.innerText = "";
    elements.forEach((element) => {
      cart__items.appendChild(element);
    });
  }
}
updateDisplayCart();

//On supprime l'item du panier
function deleteFromCart(id, color) {
  //Du localstorage
  cart.deleteItem(id, color);
  //On met a jour le panier
  updateDisplayCart();
}
//Changer la quantité et mettre à jour dans le panier
function changeQuantity(id, color, quantity) {
  console.log(id, color, +quantity);
  cart.editProductQuantity(id, color, +quantity);
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
  const element = document.createElement(type);
  if (classNames) {
    element.classList.add(classNames);
  }
  attributes.forEach((attribute) => {
    const key = attribute[0];
    const value = attribute[1];
    if (typeof value === "function") {
      element[key] = value;
    } else {
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
    value: /** @type {any | null} */ ("Vanessa"),
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
    value: /** @type {any | null} */ ("Lanquetin"),
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
    value: /** @type {any | null} */ ("7 rue paul jack"),
    errors: [],
  },
  {
    // Je fais la meme chose mais pour lastname
    error: true,
    selector: ".cart__order__form input[name='city']",
    event: "input",
    field: "city",
    value: /** @type {any | null} */ ("Nancy"),
    errors: [],
  },
  {
    // Je fais la meme chose mais pour email mais en testant que ca soit un email cette fois
    error: true,
    selector: ".cart__order__form input[name='email']",
    event: "input",
    field: "email",
    value: /** @type {any | null} */ ("test@test.test"),
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
