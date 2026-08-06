const baseURL = import.meta.env.VITE_SERVER_URL

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ExternalServices {
  constructor(url = 'https://wdd330-backend.onrender.com/checkout') {
    this.url = url;
    // this.category = category;
    // this.path = `../json/${this.category}.json`;

  }
  async getData(category) {
    const response = await fetch(`${baseURL}products/search/${category}`);
    const data = await convertToJson(response);

    console.log("API Response:", data);
    console.log("Products:", data.Result);

    return data.Result;
  }
  async findProductById(id) {
    const response = await fetch(`${baseURL}product/${id}`);
    const data = await convertToJson(response);
    console.log(data.Result);
    return data.Result;
  }

  async checkout(payload) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };
    return await fetch(`${baseURL}checkout/`, options).then(convertToJson);

    const res = await fetch(this.url, options);
      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Checkout failed: ${res.status} ${text}`);
      }

      return res.json();
    }

}


