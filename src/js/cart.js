import {
  getLocalStorage,
  setLocalStorage,
  qs,
  qsa,
  renderSuperscript,
} from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
  qsa(".cart-card__remove").forEach((item) => {
    item.addEventListener("click", (event) => {
      event.preventDefault();
      removeFromCart(event.target.getAttribute("data-id"));
    });
  });
  showTotal(cartItems);
  renderSuperscript();
}

function showTotal(cartItems) {
  if (cartItems.length > 0) {
    qs(".cart-footer").classList.remove("hide");
    let total = 0;
    cartItems.forEach((item) => {
      if (item !== null) {
        total += (item.quantity*item.FinalPrice);
      }
    });
    qs(".cart-footer .cart-total").textContent = `Total: $${total}`;
  } else {
    qs(".cart-footer").classList.add("hide");
  }
}

function removeFromCart(id) {
  const cartItems = getLocalStorage("so-cart");
  let newList = [];
  cartItems.forEach((item) => {
    if (item.Id != id) {
      newList.push(item);
    }
  });
  setLocalStorage("so-cart", newList);
  renderCartContents();
}

function cartItemTemplate(item) {
  if (item === null) {
    return null;
  }
  const newItem = `<li class='cart-card divider'>
  <a href='#' class='cart-card__image'>
    <img
      src='${item.Images.PrimarySmall}'
      alt='${item.Name}'
    />
  </a>
  <a href='#'>
    <h2 class='card__name'>${item.Name}</h2>
  </a>
  <p class='cart-card__color'>${item.Colors[0].ColorName}</p>
  <p class='cart-card__quantity'>qty: ${item.quantity}</p>
  <p class='cart-card__price'>$${item.FinalPrice}</p>
  <span class='cart-card__remove' data-id='${item.Id}'>❌</span>
</li>`;
  return newItem;
}

renderCartContents();
