// ShoppingCart.mjs

import { renderListWithTemplate, renderCartWithTemplate } from "./utils.mjs";

function cartItemTemplate(product) {
    return `
    <li class="cart-card"
        <a href="product_pages/?product=" class="cart-card__image">
            <img src="${product.Image}" alt="image of ${product.Name}">
        </a>
        <a href="#">
            <h2 class="card__name">${product.Name}</h2>
        </a>
        <p class="cart-card__color">${product.Colors[0].ColorName}</p>
        <p class="cart-card__quantity">qty: 1</p>
        <p class="cart-card__price">$${product.FinalPrice}</p>
    </li>
    `;
}

export default class ShoppingCart {
    constructor(category, dataSource, listElement) {
        // You passed in this information to make the class as reusable as possible.
        // Being able to define these things when you use the class will make it very flexible
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }

    async init() {
        // the dataSource will return a Promise...so you can use await to resolve it.
        const list = await this.dataSource.getData();
        // next, render the list – ** future **
        this.renderList(list);
    }

    renderList(list) {
        renderCartWithTemplate(cartItemTemplate, this.listElement, list);
    }
}