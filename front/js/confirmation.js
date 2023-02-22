//PAGE CONFIRMATION

//JE PASSE EN PARAMETRE DE MON URL, L'ORDER ID
const url = new URL(window.location.href);
const orderId = url.searchParams.get("orderId");



//J'AFFICHE LE NUMERO DE COMMANDE EN AFFICHANT L'ORDERID SUR LA PAGE AVEC LE DOM
const orderHTML = document.getElementById("orderId");
// Chercher le span et mettre orderId dedans si orderId != null
if (orderId != null && orderHTML != null) {
  orderHTML.innerText = orderId;
}
