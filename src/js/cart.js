import { getLocalStorage, loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");

  // Empty cart
  if (cartItems.length === 0) {
    document.querySelector(".product-list").innerHTML =
      "<li>Your cart is empty.</li>";

    displayCartTotal([]);

    return;
  }

  if (!Array.isArray(cartItems)) {
    console.error("cartItems is not an array!");
    return;
  }

  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");

  // displayCartTotal(cartItems);
}

function cartItemTemplate(item) {
  const newItem = `
  <li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img
        src="${item.Image}"
        alt="${item.Name}"
      />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
  </li>`;

  return newItem;
}

function displayCartTotal(cartItems) {
  // populate cart footer total
  const cartFooter = document.querySelector(".cart-footer");
  const cartTotal = document.querySelector(".cart-total");

  if (cartItems.length > 0) {
    const totalPrice = cartItems.reduce((total, item) => {
      return total + parseFloat(item.FinalPrice);
    }, 0);

    // show the total price in the cart footer
    cartTotal.textContent = `Total: $${totalPrice.toFixed(2)}`;
    cartFooter.classList.remove("hide");
  } else {
    // hide the cart footer if there are no items in the cart
    cartFooter.classList.add("hide");
  }

  // populate list footer (checkout link + total) and show it as well
  const listFooter = document.querySelector('.list-footer');
  const listTotal = document.querySelector('.list-total');
  if (listTotal) listTotal.innerText = `Total: $${totalPrice.toFixed(2)}`;
  if (listFooter) listFooter.classList.remove('hide');
  
}


renderCartContents();
