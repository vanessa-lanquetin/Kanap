//PAGE PANIER

//PARTIE PANIER


//JE CREE UNE NOUVELLE INSTANCE DE CART
// @ts-ignore : cette ligne de code permet à l'éditeur de code d'y ignorer les erreurs de type qui pourraient survenir pour la variable "cart",
// @ts-ignore vs code pense que cart est chargé dans des fichiers séparés
//JE CREE UNE NOUVELLE INSTANCE DE CART LE FONCTIONNEMENT DU PANIER
const cart = new Cart();

//ENSUITE JE RECUPERE LES INFORMATIONS D'UN PRODUIT SPECIFIQUE
  /**
   * J'utilise cette fonction pour récupérer les informations d'un produit spécifique à partir de l'API en utilisant l'ID du produit.
  */
function getProductFromAPI(id) {
  return fetch(`http://localhost:3000/api/products/${id}`).then((res) =>
    res.json()
  );
}

//J'UTILISE UNE FOCNTION ASYNCHRONE POUR AFFICHER LE CONTENU DU PANIER
  /**
   * J'utilise une fonction asynchrone, qui permet d'afficher le contenu du panier
  */
async function updateDisplayCart() {
  // Je crée un tableau vide
  const elements = [];


  //JE CREE MES TOTAUX
  //J'initalise les variables
  let totalPanierQuantity = 0;
  let totalPanier = 0;


  //J'AFFICHE UN MESSAGE LORSQUE LE PANIER EST VIDE
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

  //POUR CHAQUE ELEMENT DE MON TABLEAU, JE RECUPERE LES INFORMATIONS DU PRODUIT et L'AJOUTE
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
    

    //JE CALCULE MES TOTAUX EN RECUPERANT LES PRIX ET QUANTITES 
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


  //JE RECUPERE L'ELEMENT HTML  QUI CONTIENDRA TOUT MON PANIER
  // Je récupère l'élément HTML pour afficher les articles dans le panier
  const cart__items = document.getElementById("cart__items");
  // Si l'élément existe, met à jour le contenu en ajoutant les éléments pour chaque produit dans le panier
  if (cart__items) {
    cart__items.innerText = "";

    //J'AJOUTE CHAUQE PRODUIT SUR LA PAGE AVEC LE DOM
    elements.forEach((element) => {
      //Ajout de l'élément dans le panier
      cart__items.appendChild(element);
    });
  }
}

//JE METS A JOUR MON PANIER
// Appelle la fonction pour mettre à jour l'affichage initial du panier
updateDisplayCart();


//JE CREE UNE FONCTION POUR SUPPRIMER UN PRODUIT DU PANIER
  /**
   * fonction pour supprimer un article du panier, du localStorage
  */
// Définit une fonction pour supprimer un article du panier
function deleteFromCart(id, color) {
  // Appelle la méthode pour supprimer un article du panier stocké dans le LocalStorage
  cart.deleteItem(id, color);
  // Appelle la fonction pour mettre à jour l'affichage du panier
  updateDisplayCart();
}
//JE CREE UNE FONCTION POUR MODIFILIER LA QUANTITE D'UN PRODUIT DU PANIER
  /**
   * fonction pour changer la quantité d'un article dans le panier
  */
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

//JE CREE UNE FONCTION POUR CREER FACLIMENT UN ELEMENT SUR LE DOM
  /**
   * Cette fonction permet de créer facilement un élément sur le dom

  * function createElement(type, classNames = "", attributes = [], ...contents)
  */

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
              //Ici la quantité se met à jour grâce à onchange
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
          //Ici quand on click sur cet élément, la fonction pour supprimer le produit est appelée
          [["onclick", () => deleteFromCart(product._id, color)]],
          createElement("p", "deleteItem", [], "Supprimer")
        )
      )
    )
  );
  return article;

}
