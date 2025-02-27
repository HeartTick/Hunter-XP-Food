
 // Initialize an empty array to hold the items in the cart
let cartItems = [];

// Get the cart and total price elements by their ids
const cart = document.getElementById("cart");
const totalPrice = document.getElementById("total-price");



// Add event listeners to all the "Order Now" buttons
const orderButtons = document.querySelectorAll(".btn-menu");
orderButtons.forEach(button => {
  button.addEventListener("click", () => {
    // Get the item details from the clicked button's parent element
    const parent = button.closest(".column");
    const name = parent.querySelector(".location").textContent;
    const price = parent.querySelector(".price").textContent;

    // Create a new item object with the name, price, and image URL
    const newItem = {
      name,
      price,
      imgSrc: parent.querySelector("img").getAttribute("src")
    };

    // Add the item to the cart array
    cartItems.push(newItem);

    // Render the cart HTML
    renderCart();
  });
});

// Render the cart HTML
function renderCart() {
  // Clear the existing HTML inside the cart element
  cart.innerHTML = "";

  // Loop through the items in the cart and add their HTML to the cart element
  cartItems.forEach((item, index) => {
    const itemHTML = `
      <div class="cart-item">
        <img src="${item.imgSrc}" width="150">
        <div>
          <p style="font-size: 24px">${item.name}</p>
          <p style="font-size: 20px">${item.price}</p>
          <button class="remove-btn" data-index="${index}" style="background-color: #e74c3c; color: white; padding: 5px 10px; border: none; border-radius: 5px;">Remove</button>
        </div>
      </div>
    `;
    cart.insertAdjacentHTML("beforeend", itemHTML);
    const total = cartItems.reduce((acc, item) => acc + parseFloat(item.price.replace(/[^0-9.-]+/g, "")), 0);
    console.log(total); // add this line to check if the total price is being calculated correctly
    totalPrice.textContent = `Total Price: RS ${total.toFixed(2)}`;
  });

  // Add event listeners to all the "Remove" buttons
  const removeButtons = document.querySelectorAll(".remove-btn");
  removeButtons.forEach(button => {
    button.addEventListener("click", () => {
      // Get the index of the item to remove from the data-index attribute of the clicked button
      const indexToRemove = button.getAttribute("data-index");

      // Remove the item from the cartItems array
      cartItems.splice(indexToRemove, 1);

      // Render the cart HTML
      renderCart();
    });
  });

  // Calculate the total price and update the HTML
  const total = cartItems.reduce((acc, item) => acc + parseFloat(item.price.replace(/[^0-9.-]+/g, "")), 0);
  totalPrice.textContent = `Total Price: RS ${total.toFixed(2)}`;

}