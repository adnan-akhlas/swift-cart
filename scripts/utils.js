let cartItems = JSON.parse(localStorage.getItem("cart-items")) || [];
const mobileNav = document.getElementById("mobile-nav");
const closeMenuBtn = document.getElementById("close-menu-btn");
const openMenuBtn = document.getElementById("open-menu-btn");
const modal = document.getElementById("modal");
const modalContent = document.getElementById("modal-content");
const closeModalBtn = document.getElementById("close-modal-btn");
const totalCartItemsBadge = document.getElementById("total-cart-items");
const showCartBtn = document.getElementById("show-cart-btn");

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
          <div class="grid md:grid-cols-2 gap-10 items-center bg-white p-8 rounded-2xl shadow-sm max-w-6xl w-full">
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
  const addToCardBtn = productCard.children[4].children[1];
  addToCardBtn.addEventListener("click", (e) => addToCart(e, product));
  return productCard;
}

export function generateCartTable() {
  const content = `<div class="overflow-hidden px-6 py-14 rounded-xl border border-gray-200 shadow-sm">
  <table class="min-w-full divide-y divide-gray-200 bg-white text-left">
    <thead class="bg-gray-50">
      <tr>
        <th class="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">Product</th>
        <th class="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">Category</th>
        <th class="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">Rating</th>
        <th class="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">Price</th>
        <th class="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">Actions</th>
      </tr>
    </thead>

    <tbody id="cart-table-body" class="divide-y divide-gray-200">
      
    </tbody>
  </table>
</div>`;
  return content;
}

export function generateCartTableRow(product) {
  const content = `<td class="whitespace-nowrap px-6 py-4">
          <div class="flex items-center gap-4">
            <div class="h-12 w-12 flex-shrink-0 rounded-lg bg-gray-100 p-1 flex items-center justify-center">
              <img src="${product.image}" alt="" class="h-full object-contain" />
            </div>
            <div class="max-w-[200px] truncate font-medium text-gray-900">
              ${product.title}
            </div>
          </div>
        </td>

        <td class="whitespace-nowrap px-6 py-4">
          <span class="inline-flex items-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-bold capitalize text-indigo-600">
            ${product.category}
          </span>
        </td>

        <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
          <div class="flex items-center">
            <i class="fa-solid fa-star mr-1 text-yellow-400"></i>
            <span class="font-semibold text-gray-800">${product.rating.rate}</span>
            <span class="ml-1 text-gray-400">(${product.rating.count})</span>
          </div>
        </td>

        <td class="whitespace-nowrap px-6 py-4">
          <span class="text-lg font-bold text-gray-900">$${product.price}</span>
        </td>

        <td class="whitespace-nowrap px-6 py-4 text-right">
          <div class="flex justify-end gap-2">
            <button class="flex items-center gap-1 rounded-md border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 transition cursor-pointer">
              <i class="fa-solid fa-trash"></i>
              Remove
            </button>
          </div>
        </td>`;
  const tr = document.createElement("tr");
  tr.className = "hover:bg-gray-50 transition-colors";
  tr.innerHTML = content;
  return tr;
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

export function generateSuccessSync(time) {
  const content = `<div
  class="bg-white rounded-xl shadow-xl p-8 max-w-sm w-full text-center flex flex-col items-center space-y-4"
>
  <!-- Success Icon -->
  <svg
    class="w-16 h-16 text-indigo-600"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    viewBox="0 0 24 24"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M5 13l4 4L19 7"
    ></path>
  </svg>

  <!-- Title -->
  <h2 class="text-2xl font-bold text-gray-800">Data Synced!</h2>

  <!-- Description -->
  <p class="text-gray-600">Your data has been successfully synchronized.</p>

  <!-- Countdown Text -->
  <p class="text-indigo-600 font-semibold">
    Closing in <span id="timerText">${time}</span> second${time > 1 ? "s" : ""}...
  </p>
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

export function closeModalOverlay(e) {
  if (e.target === modal) {
    document.body.classList.remove("overflow-hidden");
    modal.close();
  }
}

export function addToCart({ currentTarget }, product) {
  const itemIsAvailable = cartItems.find((item) => item.id === product.id);
  if (itemIsAvailable) return;
  cartItems.push(product);
  localStorage.setItem("cart-items", JSON.stringify(cartItems));
  totalCartItemsBadge.innerHTML = cartItems.length;
  totalCartItemsBadge.classList.remove("hidden");
  currentTarget.className =
    "flex-1 bg-gray-200 text-slate-900 rounded-lg py-2 transition flex items-center cursor-pointer justify-center text-sm font-medium gap-2 shadow-md disabled:cursor-not-allowed";
  currentTarget.setAttribute("disabled", true);
}

export function removeFromCart(id) {
  const findProduct = cartItems.find((item) => item.id === id);
  const product = document.getElementById(findProduct.id);
  const productBtn = product.children[4].children[1];
  productBtn.className =
    "flex-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg py-2 transition flex items-center cursor-pointer justify-center text-sm font-medium gap-2 shadow-md";
  productBtn.removeAttribute("disabled");

  const filterData = cartItems.filter((item) => item.id !== id);
  cartItems = filterData;
  localStorage.setItem("cart-items", JSON.stringify(filterData));
  totalCartItemsBadge.innerHTML = cartItems.length;
  showCart();
}

export function showCart() {
  if (cartItems.length === 0) {
    totalCartItemsBadge.classList.add("hidden");
    closeModal();
    return;
  }
  const table = generateCartTable();
  modalContent.innerHTML = table;
  const tableBody = modalContent.children[0].children[0].children[1];
  cartItems.forEach((item) => {
    const cartProduct = generateCartTableRow(item);
    const removeBtn = cartProduct.children[4].children[0].children[0];
    removeBtn.addEventListener("click", () => removeFromCart(item.id));
    tableBody.append(cartProduct);
  });
  document.body.classList.add("overflow-hidden");
  modal.classList.add("w-fit");
  modal.showModal();
}

closeMenuBtn.addEventListener("click", closeMenu);
openMenuBtn.addEventListener("click", openMenu);

closeModalBtn.addEventListener("click", closeModal);
modal.addEventListener("click", closeModalOverlay);

showCartBtn.addEventListener("click", showCart);

function syncData() {
  let time = 3;
  if (!cartItems.length) return;
  cartItems.forEach((element) => {
    const card = document.getElementById(element.id);
    const cartBtn = card?.children[4]?.children[1];

    if (cartBtn) {
      cartBtn.className =
        "flex-1 bg-gray-200 text-slate-900 rounded-lg py-2 transition flex items-center cursor-not-allowed justify-center text-sm font-medium gap-2 shadow-md";
      cartBtn.setAttribute("disabled", true);
    }
  });

  totalCartItemsBadge.innerHTML = cartItems.length;
  totalCartItemsBadge.classList.remove("hidden");

  modalContent.innerHTML = generateSuccessSync(time);
  document.body.classList.add("overflow-hidden");
  modal.classList.remove("w-full");
  modal.classList.add("w-fit");
  modal.showModal();

  const timer = setInterval(() => {
    time--;
    if (time >= 0) {
      modalContent.innerHTML = generateSuccessSync(time);
    } else {
      modal.classList.remove("w-fit");
      modal.classList.add("w-full");

      closeModal();
      clearInterval(timer);
    }
  }, 1000);
}

setTimeout(syncData, 3000);
