//PAGE PANIER

// PARTIE FORMULAIRE


//GESTION DE L'OBJET CONTACT POUR LA REQUETE POST AU SERVEUR
//Ajout de la gestion de l'objet contact pour l'envoi au serveur


/**
 * Tous les parametres qui suivent sont regroupés dans ce tableau:
 * @param {string} type
 * @param {string} classNames
 * @param {[string, any][]} attributes
 * @param {(string| HTMLElement)[]} contents 
 * Cette fonction permet de créer facilement un élément sur le dom

 * function createElement(type, classNames = "", attributes = [], ...contents)
 */

//JE CREE UNE FONCTION POUR CREER FACLIMENT UN ELEMENT SUR LE DOM
function createElement(type, classNames = "", attributes = [], ...contents) {
// Je crée un nouvel élément en spécifiant le type
const element = document.createElement(type);
// Si des classNames sont fournies, j-ajoute ces classes à l'élément
if (classNames) {
element.classList.add(classNames);
}
// Pour chaque attribut fourni, j'ajoute l'attribut à l'élément
attributes.forEach((attribute) => {
const key = attribute[0];
const value = attribute[1];
// Si la valeur de l'attribut est une fonction, je l'ajoute en tant que propriété de l'élément
if (typeof value === "function") {
element[key] = value;
} else {
// Sinon, l'ajoute en tant qu'attribut de l'élément
element.setAttribute(key, value);
}
});

//Ici j'ajoute simplement du texte 
  contents.forEach((content) => {
    if (typeof content === "string") {
      element.innerText = content;
    } else {
      element.appendChild(content);
    }
  });
  return element;
}


//JE VERIFIE ICI LES CHAMPS DU FORMULAIRES AVEC DES REJEXS
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


//ICI JE TESTE LES CHAMPS DE MES FORMULAIRES EN CREENT UN TABLEAU D'OBJET
//POUR CHAQUE INPUT:
//GRACE AU SELECTOR, JE RECUPERE LE CHAMPS CONCERNE AVEC LE DOM
//POUR QUE CA SOIT DYNMAIQUE J'ECOUTE L'EVENT INPUT SUR CE CHAMPS
//JE RECUPERE LE NOM DU CHAMPS
//JE RECUPERE LA VALEUR DE L'INPUT
//PUIS AVEC ERRORS, JE VERIFIE QUE LA VALEUR SAISIE EST CORRECTE

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


//APRES AVOIR FAIS CETTE CONFIGURATION J'UTILISATION UNE FONCTION POUR VERIFIER LE FORMULAIRE
/**
 *Fonction pour récupérer les valeurs des champs du formulaire et les vérifier
 *
 * @param {*} input
 * @param {HTMLInputElement} target
 */
function validInput(input, target) {
  // Je récupere la valeur de l'input
  const value = target.value;
  //ICI JE RECUPERE L'ELEMENT POUR AFFICHER LE MESSAGE D'ERREUR
  // Je récupere l'emplacement du message d'erreur en remontant sur le parent puis en redescendant sur le paragraphe
  const errorHtml = target?.parentElement?.querySelector("p");
  // J'initialise l'erreur
  let error = "";

  //JE VERIFIE SI IL Y A DES ERREURS 
  // Pour chaque erreur
  input.errors.forEach((confError) => {
    // je teste si la valeur est valide suivant le test qui a été configuré
    const isGood = confError?.test(value);
    // si il n'est pas valide alors je renseigne l'erreur à afficher
    console.log(confError)
    if (!isGood) error = confError?.errorMsg;
  });

  //J'AFFICHE LE MESSAGE D'ERREUR
  // J'affiche l'erreur dans le html.
  // Si il n'ya pas eu d'erreur lors du foreach au dessus la varriable error est toujours vide.
  // Donc rien ne s'affiche
  if (errorHtml) errorHtml.innerText = error;
  if (error) input.error = true;
  else input.error = false;
  input.value = value;
}

//iCI JE CONFIGURE TOUT POUR POUVOIR VERIFIER MES INPUTS AVEC LE CODE CI - DESSUS
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

//JE CREE UNE FONCTION QUI VERIFIE QUE TOUT EST OK AVANT DE VALIDER LA COMMANDE
/**
 * Cette fonction permet de valider le formulaire
 * Si le formulaire est valide et le panier aussi, cette fonction vous redirige vers la page confirmation
 * Et envoi une requête POST avec un objet contact avec toutes les données du formualires et un tableau d'id des produtis présent dans la commande
 * Après la commande validée, le localStorage est nettoyé et le panier est vide
 * Si le formulaire ou le panier n'est pas valide, une alert se lancera
 */
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

//JE CREE UN BOUTON POUR APPELER LA FONCTION QUI VERIFIE QUE LA COMMANDE EST VALIDE
// Associe la fonction validateForm() à l'événement "click" du bouton avec l'id "order"
let order;
order = document.getElementById("order");
if (order) {
  order.addEventListener("click", function (event) {
    event.preventDefault();
    validateForm();
  });
}
