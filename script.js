function sendOrder() {

let name = document.getElementById("name").value
let phone = document.getElementById("phone").value

let burger = document.getElementById("burger").value
let fries = document.getElementById("fries").value
let coke = document.getElementById("coke").value

let message = "New Order %0A%0A"

message += "Customer: " + name + "%0A"
message += "Phone: " + phone + "%0A%0A"

message += "Order Items:%0A"

if(burger > 0){
message += burger + " x Chicken Burger %0A"
}

if(fries > 0){
message += fries + " x Fries %0A"
}

if(coke > 0){
message += coke + " x Coke %0A"
}

let whatsappNumber = "447000000000"

let url = "https://wa.me/" + whatsappNumber + "?text=" + message

window.open(url)

}
