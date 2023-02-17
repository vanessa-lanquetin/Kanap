//CE FICHIER EST UNE CLASS, CELA PERMET D'IMPORTER LES DONNEES POUR LA PAGE PRODUCT ET PANIER
//Une classe est un modèle ou un plan pour créer des objets avec des caractéristiques et des comportements spécifiques. 

  /**
   * Ici cette fonction sert à confirmer l'ajout de la commande dans le panier et à rediriger l'utilisateur vers la page panier
  */
function goToCart() {
  if (confirm("Commande ajoutée, voir mon panier?")) {
    window.location.href = "cart.html";
  }
}

//JE CREER UNE CLASS QUI GERE LE FONCTIONNEMENT DU PANIER
  /**
   * Cette class gère le fonctionnement du panier à l'aide d'un constructor et de la fonction AddPrduct
   *
   * Le contrustor appelle la fonction loadFromLocalStorage(), pour récupérer le contenu du localStorage pour le mettre dans le panier(cart) ou un tableua vide
   *
   * La fonction AddProduct gère l'ajout de produit au panier et de la sauvegarde du panier
  */
class Cart {
  //Le constructor récupére le contenu du localstorage ou un tableau vide
  constructor() {
    this.cart = this.loadFromLocalStorage();
  }

  /**
   * Cette fonction ajoute un produit au panier et la sauvegarde du panier
   * @param {{id: string, color: string, quantity: number}} product
   */
  addProduct(product) {
    //Avant l'ajout du produit au panier, on vérifie qu'il n'y a pas d'erreurs au niveau de la couleur et des quantités
    const cartError = this.getCartError(product.color, product.quantity);
    //On informe qu'il y a une erreur à l'utilisateur
    if (cartError) {
      alert(cartError);
    } else {
      //Ensuite on vérifie si le produit est déjà présent dans le panier
      const existingProductInCart = this.findProduct(product.id, product.color);
      //Si c'est le cas on met à jour la quantité
      if (existingProductInCart) {
        //On récupère la nouvelel quantité choisie
        let newQuantity = product.quantity;
        console.log(newQuantity);
        //On ajoute cette nouvelle quantité à la quantité déjà existante
        newQuantity = existingProductInCart.quantity + product.quantity;
        this.editProductQuantity(product.id, product.color, newQuantity);
        goToCart();
      } else {
        //Si le produit n'est pas présent dans le panier, on l'ajoute directement au panier
        this.cart.push(product);
        //On sauvegarde le local storage
        this.saveToLocalStorage();
        goToCart();
      }
    }
  }
  /**
   * On cherche le produit avec son id et sa couleur on vérifie si ça correspond à notre sélection
   * @param {string} id
   * @param {string} color
   */
  findProduct(id, color) {
    return this.cart.find(
      (product) => product.id === id && product.color === color
    );
  }
  /**
   * Suppresion du produit dans le panier
   * @param {string} id
   * @param {string} color
   */
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
   * Modifie la quantité d'un produit dans le panier et le sauvegarde
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
  /**
   * Fonction qui vérifie les erreurs (quantité,couleur) avant l'ajout du produit
   * @param {string} color
   * @param {number} quantity
   */
  getCartError(color, quantity) {
    if (quantity < 1) return "Veuillez renseigner la quantité";
    if (quantity > 100)
      return "Veuillez choisir une quantitié inférieure à 100";
    if (!color) return "Veuillez renseigner la couleur"; // "!" permet de vérifier l'inverse de la condition. la condition d'un string vide étant false, !false === true
  }

  /**
   * Sauvegarde le produit dans le local storage et le transforme l'objet en string
   */
  saveToLocalStorage() {
    localStorage.setItem("cart", JSON.stringify(this.cart));
  }

  /**
   * On récupere le contenu du localstorage, si il est vide on créé un tableau vide
   * @returns {{id: string, color: string, quantity: number}[]}
   */
  loadFromLocalStorage() {
    return JSON.parse(localStorage.getItem("cart") || "[]");
  }
}
