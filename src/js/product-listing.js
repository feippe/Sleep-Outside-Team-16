import ProductData from "./ProductData.mjs";
import ProductListing from "./ProductListing.mjs";
import { qs, getParam } from "./utils.mjs";


const category = getParam('category');
const dataSource = new ProductData();
const listElement = qs('.product-list');
const myList = new ProductListing(category, dataSource, listElement);
myList.init();

/*let listElement = qs(".product-list");
let dataSource = new ProductData("tents");
new ProductListing("tents", dataSource, listElement);*/
