# OC_P5_Kanap : Construisez un site e-commerce en Javascript

_(Projet 5 - Formation en Web Développement - Openclassrooms)_

Il s'agit du serveur frontal et principal du projet 5 du parcours développeur Web.

**Prérequis back-end**
Vous aurez besoin d'avoir Node et d'être npminstallé localement sur votre machine.

**Installation back-end**
Clonez ce dépôt. Depuis le dossier "back" du projet, exécutez `npm install`. Vous pouvez ensuite exécuter le serveur avec `node server`. Le serveur doit fonctionner localhostavec le port par défaut `3000`. Si le serveur s'exécute sur un autre port pour une raison quelconque, cela est imprimé sur la console au démarrage du serveur, par exemple `Listening on port 3001`.

###

# Présentation du Projet

Dynamiser un site web avec Javascript Vanilla, utiliser le LocalStorage et une API - Parcours Openclassrooms Développeur Web

<p align="center">
  <img src="./front/images/logo.png" width="500" height="600"/>
</p>

## Scénario

Vous êtes en poste dans une agence de développement web depuis quelques semaines maintenant. Après avoir réalisé avec succès l’intégration de quelques sites web (HTML/CSS), on vous confie une nouvelle mission.

Votre client est Kanap, une marque de canapés qui vend ses produits depuis sa boutique exclusivement. Aujourd’hui, celle-ci souhaiterait avoir une plateforme de e-commerce en plus de sa boutique physique pour vendre ses produits sur Internet.

**Dans le cadre de cette mission, vous travaillez avec une équipe constituée de:**

- Corinne, le CTO de l’agence ;

- Frank, le développeur front-end qui s’est chargé d’intégrer la maquette statique du site ;

- Bilal, le développeur back-end qui implémente l’API à laquelle est connecté le front-end.

**Voici les différentes tâches que tu vas devoir mener à bien pour implémenter de manière dynamique le site Kanap:**

- Unifier les travaux déjà réalisés par l’équipe en intégrant dynamiquement les éléments de l’API dans les différentes pages web avec JavaScript. Le code du front-end et de l’API est disponible sur ce repo.

- Mettre en place un plan de test d’acceptation à partir de ce template que nous avons pour habitude d’utiliser.

4 pages ont été mises en place : page d’accueil, page Produit, page Panier et la page Confirmation. Sur l’ensemble des pages, toutes les parties statiques sont en place, elles sont donc prêtes à recevoir le contenu dynamique.

Aussi, sur chaque page, un exemple de la partie dynamique est systématiquement donné ; de cette façon, tu n’as pas à t’occuper de la mise en place de la structure HTML ni du style CSS, tout est déjà fait. Tu n’as plus qu’à t’occuper d’intégrer ces éléments dynamiquement grâce à JS et l’API.

Enfin, dans le code HTML j’ai intégré des “id” dans différentes balises, cela devrait t’aider à intégrer les éléments dynamiques. Avec tout ça, normalement tu n’auras pas besoin de toucher au code HTML/CSS.

#

### Contenu des pages

#### Page Accueil

- Cette page affiche (de manière dynamique) tous les articles disponibles à la vente. L’ensemble des produits sont retournés par l’API.

- Pour chaque produit, il faudra afficher l’image de celui-ci, ainsi que son nom et le début de sa description.

- En cliquant sur le produit, l’utilisateur sera redirigé sur la page du produit pour consulter celui-ci plus en détail.

#### Page Produit

- Cette page affiche (de manière dynamique) les détails du produit sur lequel l'utilisateur a cliqué depuis la page d’accueil.

- Depuis cette page, l’utilisateur peut sélectionner une quantité, une couleur, et ajouter le produit à son panier.

#### Page Panier

- Un résumé des produits dans le panier, le prix total et la possibilité de modifier la quantité d’un produit sélectionné ou bien de supprimer celui-ci.

- Dans le panier, les produits doivent toujours apparaître de manière regroupée par modèle et par couleur. Si un produit est ajouté dans le panier à plusieurs reprises, avec la même couleur, celui-ci ne doit apparaître qu’une seule fois, mais avec le nombre d’exemplaires ajusté. Si un produit est ajouté dans le panier à plusieurs reprises, mais avec des couleurs différentes, il doit apparaître en deux lignes distinctes avec la couleur et la quantité correspondantes indiquées à chaque fois.

- Un formulaire permettant de passer une commande. Les données du formulaire doivent être correctes et bien formatées avant d'être renvoyées au back-end. Par exemple, pas de chiffre dans un champ prénom.

- En cas de problème de saisie, un message d’erreur devra être affiché en dessous du champ correspondant.

- Attention à ne pas stocker le prix des articles en local. Les données stockées en local ne sont pas sécurisées et l’utilisateur pourrait alors modifier le prix lui-même.

#### Page Confirmation

- Un message de confirmation de commande, remerciant l'utilisateur pour sa commande, et indiquant l'identifiant de commande envoyé par l’API.

- Sur cette page, l'utilisateur doit voir s’afficher son numéro de commande. Il faudra veiller à ce que ce numéro ne soit stocké nulle part.

## Compétences évaluées

- Interagir avec un web service avec JavaScript

- Valider des données issues de sources externes

- Créer un plan de test pour une application

- Gérer des événements JavaScript
