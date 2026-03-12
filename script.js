// Prices
const prices = {
    burger: 6,
    fries: 3,
    coke: 2
};

// Get DOM elements
const orderBtn = document.getElementById("orderBtn");
const burgerInput = document.getElementById("burger");
const friesInput = document.getElementById("fries");
const cokeInput = document.getElementById("coke");
const nameInput = document.getElementById("name");
const phoneInput = document.getElementById("phone");
const addressInput = document.getElementById("address");

// Add event listeners to validate and update total
document.querySelectorAll("input").forEach(input => {
    input.addEventListener("input", () => {
        validateForm();
        updateTotal();
    });
});

// Show/hide address based on delivery type
function toggleAddress(){
    let deliveryType = document.querySelector('input[name="delivery"]:checked').value;
    if(deliveryType === "Delivery"){
        document.getElementById("addressBox").style.display = "block";
    } else {
        document.getElementById("addressBox").style.display = "none";
    }
    validateForm();
    updateTotal();
}

// Validate inputs and enable/disable order button
function validateForm(){
    let name = nameInput.value.trim();
    let phone = phoneInput.value.trim();
    let deliveryType = document.querySelector('input[name="delivery"]:checked').value;
    let address = addressInput.value.trim();

    let valid = name !== "" && phone !== "";
    if(deliveryType === "Delivery") valid = valid && address !== "";

    orderBtn.disabled = !valid;
}

// Update total price display
function updateTotal(){
    const total = (burgerInput.value * prices.burger) +
                  (friesInput.value * prices.fries) +
                  (cokeInput.value * prices.coke);

    let totalEl = document.getElementById("totalPrice");
    if(!totalEl){
        totalEl = document.createElement("h3");
        totalEl.id = "totalPrice";
        document.querySelector(".container").insertBefore(totalEl, orderBtn);
    }
    totalEl.textContent = "Total: £" + total;
}

// Send WhatsApp order
function sendOrder(){
    const name = nameInput.value.trim();
    const phone = phoneInput.value.trim();
    const address = addressInput.value.trim();
    const deliveryType = document.querySelector('input[name="delivery"]:checked').value;

    const burger = burgerInput.value;
    const fries = friesInput.value;
    const coke = cokeInput.value;

    let message = "New Order\n\n";
    message += `Customer: ${name}\n`;
    message += `Phone: ${phone}\n`;
    message += `Order Type: ${deliveryType}\n`;

    if(deliveryType === "Delivery"){
        message += `Address: ${address}\n`;
    }

    message += "\nItems:\n";
    let total = 0;
    if(burger > 0){
        message += `${burger} x Chicken Burger\n`;
        total += burger * prices.burger;
    }
    if(fries > 0){
        message += `${fries} x Fries\n`;
        total += fries * prices.fries;
    }
    if(coke > 0){
        message += `${coke} x Coca Cola\n`;
        total += coke * prices.coke;
    }
    message += `\nTotal: £${total}`;

    let whatsappNumber = "447745320497"; // Replace with restaurant number
    let url = "https://wa.me/" + whatsappNumber + "?text=" + encodeURIComponent(message);
    window.open(url, "_blank");
}

// Initial call to set total
updateTotal();
