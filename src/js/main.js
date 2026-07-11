import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

// const dataSource = new ProductData("tents");
// const listElement = document.querySelector(".product-list");

// Then create an instance of your ProductList class in main.js and make sure that you can see the list of products.

const productList = new ProductList("tents", new ProductData("tents"), document.getElementById("product-list"));
productList.init();


