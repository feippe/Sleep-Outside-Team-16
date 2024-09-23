import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(tent){
    if(tent.ProductPage==undefined){ return null; }
    return `<li class="product-card">
                <a href="${tent.ProductPage}">
                    <img src="${tent.Image}" alt="${tent.Name}" />
                    <h3 class="card__brand">${tent.Brand.Name}</h3>
                    <h2 class="card__name">${tent.Name}</h2>
                    <p class="product-card__price">$${tent.FinalPrice}</p>
                </a>
            </li>`;
}

export default class ProductListing {
    constructor(category, dataSource, listElement) {
      this.category = category;
      this.dataSource = dataSource;
      this.listElement = listElement;
      this.init();
    }
    async init(){
        const list = await this.dataSource.getData();
        renderListWithTemplate(productCardTemplate, this.listElement, list);
    }
  }
  