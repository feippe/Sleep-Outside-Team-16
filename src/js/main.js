import ProductData from "./ProductData.mjs";
import ProductListing from "./ProductListing.mjs";
import { qs, renderSuperscript, loadHeaderFooter } from "./utils.mjs";

let listElement = qs(".product-list");

let dataSource = new ProductData("tents");
new ProductListing("tents", dataSource, listElement);
loadHeaderFooter();