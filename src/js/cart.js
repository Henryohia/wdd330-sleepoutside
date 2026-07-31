import { getLocalStorage, loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];

  // Empty cart
  if (cartItems.length === 0) {
    document.querySelector(".product-list").innerHTML =
      "<li>Your cart is empty.</li>";
    return;
  }

  // console.log("cartItems:", cartItems);
  // console.log("typeof:", typeof cartItems);
  // console.log("isArray:", Array.isArray(cartItems));

  if (!Array.isArray(cartItems)) {
    console.error("cartItems is not an array!");
    return;
  }

  const htmlItems = cartItems.map(cartItemTemplate);
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
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



renderCartContents();
