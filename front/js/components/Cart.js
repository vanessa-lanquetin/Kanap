//Ce fichier est une class, cela permet d'importer les données pour la page product et panier
//Elle concerne le fonctionnement du panier
//On utlise le constructor qui est appelé au début qui permet récupérer le contenu du localstorage ou un tableau vide

//Ici cette fonction sert à confirmer l'ajout de la commande dans le panier et à rediriger l'utilisateur vers la page panier
function goToCart() {
  if (confirm("Commande ajoutée, voir mon panier?")) {
    window.location.href = "cart.html";
  }
}
class Cart {
  constructor() {
    this.cart = this.loadFromLocalStorage();
  }
  /**
   * Ajoute un produit au panier et le sauvegarde
   * @param {{id: string, color: string, quantity: number}} product
   */
  addProduct(product) {
    const cartError = this.getCartError(product.color, product.quantity);
    if (cartError) {
      alert(cartError);
    } else {
      const existingProductInCart = this.findProduct(product.id, product.color);
      if (existingProductInCart) {
        let newQuantity = product.quantity;
        console.log(newQuantity)
        newQuantity = existingProductInCart.quantity + product.quantity;
        this.editProductQuantity(product.id, product.color, newQuantity);

        goToCart();
      } else {
        this.cart.push(product);
        this.saveToLocalStorage();
        goToCart();
      }
    }
  }
  //On cherche le produit avec son id et sa couleur on vérifie si ça correspond à notre sélection
  findProduct(id, color) {
    return this.cart.find(
      (product) => product.id === id && product.color === color
    );
  }
  //Suppression du produit
  deleteItem(id, color) {
    const product = this.findProduct(id, color);
    if (product) {
      const index = this.cart.indexOf(product);
      if (index > -1) {
        //Permet de supprimer l'élément
        this.cart.splice(index, 1);
      }
    } else {
      console.error("product not found");
    }
    this.saveToLocalStorage();
  }
  /**
   * Modifier la quantité d'un produit dans le panier et le sauvegarde
   * @param {string} id
   * @param {string} color
   * @param {number} quantity
   */
  editProductQuantity(id, color, quantity) {
    const cartError = this.getCartError(color, quantity);
    //Si il y a une erreur préviens le client
    if (cartError) {
      alert(cartError);
    } else {
      //Sinon recherche le produit
      const product = this.findProduct(id, color);
      if (product) {
        //On met à jour la quantité
        product.quantity = quantity;
      }
      this.saveToLocalStorage();
    }
  }

  //Fonction pour les erreurs (quantité,couleur)
  getCartError(color, quantity) {
    if (quantity < 1) return "Veuillez renseigner la quantité";
    if (quantity > 100)
      return "Veuillez choisir une quantitié inférieure à 100";
    if (!color) return "Veuillez renseigner la couleur"; // "!" permet de vérifier l'inverse de la condition. la condition d'un string vide étant false, !false === true
  }

  //Sauvegarder le produit dans le local storage et transformer l'objet en string
  saveToLocalStorage() {
    localStorage.setItem("cart", JSON.stringify(this.cart));
  }
  /**
   * On récupere le contenu du localstorage, si il est vide on créé un tableau vide
   * @returns {{id: string, color: string, quantity: number}[]}
   */
  //On récupère les données du localstorage et les retransforme en objet si le local storage est vide se sera un tableau vide
  loadFromLocalStorage() {
    return JSON.parse(localStorage.getItem("cart") || "[]");
  }
}
