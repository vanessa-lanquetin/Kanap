const url = new URL(window.location.href);
const orderId = url.searchParams.get("orderId");

// Cherecher le span et mettre orderUd dedans si orderId != null