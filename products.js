const mainDiv = document.getElementsByTagName("main")[0];
const productDiv = document.createElement("div");
productDiv.className =
  "container mx-auto my-6 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4";
const categoriesDiv = document.createElement("div");
categoriesDiv.className = "container mx-auto my-6 flex gap-4 flex-wrap w-fit";
mainDiv.append(categoriesDiv, productDiv);
const active =
  "px-5 py-2 rounded-full capitalize bg-indigo-600 text-white text-sm font-medium shadow-md";
const inactive =
  "px-5 py-2 rounded-full bg-gray-100 text-gray-700 text-sm font-medium border border-indigo-600 hover:bg-indigo-50 hover:text-white cursor-pointer capitalize hover:bg-indigo-600 transition";

const productSkeletonCard = `
  <div class="w-80 bg-white rounded-2xl shadow-sm p-4 animate-pulse">

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

const buttonSkeleton = `<div class="h-10 w-32 bg-gray-200 rounded-full animate-pulse"></div>`;

async function getCategories() {
  categoriesDiv.innerHTML = "";
  for (let i = 1; i <= 5; i++) {
    const card = document.createElement("div");
    card.innerHTML = buttonSkeleton;
    categoriesDiv.appendChild(card);
  }
  const categories = await fetchData(
    "https://fakestoreapi.com/products/categories",
    2000,
  );
  categoriesDiv.innerHTML = "";
  const allBtn = createCategoryBtn("All", active);
  categoriesDiv.append(allBtn);
  categories.forEach((category) => {
    const btn = createCategoryBtn(category, inactive);
    categoriesDiv.append(btn);
  });
}

function createCategoryBtn(category, status) {
  let url = `https://fakestoreapi.com/products/category/${category}`;
  if (category === "All") url = "https://fakestoreapi.com/products";
  const categoryBtn = document.createElement("button");
  categoryBtn.className = status;
  categoryBtn.setAttribute("id", category);
  categoryBtn.addEventListener("click", (e) => {
    const buttons = e.currentTarget.parentElement.children;
    for (const ele of buttons) {
      if (ele === e.currentTarget) {
        ele.className = active;
      } else {
        ele.className = inactive;
      }
    }
    getProducts(url, true);
  });
  categoryBtn.innerText = category;
  return categoryBtn;
}

async function getProducts(url, reset = false) {
  productDiv.innerHTML = "";
  for (let i = 1; i <= 8; i++) {
    const card = document.createElement("div");
    card.innerHTML = productSkeletonCard;
    productDiv.appendChild(card);
  }
  const products = await fetchData(url, 2000);
  productDiv.innerHTML = "";
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

getCategories();
getProducts("https://fakestoreapi.com/products");
