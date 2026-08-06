import { getLocalStorage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

const services = new ExternalServices();

// takes a form element and returns an object where the key is the "name" of the form input.
function formDataToJSON(formElement) {
  const formData = new FormData(formElement),
    convertedJSON = {};

  formData.forEach(function (value, key) {
    convertedJSON[key] = value;
  });

  return convertedJSON;
}

// takes the items currently stored in the cart (localstorage) and returns them in a simplified form.
function packageItems(items) {
  // convert the list of products from localStorage to the simpler form required for the checkout process.
  // An Array.map would be perfect for this process.
  const simplifiedItems = items.map((item) => {
    console.log(item);
    return {
      id: item.Id,
      price: item.FinalPrice,
      name: item.Name,
      quantity: 1,
    };
  });
  return simplifiedItems;     
}

export default class CheckoutProcess {
  constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = [];
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
  }

  init() {
    this.list = getLocalStorage(this.key);
    this.calculateItemSummary();
  }

  calculateItemSubTotal() {
    // calculate and display the total dollar amount of the items in the cart, and the number of items.
    const summaryElement = document.querySelector(
      this.outputSelector + " #cartTotal"
    );
    const itemNumElement = document.querySelector(
      this.outputSelector + " #num-items"
    );
    itemNumElement.innerText = this.list.length;
    // calculate the total of all the items in the cart
    const amounts = this.list.map((item) => item.FinalPrice);
    this.itemTotal = amounts.reduce((sum, item) => sum + item);
    summaryElement.innerText = `$${this.itemTotal}`;
  }

  calculateOrderTotal() {
    // calculate the tax and shipping amounts. Add those to the cart total to figure out the order total
    this.tax = (this.itemTotal * .06);
    this.shipping = 10 + (this.list.length - 1) * 2;
    this.orderTotal = (
      parseFloat(this.itemTotal) +
      parseFloat(this.tax) +
      parseFloat(this.shipping)
    ).toFixed(2);

    // display the totals.
    this.displayOrderTotals();
  }

  displayOrderTotals() {
    // once the totals are all calculated display them in the order summary page
    const tax = document.querySelector(`${this.outputSelector} #tax`);
    const shipping = document.querySelector(`${this.outputSelector} #shipping`);
    const orderTotal = document.querySelector(`${this.outputSelector} #orderTotal`);

    tax.innerText = `$${this.tax.toFixed(2)}`;
    shipping.innerText = `$${this.shipping.toFixed(2)}`;
    orderTotal.innerText = `$${this.orderTotal.toFixed(2)}`;
  }

//   async checkout(form) {
//   // get the form element data by the form name
//   // convert the form data to a JSON order object using the formDataToJSON function
//   // populate the JSON order object with the order Date, orderTotal, tax, shipping, and list of items
//   // call the checkout method in the ExternalServices module and send it the JSON order data.
//   const formElement = document.forms["checkout"];
//     const order = formDataToJSON(formElement);

//     order.orderDate = new Date().toISOString();
//     order.orderTotal = this.orderTotal;
//     order.tax = this.tax;
//     order.shipping = this.shipping;
//     order.items = packageItems(this.list);
//     //console.log(order);

//     // takes a form element and returns an object where the key is the "name" of the form input.
//     function formDataToJSON(formElement) {
//     const formData = new FormData(formElement),
//         convertedJSON = {};

//     formData.forEach(function (value, key) {
//         convertedJSON[key] = value;
//     });

//     return convertedJSON;
//     }
//   }

  // called when form submits
  async checkout(formElement) {
    const form = typeof formElement === 'string' ? document.forms[formElement] : formElement;
    if (!form) throw new Error('Checkout form not found');

    const order = formDataToJSON(form);

    // required keys per server spec
    order.orderDate = new Date().toISOString();
    order.items = packageItems(this.list);
    order.orderTotal = this.orderTotal.toFixed(2);
    order.tax = this.tax.toFixed(2);
    order.shipping = this.shipping;

    // send to server
    // const response = await services.checkout(order);
    

    try {
      const response = await services.checkout(order);
      console.log(response);
      return response;
    } catch (err) {
      console.log(err);
    }
  }
}


// const cp = new CheckoutProcess('so-cart', '.checkout-summary');
//       cp.init();

//       // recalc totals when zip changes
//       const zipInput = document.querySelector('#zip');
//       if (zipInput) {
//         zipInput.addEventListener('change', () => cp.calculateOrderTotal());
//         zipInput.addEventListener('blur', () => cp.calculateOrderTotal());
//       }

//       // also calculate immediately so tax/shipping show after init
//       cp.calculateOrderTotal();

//       const form = document.querySelector('#checkout');
//       if (form) {
//         form.addEventListener('submit', async (e) => {
//           e.preventDefault();
//           // HTML required attributes will prevent submit if fields empty
//           const msg = document.querySelector('#checkout-message');
//           try {
//             const resp = await cp.checkout(form);
//             msg.innerText = 'Order submitted successfully. Order id: ' + (resp && resp.orderId ? resp.orderId : JSON.stringify(resp));
//             // Optionally clear cart
//             // localStorage.removeItem('so-cart');
//           } catch (err) {
//             console.error(err);
//             msg.innerText = 'Order failed: ' + err.message;
//           }
//         });
//       }