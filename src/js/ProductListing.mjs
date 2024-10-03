import { renderListWithTemplate, qs, capitalizeFirstLetter } from "./utils.mjs";

function productCardTemplate(tent){
    if(tent.Id!="880RR" && tent.Id!="985RF" && tent.Id!="985PR" && tent.Id!="344YJ"){ return null; }
    return `<li class="product-card">
                <a href="/product_pages/index.html?product=${tent.Id}">
                    <img src="${tent.Images.PrimaryLarge}" alt="${tent.Name}" />
                    <h3 class="card__brand">${tent.Brand.Name}</h3>
                    <h2 class="card__name">${tent.Name}</h2>
                    <p class="product-card__price">$${tent.FinalPrice}</p>
                </a>
            </li>`;
} 

function loadTitlePage(category){
    qs('title').textContent = `Sleep Outside | ${capitalizeFirstLetter(category)}`;
    qs('.products h2').textContent = `Top Products: ${capitalizeFirstLetter(category)}`;
}

export default class ProductListing {
    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
        this.init();
    }
    async init() {
        //const list = await this.dataSource.getData();
        const list = await this.dataSource.getData(this.category);
        renderListWithTemplate(productCardTemplate, this.listElement, list);
        loadTitlePage(this.category);
    }
}