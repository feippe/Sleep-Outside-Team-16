import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

function addProductToCart(product) {
  let cart = getLocalStorage("so-cart");
  if (cart == null) {
    cart = []; // if cart empty, initialize as array
  }
  cart.push(product); //add product to cart
  setLocalStorage("so-cart", cart); //update localstorage with current cart array
}
// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
