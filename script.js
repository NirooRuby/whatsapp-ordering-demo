function toggleAddress(){

let deliveryType=document.querySelector('input[name="delivery"]:checked').value

if(deliveryType==="Delivery"){
document.getElementById("addressBox").style.display="block"
}else{
document.getElementById("addressBox").style.display="none"
}

validateForm()
}

document.querySelectorAll("input").forEach(input=>{
input.addEventListener("input",validateForm)
})

function validateForm(){

let name=document.getElementById("name").value.trim()
let phone=document.getElementById("phone").value.trim()
let address=document.getElementById("address").value.trim()

let deliveryType=document.querySelector('input[name="delivery"]:checked').value

let valid=true

if(name=="" || phone==""){
valid=false
}

if(deliveryType==="Delivery" && address==""){
valid=false
}

document.getElementById("orderBtn").disabled=!valid
}

function sendOrder() {

    let name = document.getElementById("name").value.trim();
    let phone = document.getElementById("phone").value.trim();
    let address = document.getElementById("address").value.trim();

    let burger = document.getElementById("burger").value;
    let fries = document.getElementById("fries").value;
    let coke = document.getElementById("coke").value;

    let deliveryType = document.querySelector('input[name="delivery"]:checked').value;

    // Build message using normal \n for line breaks
    let message = "New Order\n\n";
    message += "Customer: " + name + "\n";
    message += "Phone: " + phone + "\n";
    message += "Order Type: " + deliveryType + "\n";

    if(deliveryType === "Delivery") {
        message += "Address: " + address + "\n";
    }

    message += "\nItems:\n";

    if(burger > 0) message += burger + " x Chicken Burger\n";
    if(fries > 0) message += fries + " x Fries\n";
    if(coke > 0) message += coke + " x Coca Cola\n";

    // WhatsApp number in correct format: CountryCode + Number
    let whatsappNumber = "447745320497"; // Replace with restaurant's number

    // Encode the whole message once
    let url = "https://wa.me/" + whatsappNumber + "?text=" + encodeURIComponent(message);

    window.open(url, "_blank");
}
