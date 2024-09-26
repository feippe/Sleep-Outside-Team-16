import { setLocalStorage, getLocalStorage, getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

const dataSource = new ProductData("tents");

function addProductToCart(product) {
  let list = getLocalStorage("so-cart");
  if (list == null) {
    list = [];
  }
  list.push(product);
  setLocalStorage("so-cart", list);
}

// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

function loadingDetailsToPage(details) {
  document.querySelector("title").textContent =
    `Sleep Outside | ${details.Name}`;
  document.querySelector(".product-detail h3").textContent = details.Brand.Name;
  document.querySelector(".product-detail h2").textContent =
    details.NameWithoutBrand;
  document
    .querySelector(".product-detail img")
    .setAttribute("src", details.Image);
  document
    .querySelector(".product-detail img")
    .setAttribute("alt", details.Name);
  document.querySelector(".product-detail .product-card__price").textContent =
    `$${details.FinalPrice}`;
  details.Colors.forEach((color) => {
    let colorElement = document.createElement("span");
    colorElement.textContent = color.ColorName;
    document
      .querySelector(".product-detail .product__color")
      .appendChild(colorElement);
  });
  document.querySelector(".product-detail .product__description").innerHTML =
    details.DescriptionHtmlSimple;
  document.querySelector("#addToCart").setAttribute("data-id", details.Id);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);

const productId = getParam("product");
if (productId !== undefined) {
  const productDetails = new ProductDetails(productId, "tents");
  await productDetails.init();
  loadingDetailsToPage(productDetails.details);
}
