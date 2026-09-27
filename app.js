```javascript
/* =========================
   GIFT HUB JAVASCRIPT
========================= */

let cart = [];


// =========================
// ADD TO CART
// =========================

function addToCart(name, price) {

  cart.push({
    name: name,
    price: price
  });

  updateCart();

  alert(name + " has been added to your cart!");
}


// =========================
// UPDATE CART
// =========================

function updateCart() {

  const cartCount = document.getElementById("cartCount");

  const cartItems = document.getElementById("cartItems");

  const cartTotal = document.getElementById("cartTotal");


  cartCount.textContent = cart.length;


  if (cart.length === 0) {

    cartItems.innerHTML = "<p>Your cart is empty.</p>";

    cartTotal.textContent = "0";

    return;
  }


  let total = 0;

  let html = "";


  cart.forEach((item, index) => {

    total += item.price;

    html += `
      <div class="cart-item">

        <div>
          <strong>${item.name}</strong>
          <br>
          KSh ${item.price.toLocaleString()}
        </div>

        <button
          class="remove-btn"
          onclick="removeFromCart(${index})"
        >
          Remove
        </button>

      </div>
    `;

  });


  cartItems.innerHTML = html;

  cartTotal.textContent = total.toLocaleString();
}


// =========================
// REMOVE FROM CART
// =========================

function removeFromCart(index) {

  cart.splice(index, 1);

  updateCart();
}


// =========================
// OPEN CART
// =========================

function openCart() {

  document.getElementById("cartModal").style.display = "flex";

  updateCart();
}


// =========================
// CLOSE CART
// =========================

function closeCart() {

  document.getElementById("cartModal").style.display = "none";
}


// =========================
// CHECKOUT
// =========================

function checkout() {

  if (cart.length === 0) {

    alert("Your cart is empty.");

    return;
  }


  let total = cart.reduce(
    (sum, item) => sum + item.price,
    0
  );


  alert(
    "Checkout is ready!\n\n" +
    "Total: KSh " +
    total.toLocaleString() +
    "\n\n" +
    "Payment integration can be connected next."
  );
}


// =========================
// SEARCH PRODUCTS
// =========================

function searchProducts() {

  const search =
    document
      .getElementById("searchInput")
      .value
      .toLowerCase();


  const products =
    document.querySelectorAll(".product-card");


  products.forEach(product => {

    const text =
      product.textContent.toLowerCase();


    if (text.includes(search)) {

      product.style.display = "";

    } else {

      product.style.display = "none";

    }

  });

}


// =========================
// CATEGORY FILTER
// =========================

function filterProducts() {

  const category =
    document.getElementById("categoryFilter").value;


  const products =
    document.querySelectorAll(".product-card");


  products.forEach(product => {

    const productCategory =
      product.getAttribute("data-category");


    if (
      category === "all" ||
      productCategory === category
    ) {

      product.style.display = "";

    } else {

      product.style.display = "none";

    }

  });

}


// =========================
// JOB MESSAGE
// =========================

function showJobMessage(job) {

  alert(
    "You selected: " +
    job +
    "\n\n" +
    "This section can later be connected to real job listings."
  );

}


// =========================
// SOCIAL MEDIA
// =========================

function socialMessage(platform) {

  alert(
    platform +
    " link will be connected here when your official page is ready."
  );

}


// =========================
// CLOSE MODAL WHEN CLICKING
// OUTSIDE THE CART
// =========================

window.addEventListener("click", function(event) {

  const modal =
    document.getElementById("cartModal");


  if (event.target === modal) {

    closeCart();

  }

});


// =========================
// START
// =========================

updateCart();

console.log("Gift Hub website loaded successfully.");
```
