import {
  getLocalStorage,
  setLocalStorage,
  qs,
  qsa,
  renderSuperscript,
} from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  if (cartItems.length > 0) {
    qs(".button-panels").style.display = "inline-block";
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    document.querySelector(".product-list").innerHTML = htmlItems.join("");
    qsa(".cart-card__remove").forEach((item) => {
      item.addEventListener("click", (event) => {
        event.preventDefault();
        removeFromCart(event.target.getAttribute("data-id"));
      });
    });
    showTotal(cartItems);
  } else {
    showCartEmptyState();
  }

  renderSuperscript();
}

function showTotal(cartItems) {
  if (cartItems.length > 0) {
    qs(".cart-footer").classList.remove("hide");
    let total = 0;
    cartItems.forEach((item) => {
      if (item !== null) {
        total += item.quantity * item.FinalPrice;
      }
    });
    qs(".cart-footer .cart-total").textContent = `Total: $${total.toFixed(2)}`;
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
  <label class='qty-label'>Quantity:
    <input class='cart-card__quantity' type='number' id='${item.Id}' value='${item.quantity}'/>
  </label>
  <p class='cart-card__price'>$${item.FinalPrice}</p>
  <span class='cart-card__remove' data-id='${item.Id}'>❌</span>
</li>`;
  return newItem;
}

function showCartEmptyState() {
  let main = qs("main");
  main.innerHTML = '';

  let divEmpty = document.createElement("div");
  divEmpty.className = "empty-state";

  let imgEmpty = document.createElement("img");
  imgEmpty.setAttribute("src", "/images/cart-empty-state.png");
  imgEmpty.setAttribute("height", 180);
  imgEmpty.setAttribute("width", 180);
  imgEmpty.setAttribute("alt", "Empty cart");
  imgEmpty.setAttribute("loading", "lazy");
  divEmpty.append(imgEmpty);

  let h2Empty = document.createElement("h2");
  h2Empty.textContent = "Your cart is empty";
  divEmpty.append(h2Empty);

  let pEmpty = document.createElement("p");
  pEmpty.textContent =
    "Looks like you have not added anything to your cart. Go ahead and explore ours categories.";
  divEmpty.append(pEmpty);

  let buttonEmpty = document.createElement("button");
  buttonEmpty.textContent = "Go to categories page";
  buttonEmpty.addEventListener("click", (e) => {
    e.preventDefault();
    location.href = "/index.html";
  });
  divEmpty.append(buttonEmpty);

  main.append(divEmpty);
}

// function updateQuantity(id, quantity) {
//   const cartItems = getLocalStorage("so-cart");
//   let newList = [];
//   cartItems.forEach((item) => {
//     if (item.id === id) {
//       item.quantity = quantity;
//     }
//     newList.push(item);
//   });
//   setLocalStorage("so-cart", newList);
// }

renderCartContents();

const qtyInputs = document.querySelectorAll(".cart-card__quantity");

qtyInputs.forEach(input => {
  input.addEventListener("change", function () {
    if (input.value == "0") {
      alert("Product quantity must be greater than 0! Otherwise please use the X button to remove product from cart.")
      input.value = 1
    }
    let id = input.getAttribute("id");
    const cartItems = getLocalStorage("so-cart");
    let newList = [];
    cartItems.forEach(item => {
      if (item.Id == id) {
        item.quantity = parseInt(input.value);
      }
      newList.push(item);
    });
    setLocalStorage("so-cart", newList);
    showTotal(cartItems);
  });
});