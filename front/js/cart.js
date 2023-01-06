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
  return fetch(`http://localhost:3000/api/products/${id}`).then((res) =>res.json()) 
}


//Ici nous avons une fonction asynchrone qui permet d'afficher le contenu du panier
async function updateDisplayCart() {
  const elements = []
  let totalPanierQuantity=0;
  let totalPanier = 0;
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
  if(cart__items) {
    cart__items.innerText = ''
    elements.forEach(element => {
      cart__items.appendChild(element)
    });
  }
}
updateDisplayCart()



//On supprime l'item du panier
function deleteFromCart(id, color) {
  //Du localstorage
  cart.deleteItem(id, color)
  //On met a jour le panier
  updateDisplayCart()
}
//Changer la quantité et mettre à jour dans le panier
function changeQuantity(id, color, quantity) {
  console.log(id, color, +quantity);
  cart.editProductQuantity(id, color, +quantity)
  updateDisplayCart()
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
  const article = createElement("article","cart__item",[['data-id', product._id],['data-color', color]],
    createElement('div', 'cart__item__img', [], 
      createElement('img', '', [['src', product.imageUrl], ['alt', product.altTxt]])
    ),
    createElement('div', 'cart__item__content', [],
      createElement('div', 'cart__item__content__description', [],
        createElement('h2', '', [], product.name),
        createElement('p', '', [], color),
        createElement('p', '', [], product.price.toString()+ "€"),
      ),
      createElement('div', 'cart__item__content__settings', [],
        createElement('div', 'cart__item__content__settings__quantity', [],
          createElement('p', '', [], `Qté :`),
          createElement('input', 'itemQuantity', 
            [['type','number'], ['name', 'itemQuantity'], ["min",'1'], ["max", '100'], ["value", quantity.toString()], ['onchange', (ev) => changeQuantity(product._id, color, ev.target.value)]]
          , ``)
        ),
        createElement('div', 'cart__item__content__settings__delete', [["onclick", () => deleteFromCart(product._id, color)]],
          createElement('p', 'deleteItem', [], 'Supprimer'),
        )
      )
    )
  );
  return article;
}

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
  attributes.forEach(attribute => {
    const key = attribute[0]
    const value = attribute[1]
    if(typeof value === 'function') {
      element[key] = value
    } else {
      element.setAttribute(key, value)
    }
  });

  contents.forEach(content => {
    if (typeof content === "string") {
      element.innerText = content;
    } else {
      element.appendChild(content)
    }
  })
  return element
}


