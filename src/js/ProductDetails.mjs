// ProductDetails.mjs
// Open your new file ProductDetails.mjs which located in the js directory.
// Model the ProductDetails.mjs file similarly to the ProductData.mjs file by placing the public methods in a class.
// The following methods are recommended:
// constructor(): This is recommended for classes.
// init(): There are a few things that need to happen before the class can be used. Some will happen in the constructor, automatically. Other Others need to be controlled and will be placed in this init method.
// addProductToCart(): This is the function that is currently in product.js.
// Move it here and note that project.js does not need to import setLocalStorage from utils.mjs anymore. This
// renderProductDetails(): Method to generate or populate the HTML to display the product details.
// It will be nice for the product to keep track of important information about itself. For example,
// constructor(productId, dataSource){
//   this.productId = productId;
//   this.product = {};
//   this.dataSource = dataSource;
// }
// With that information the product will know which id it has, it will have a source to get the information it needs when the time comes, and will have a place to store the retrieved details.

import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    // use the datasource to get the details for the current product. findProductById will return a promise! use await or .then() to process it.
    this.product = await this.dataSource.findProductById(this.productId);
    // the product details are needed before rendering the HTML
    this.renderProductDetails();

    // once the HTML is rendered, add a listener to the Add to Cart button
    // Notice the .bind(this). This callback will not work if the bind(this) is missing. Review the readings from this week on 'this' to understand why.
    document.getElementById("addToCart").addEventListener("click", this.addProductToCart.bind(this));
  }

  addProductToCart() {
    const cartItems = getLocalStorage("so-cart") || [];
    cartItems.push(this.product);
    setLocalStorage("so-cart", cartItems);
  }

  renderProductDetails() {
    productDetailsTemplate(this.product);
  }
}

function productDetailsTemplate(product) {
    document.querySelector("h2").textContent = product.Brand.Name;
    document.querySelector("h3").textContent = product.NameWithoutBrand;

    const productImage = document.getElementById("productImage");
    productImage.src = product.Image;
    productImage.alt = product.NameWithoutBrand;

    document.getElementById("productPrice").textContent = product.FinalPrice;
    document.getElementById("productColor").textContent = product.Colors[0].ClorName;
    document.getElementById("productDesc").innerHTML = product.DescriptionHtmlSimple;

    document.getElementById("addToCard").dataset.id = product.Id;
}


// ************* Alternative Display Product Details Method *******************
// function productDetailsTemplate(product) {
//   return `<section class="product-detail"> <h3>${product.Brand.Name}</h3>
//     <h2 class="divider">${product.NameWithoutBrand}</h2>
//     <img
//       class="divider"
//       src="${product.Image}"
//       alt="${product.NameWithoutBrand}"
//     />
//     <p class="product-card__price">$${product.FinalPrice}</p>
//     <p class="product__color">${product.Colors[0].ColorName}</p>
//     <p class="product__description">
//     ${product.DescriptionHtmlSimple}
//     </p>
//     <div class="product-detail__add">
//       <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
//     </div></section>`;
// }
