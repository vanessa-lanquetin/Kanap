// Selectioner l'element section avec id "items"
const itemsSection = document.getElementById('items')
//Je crée une fonction qui récupère tous les produits à l'aide de l'API, pour les ajouter sur la page d'accueil avec le DOM
function getData() {
  //Ici j'utilise fecth pour faire une requête get à l'api, pour récupérer tous les produits
  //Fetch utilise une Promesse pour gérer les réponses asynchrone
  fetch("http://localhost:3000/api/products").then((res) => {
    //Si tout est ok  (200)
    if (res.ok) {
      //La méthode json permet de transformer la réponse en un objet javascript
      //La méthode .then est appelée, une fois que la Promesse est résolue avec succès
      res.json().then((data) => {
		//J'affiche les éléments récupérées
        console.log(data);
        console.log(document.body);
        //Ici je fais une boucle pour éléments de mon tableau
        for (let index = 0; index < data.length; index++) {
          const element = data[index];
          console.log(element);
          //Je créee mon élément
          const lien = createElem("a");
          //J'ajoute un href en attribut, en mettant l'id du produit en paramètre de l'url
          lien.setAttribute("href", `./product.html?id=${element._id}`);
          //J'ajoute mon élément au DOM (j'utilise if pour m'assurer que itemsSection n'est pas null)
          if (itemsSection) {
            itemsSection.appendChild(lien);
          }

          const article = createElem("article");
          lien.appendChild(article);

          const img = createElem("img");
          const imgUrl = element.imageUrl;
          img.setAttribute("src", imgUrl);
          article.appendChild(img);

          const altTxt = element.altTxt;
          img.alt = altTxt;

          const titre = createElem("h3");
          titre.innerText = element.name;
          article.appendChild(titre);
		      titre.classList.add("productName");

          const description = createElem("p");
          description.innerText = element.description;
          article.appendChild(description);
          description.classList.add("productDescription");
        }
      });
    } else { // Si il y a un problème, alert pas de canapé
      alert("Pas de canapé !!");
    }
  });
}
//Fonction pour créer un élément plus rapidement
function createElem(ele) {
	return document.createElement(ele)
}

//J'appelle la fonction getData
getData()

