const mobileNav = document.getElementById("mobile-nav");
const closeMenuBtn = document.getElementById("close-menu-btn");
const openMenuBtn = document.getElementById("open-menu-btn");
const modal = document.getElementById("modal");
const modalContent = document.getElementById("modal-content");

export async function fetchData(url, time = 1500) {
  await new Promise((resolve) => setTimeout(resolve, time));
  const res = await fetch(url);
  return res.json();
}

export function generateProductSkeleton() {
  const content = `
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
  return content;
}

export function generateButtonSkeleton() {
  const content = `<div class="h-10 w-32 bg-gray-200 rounded-full animate-pulse"></div>`;
  return content;
}

export function generateModalContent(product) {
  const content = `
          <div class="grid md:grid-cols-2 gap-10 items-center bg-white p-8 rounded-2xl shadow-sm">
               <!-- Product Image -->
               <div class="bg-gray-100 rounded-2xl p-10 flex justify-center">
                 <img
                   src="${product.image}"
                   alt="${product.title}"
                   class="max-h-[400px] object-contain"
                 />
               </div>
               <!-- Product Info -->
               <div>
                 <!-- Category -->
                 <span class="bg-indigo-100 text-indigo-600 text-xs font-medium px-3 py-1 rounded-full capitalize">
                   ${product.category}
                 </span>
                 <!-- Title -->
                 <h1 class="text-3xl font-bold text-gray-800 mt-4">
                   ${product.title}
                 </h1>
                 <!-- Rating -->
                 <div class="flex items-center mt-3 text-gray-600">
                   <i class="fa-solid fa-star text-yellow-400 mr-2"></i>
                   <span class="mr-2 font-medium">${product.rating.rate}</span>
                   <span class="text-sm">(${product.rating.count} reviews)</span>
                 </div>
                 <!-- Price -->
                 <p class="text-3xl font-bold text-indigo-600 mt-5">
                   $${product.price}
                 </p>
                 <!-- Description -->
                 <p class="text-gray-600 mt-5 leading-relaxed">
                   ${product.description}
                 </p>
               </div>
             </div>
          `;
  return content;
}

export function generateProductCard(product) {
  const productCard = document.createElement("div");
  productCard.className =
    "bg-white rounded-2xl shadow-sm hover:shadow-md transition p-4";
  productCard.setAttribute("id", product.id);
  productCard.innerHTML = generateProductHTML(product);
  return productCard;
}

export function generateProductHTML(product) {
  const content = `
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
      <h3 class="mt-3 font-semibold text-gray-800 truncate text-left">
        ${product.title}
      </h3>

      <!-- Price -->
      <p class="text-xl font-bold text-gray-900 text-left mt-2">$${product.price}</p>

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
  return content;
}

export function getButtonClass(status) {
  const active =
    "px-5 py-2 rounded-full capitalize bg-indigo-600 text-white text-sm font-medium shadow-md";
  const inactive =
    "px-5 py-2 rounded-full bg-gray-100 text-gray-700 text-sm font-medium border border-indigo-600 hover:bg-indigo-50 hover:text-white cursor-pointer capitalize hover:bg-indigo-600 transition";

  return status === "active" ? active : inactive;
}

export function showModalListener(product) {
  modalContent.innerHTML = generateModalContent(product);
  modal.showModal();
  document.body.classList.add("overflow-hidden");
}

export function closeMenu() {
  mobileNav.classList.remove("top-0");
  mobileNav.classList.add("-top-100");
}

export function openMenu() {
  mobileNav.classList.remove("-top-100");
  mobileNav.classList.add("top-0");
}

export function closeModal() {
  document.body.classList.remove("overflow-hidden");
  modal.close();
}

closeMenuBtn.addEventListener("click", closeMenu);

openMenuBtn.addEventListener("click", openMenu);

modal.children[0].children[0].addEventListener("click", closeModal);
