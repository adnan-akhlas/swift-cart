import {
  fetchData,
  generateProductCard,
  generateProductSkeleton,
  showModalListener,
} from "./utils.js";

const trendingDiv = document.getElementById("trending-section")

async function getTrendingProducts() {
  for (let i = 1; i <= 3; i++) {
    const card = document.createElement("div");
    const content = generateProductSkeleton();
    card.innerHTML = content;
    trendingDiv.append(card);
  }
  const products = await fetchData("https://fakestoreapi.com/products");

  trendingDiv.innerHTML = "";
  const trendingProducts = products
    .sort((product1, product2) => product2.rating.rate - product1.rating.rate)
    .splice(0, 3);
  trendingProducts.forEach((product) => {
    const card = generateProductCard(product);
    card.children[4].children[0].addEventListener("click", () =>
      showModalListener(product),
    );
    trendingDiv.appendChild(card);
  });
}

getTrendingProducts();
