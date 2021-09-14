
const loadProducts = () => {
  fetch('https://fakestoreapi.com/products')
    .then(res => res.json())
    .then(data => showProducts(data))
  // console.log(json);
};

// show all product in UI 
const showProducts = (products) => {
  console.log(products);
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("product");
    // show details modals text
    div.innerHTML = `
    <div class="col ">
    <div class="single-product rounded-3 card bg-white bg-opacity-10">
      <img class="card-img-top mx-auto imgCard" src=${image}></img>
      <div class="card-body">
        <h4 class="card-title">${product.title.slice(0, 60)}</h4>
        <p>Category: ${product.category}</p>
      </div>
      <div class="card-footer bg-white">
        <h3>Price: $ ${product.price}</h3>
        <div class="d-flex flex-column gap-3">
          <div id="star${product.id}" class="d-flex justify-content-center">
          </div>
          <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn"
            class="buy-now btn btn-success">add to cart</button>
          <button id="details-btn" class="btn btn-outline-info" data-bs-toggle="modal" data-bs-target="#exampleModal">Details</button>
        </div>
      </div>
    </div>
                `;
    document.getElementById("all-products").appendChild(div);
    addStar(Math.round(product.rating.rate), product.id, product.rating.count, product.rating.rate)
  }
};
function addStar(starCount, id, rateTotal,rateAvarage) {
  const starid = 'star' + id;
  let i = 0;
  while (i < starCount) {
    const star = document.createElement("div");
    star.innerHTML = `
    <i class="fas fa-star starred"></i>
    `
    document.getElementById(starid).appendChild(star);
    i++;

  }
  // const staridd = document.getElementById(starid)
  // console.log(staridd.childElementCount + ' ' + starid + ' ' + starCount);
  const starOnWeb = document.getElementById(starid).childElementCount;
  for (let i = starOnWeb; i < 5; i++) {
    const noStar = document.createElement("div");
    noStar.innerHTML = `
    <i class="fas fa-star notStarred"></i>
    `
    document.getElementById(starid).appendChild(noStar);
  }
  // ratingCountShow(count)
  const countOnWeb = document.createElement("div")
  countOnWeb.innerHTML = `
  <div> 
    <p class="ms-1"> ${rateAvarage} (${rateTotal})</p>
  </div>
  
  `
  document.getElementById(starid).appendChild(countOnWeb);
}
let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);
  updateTaxAndCharge();
  updateTotal();
  document.getElementById("total-Products").innerText = count;
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = total.toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = value.toFixed(2);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};

// resetting value to 0 when clicking buy button
function resetValue() {
  console.log("hi");
}

loadProducts();