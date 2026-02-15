const mainDiv = document.getElementsByTagName("main")[0];

async function getCategories() {
  const categoriesDiv = document.createElement("div");
  categoriesDiv.className = "container mx-auto my-6 flex gap-4 flex-wrap w-fit";
  const active =
    "px-5 py-2 rounded-full bg-indigo-600 text-white text-sm font-medium shadow-md";
  const inactive =
    "px-5 py-2 rounded-full bg-gray-100 text-gray-700 text-sm font-medium border border-indigo-600 hover:bg-indigo-50 hover:text-white cursor-pointer capitalize hover:bg-indigo-600 transition";
  mainDiv.appendChild(categoriesDiv);
  const allBtn = createCategoryBtn("All", active);
  categoriesDiv.append(allBtn);
  const categories = await fetchData(
    "https://fakestoreapi.com/products/categories",
  );
  categories.forEach((category) => {
    const btn = createCategoryBtn(category, inactive);
    categoriesDiv.append(btn);
  });
}

function createCategoryBtn(category, status) {
  const categoryBtn = document.createElement("button");
  categoryBtn.className = status;
  categoryBtn.setAttribute("id", category);
  categoryBtn.innerText = category;
  return categoryBtn;
}

async function getProducts() {
  const productDiv = document.createElement("div");
  productDiv.className =
    "container mx-auto my-6 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4";
  mainDiv.appendChild(productDiv);
  const products = await fetchData("https://fakestoreapi.com/products");
  products.forEach((product) => {
    const card = createProductCard(product);
    productDiv.appendChild(card);
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
        class="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg py-2 transition flex items-center justify-center text-sm font-medium gap-2 shadow-md"
      >
        <i class="fa-solid fa-cart-shopping"></i>
        Add
      </button>
    </div>
  `;
  return productCard;
}

async function fetchData(url) {
  const res = await fetch(url);
  return res.json();
}

getCategories();
getProducts();
