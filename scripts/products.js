import {
  fetchData,
  generateButtonSkeleton,
  generateProductCard,
  generateProductSkeleton,
  getButtonClass,
  showModalListener,
} from "./utils.js";

const mainDiv = document.getElementsByTagName("main")[0];

const productDiv = document.createElement("div");
productDiv.className =
  "max-w-7xl mx-auto my-6 grid px-6 grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4";

const categoriesDiv = document.createElement("div");
categoriesDiv.className =
  "max-w-7xl mx-auto my-6 flex px-6 justify-center gap-4 flex-wrap w-fit";
mainDiv.append(categoriesDiv, productDiv);

async function getCategories() {
  categoriesDiv.innerHTML = "";
  for (let i = 1; i <= 5; i++) {
    const card = document.createElement("div");
    card.innerHTML = generateButtonSkeleton();
    categoriesDiv.appendChild(card);
  }
  const categories = await fetchData(
    "https://fakestoreapi.com/products/categories",
    1000,
  );
  categoriesDiv.innerHTML = "";
  const allBtn = generateCategoryBtn("All", getButtonClass("active"));
  categoriesDiv.append(allBtn);
  categories.forEach((category) => {
    const btn = generateCategoryBtn(category, getButtonClass("inactive"));
    categoriesDiv.append(btn);
  });
}

function generateCategoryBtn(category, status) {
  let url = `https://fakestoreapi.com/products/category/${category}`;
  if (category === "All") url = "https://fakestoreapi.com/products";
  const categoryBtn = document.createElement("button");
  categoryBtn.className = status;
  categoryBtn.setAttribute("id", category);
  categoryBtn.addEventListener("click", (e) => {
    const buttons = e.currentTarget.parentElement.children;
    for (const ele of buttons) {
      if (ele === e.currentTarget) {
        ele.className = getButtonClass("active");
      } else {
        ele.className = getButtonClass("inactive");
      }
    }
    getProducts(url, true);
  });
  categoryBtn.innerText = category;
  return categoryBtn;
}

async function getProducts(url) {
  productDiv.innerHTML = "";
  for (let i = 1; i <= 8; i++) {
    const card = document.createElement("div");
    card.innerHTML = generateProductSkeleton();
    productDiv.appendChild(card);
  }
  const products = await fetchData(url, 2000);
  productDiv.innerHTML = "";
  products.forEach((product) => {
    const card = generateProductCard(product);
    card.children[4].children[0].addEventListener("click", () =>
      showModalListener(product),
    );
    productDiv.appendChild(card);
  });
}

getCategories();
getProducts("https://fakestoreapi.com/products");
