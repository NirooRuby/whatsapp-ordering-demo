const orderBtn = document.getElementById("orderBtn");
const totalEl = document.getElementById("totalPrice");
const checkboxes = document.querySelectorAll(".item-checkbox");
const qtyInputs = document.querySelectorAll(".qty");

function toggleAddress() {
  const deliveryType = document.querySelector('input[name="delivery"]:checked').value;
  document.getElementById("addressBox").style.display = deliveryType === "Delivery" ? "block" : "none";
  validateForm();
  updateTotal();
}

// Enable quantity input when checkbox is checked
checkboxes.forEach((cb, i) => {
  cb.addEventListener("change", () => {
    qtyInputs[i].disabled = !cb.checked;
    if (!cb.checked) qtyInputs[i].value = 1;
    updateTotal();
    validateForm();
  });
});

qtyInputs.forEach(input => {
  input.addEventListener("input", () => {
    if (input.value < 1) input.value = 1;
    updateTotal();
    validateForm();
  });
});

function updateTotal() {
  let total = 0;
  checkboxes.forEach((cb, i) => {
    if (cb.checked) {
      total += parseInt(qtyInputs[i].value) * parseFloat(cb.dataset.price);
    }
  });
  totalEl.textContent = "Total: £" + total;
}

function validateForm() {
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const deliveryType = document.querySelector('input[name="delivery"]:checked').value;
  const address = document.getElementById("address").value.trim();

  let hasItem = Array.from(checkboxes).some(cb => cb.checked);

  let valid = name !== "" && phone !== "" && hasItem;
  if (deliveryType === "Delivery") valid = valid && address !== "";

  orderBtn.disabled = !valid;
}

function sendOrder() {
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const deliveryType = document.querySelector('input[name="delivery"]:checked').value;
  const address = document.getElementById("address").value.trim();

  let message = "New Order\n\n";
  message += `Customer: ${name}\nPhone: ${phone}\nOrder Type: ${deliveryType}\n`;
  if (deliveryType === "Delivery") message += `Address: ${address}\n`;
  message += "\nItems:\n";

  let total = 0;

  checkboxes.forEach((cb, i) => {
    if (cb.checked) {
      const qty = parseInt(qtyInputs[i].value);
      message += `${qty} x ${cb.dataset.item}\n`;
      total += qty * parseFloat(cb.dataset.price);
    }
  });

  message += `\nTotal: £${total}`;
  message += `\nPlease pay here: [Payment Link]`;

  const whatsappNumber = "447745320497"; // replace with your restaurant number
  const url = "https://wa.me/" + whatsappNumber + "?text=" + encodeURIComponent(message);

  window.open(url, "_blank");
}
