// ProductList.mjs

import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
    return `
    <li class="product-card"
        <a href="../product_pages/?product=${product.Id}">
            <img src="${product.Images.PrimaryMedium}" alt="image of ${product.Name}">
            <h2 class="product-card__brand">${product.Brand.Name}</h2>
            <h3 class="product-card__name">${product.NameWithoutBrand}</h3>
            <p class="product-card__price">$${product.FinalPrice}</p>
        </a>
    </li>
    `;
}

export default class ProductList {
    constructor(category, dataSource, listElement) {
        // You passed in this information to make the class as reusable as possible.
        // Being able to define these things when you use the class will make it very flexible
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }

    async init() {
        // the dataSource will return a Promise...so you can use await to resolve it.
        const list = await this.dataSource.getData(this.category);
        // next, render the list – ** future **
        this.renderList(list);

        document.querySelector(".title").textContent = `Top Products: ${this.category.charAt(0).toUpperCase() + this.category.slice(1)}`;
    }

    renderList(list) {


        renderListWithTemplate(productCardTemplate, this.listElement, list);
    }
}