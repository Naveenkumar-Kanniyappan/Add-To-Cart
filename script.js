document.getElementById("add-to-cart").addEventListener("click", () => {
  let productName = document.getElementById("product-name").value.trim();
  let amount = parseFloat(document.getElementById("amount").value);

  if (productName && !isNaN(amount) && amount > 0) {
    let cartItems = document.getElementById("cart-items");
    let listItem = document.createElement("li");
    listItem.setAttribute("data-amount", amount); 
    listItem.innerHTML = `
      <span>${productName}</span>
      <span>${amount.toFixed(2)} <i class="fas fa-trash delete-btn"></i></span>`;
    cartItems.appendChild(listItem);

    updateTotalAmount(amount);

    listItem.querySelector(".delete-btn").addEventListener("click", () => {
      let itemAmount = parseFloat(listItem.getAttribute("data-amount"));
      updateTotalAmount(-itemAmount);
      listItem.remove();
    });
  } else {
    alert("Please enter a valid product name and amount.");
  }

  document.getElementById("product-name").value = "";
  document.getElementById("amount").value = "";
});

function updateTotalAmount(amount) {
  let totalElement = document.getElementById("total-amount");
  let currentTotal = parseFloat(totalElement.textContent) || 0;
  let newTotal = currentTotal + amount;
  totalElement.textContent = newTotal.toFixed(2);
}

document.querySelector(".fa-caret-up").addEventListener("click", () => {
  let cartItems = document.getElementById("cart-items");
  let items = Array.from(cartItems.children);

  items.sort((a, b) => {
    let amountA = parseFloat(a.getAttribute("data-amount"));
    let amountB = parseFloat(b.getAttribute("data-amount"));
    return amountB - amountA; 
  });

  cartItems.innerHTML = "";
  items.forEach((item) => cartItems.appendChild(item));
});
