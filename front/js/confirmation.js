const url = new URL(window.location.href);
const orderId = url.searchParams.get("orderId");

// Cherecher le span et mettre orderId dedans si orderId != null

const orderHTML=document.getElementById("orderId");
if (orderId != null && orderHTML != null) {
  orderHTML.innerText = orderId;
}
