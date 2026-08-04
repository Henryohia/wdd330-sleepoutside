import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";
// import ShoppingCart from "./ShoppingCart.mjs";

import { loadHeaderFooter, getParam } from "./utils.mjs";

loadHeaderFooter();

const category = getParam("category"); // default to "tents" if no category is provided
// first create an instance of the ExternalServices class.
const dataSource = new ExternalServices();
// then get the element you want the product list to render in
const listElement = document.querySelector(".product-list");
// then create an instance of the ProductList class and send it the correct information.
const productList = new ProductList(category, dataSource, listElement);

productList.init();


// const productList = new ProductList("Tents", dataSource, element);

// 


// const cartElement = document.querySelector(".product-list");
// const cartDataSource = new ExternalServices("tents");
// const shoppingCart = new ShoppingCart("Tents", cartDataSource, cartElement);
// shoppingCart.init();