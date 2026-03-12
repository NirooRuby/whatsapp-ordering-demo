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

function sendOrder(){

let name=document.getElementById("name").value
let phone=document.getElementById("phone").value
let address=document.getElementById("address").value

let burger=document.getElementById("burger").value
let fries=document.getElementById("fries").value
let coke=document.getElementById("coke").value

let deliveryType=document.querySelector('input[name="delivery"]:checked').value

let message="New Order %0A%0A"

message+="Customer: "+name+"%0A"
message+="Phone: "+phone+"%0A"
message+="Order Type: "+deliveryType+"%0A"

if(deliveryType==="Delivery"){
message+="Address: "+address+"%0A"
}

message+="%0AItems:%0A"

if(burger>0){
message+=burger+" x Chicken Burger %0A"
}

if(fries>0){
message+=fries+" x Fries %0A"
}

if(coke>0){
message+=coke+" x Coca Cola %0A"
}

let whatsappNumber="+94773975173"

let url="https://wa.me/"+whatsappNumber+"?text="+message

window.open(url)

}
