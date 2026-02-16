const trendingDiv = document.getElementById("trending-section");
const productSkeletonCard = `
  <div class="bg-white rounded-2xl shadow-sm p-4 animate-pulse">

    <div class="bg-gray-200 rounded-xl h-64 w-full"></div>

    <div class="flex items-center justify-between mt-4">
      <div class="h-6 w-24 bg-gray-200 rounded-full"></div>
      <div class="h-5 w-16 bg-gray-200 rounded-md"></div>
    </div>

    <div class="mt-4 space-y-2">
      <div class="h-4 bg-gray-200 rounded w-3/4"></div>
      <div class="h-4 bg-gray-200 rounded w-1/2"></div>
    </div>

    <div class="h-6 bg-gray-200 rounded w-24 mt-4"></div>

    <div class="flex gap-3 mt-5">
      <div class="flex-1 h-10 bg-gray-200 rounded-lg"></div>
      <div class="flex-1 h-10 bg-gray-200 rounded-lg"></div>
    </div>

  </div>
  `;

async function getTrendingProducts() {
  for (let i = 1; i <= 3; i++) {
    const card = document.createElement("div");
    card.innerHTML = productSkeletonCard;
    trendingDiv.appendChild(card);
  }
  const products = await fetchData("https://fakestoreapi.com/products");

  trendingDiv.innerHTML = "";
  const trendingProducts = products
    .sort((product1, product2) => product2.rating.rate - product1.rating.rate)
    .splice(0, 3);
  trendingProducts.forEach((product) => {
    const card = createProductCard(product);
    trendingDiv.appendChild(card);
    console.log("Done");
  });
}

function createProductCard(product) {
  const productCard = document.createElement("div");
  productCard.className =
    "bg-white rounded-2xl shadow-sm hover:shadow-md transition p-4";
  productCard.setAttribute("id", product.id);
  productCard.innerHTML = `
    <!-- Product Image -->
    <div class="bg-gray-100 rounded-xl p-6 flex items-center justify-center">
      <img
        src="${product.image}"
        alt="Product"
        class="h-56 object-contain"
      />
    </div>

    <!-- Category + Rating -->
    <div class="flex items-center justify-between mt-4">
      <span
        class="bg-indigo-100 capitalize text-indigo-600 text-xs font-semibold px-3 py-1 rounded-full"
      >
        ${product.category}
      </span>

      <div class="flex items-center text-sm text-gray-600">
        <i class="fa-solid fa-star text-yellow-400 mr-1"></i>
        <span>${product.rating.rate} (${product.rating.count})</span>
      </div>
    </div>

    <!-- Title -->
    <h3 class="mt-3 font-semibold text-gray-800 truncate">
      ${product.title}
    </h3>

    <!-- Price -->
    <p class="text-xl font-bold text-gray-900 mt-2">$${product.price}</p>

    <!-- Buttons -->
    <div class="flex gap-3 mt-4">
      <button
        class="flex-1 border border-gray-300 rounded-lg py-2 text-gray-700 hover:bg-gray-100 transition cursor-pointer flex items-center text-sm font-medium justify-center gap-2"
      >
        <i class="fa-regular fa-eye"></i>
        Details
      </button>

      <button
        class="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg py-2 transition flex items-center cursor-pointer justify-center text-sm font-medium gap-2 shadow-md"
      >
        <i class="fa-solid fa-cart-shopping"></i>
        Add
      </button>
    </div>
  `;
  return productCard;
}

async function fetchData(url, time = 3000) {
  await new Promise((resolve) => setTimeout(resolve, time));
  const res = await fetch(url);
  return res.json();
}
getTrendingProducts();
