import { convertToJson } from "./utils.mjs";
  
export default class ProductDetails {
    constructor(id, category) {
        this.id = id;
        this.category = category;
        this.path = `../json/${this.category}.json`;
        this.details = {};
        this.quantity;
    }
    async getData() {
        return fetch(this.path)
            .then(convertToJson)
            .then((data) => data);
    }
    async init() {
        const products = await this.getData();
        this.details = products.find((item) => item.Id === this.id);
    }
}
