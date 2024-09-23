import ProductData from "./ProductData.mjs";
import ProductListing from "./ProductListing.mjs";
import { qs } from "./utils.mjs";

let listElement = qs('.product-list');

let dataSource = new ProductData('tents');
let products = new ProductListing('tents',dataSource,listElement);