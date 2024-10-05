import {
  setLocalStorage,
  getLocalStorage,
  getParam,
  qs,
  renderSuperscript,
} from "./utils.mjs";
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

async function loadingDetailsToPage(id) {
  const productDetails = new ProductDetails(id, "tents");
  await productDetails.init();
  const details = productDetails.details;

  qs("title").textContent = `Sleep Outside | ${details.Name}`;
  qs(".product-detail h3").textContent = details.Brand.Name;
  qs(".product-detail h2").textContent = details.NameWithoutBrand;
  qs(".product-detail img").setAttribute("src", details.Image);
  qs(".product-detail img").setAttribute("alt", details.Name);
  qs(".product-detail .product-card__price").textContent =
    `$${details.FinalPrice}`;
  details.Colors.forEach((color) => {
    let colorElement = document.createElement("span");
    colorElement.textContent = color.ColorName;
    qs(".product-detail .product__color").appendChild(colorElement);
  });
  qs(".product-detail .product__description").innerHTML =
    details.DescriptionHtmlSimple;
  qs("#addToCart").setAttribute("data-id", details.Id);
  renderSuperscript();
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);

let productId = getParam("product");
if (productId !== undefined) {
  loadingDetailsToPage(productId);
}
