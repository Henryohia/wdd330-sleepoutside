import { loadHeaderFooter } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import ShoppingCart from "./ShoppingCart.mjs";

const cartElement = document.querySelector(".product-list");
const cartDataSource = new ProductData("tents");
const shoppingCart = new ShoppingCart("Tents", cartDataSource, cartElement);
shoppingCart.init();

loadHeaderFooter();

const dataSource = new ProductData("tents");

const element = document.querySelector(".product-list");

const productList = new ProductList("Tents", dataSource, element);

productList.init();