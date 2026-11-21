const API_URL = "https://dummyjson.com/products?limit=30";
const STORAGE_KEY = "mp3_mp4_saved_product_ids";
const PRICE_MULTIPLIER = 75; // দাম বাড়াতে বা কমাতে এই সংখ্যাটি পরিবর্তন করো

// Application state
const state = {
  products: [],
  savedIds: loadSavedIds(),
  selectedCategory: "all",
  searchQuery: "",
  viewMode: "all" // "all" or "saved"
};

// DOM references
const productsGrid = document.querySelector("#productsGrid");
const categoryFilters = document.querySelector("#categoryFilters");
const searchInput = document.querySelector("#searchInput");
const statusMessage = document.querySelector("#statusMessage");
const savedCountEl = document.querySelector("#savedCount");
const allProductsBtn = document.querySelector("#allProductsBtn");
const savedProductsBtn = document.querySelector("#savedProductsBtn");

// Local Storage helpers (MP4)
function loadSavedIds() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveIdsToStorage(ids) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
}

function updateSavedCount() {
  savedCountEl.textContent = state.savedIds.length;
}

function toggleSavedProduct(productId) {
  const exists = state.savedIds.includes(productId);
  if (exists) {
    state.savedIds = state.savedIds.filter((id) => id !== productId);
  } else {
    state.savedIds = [...state.savedIds, productId];
  }
  saveIdsToStorage(state.savedIds);
  updateSavedCount();
  renderProducts();
}

// Format increased price with ৳ symbol and commas
function formatPrice(price) {
  const increasedPrice = Number(price) * PRICE_MULTIPLIER;
  if (Number.isNaN(increasedPrice)) return "৳0.00";
  return `৳${increasedPrice.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`;
}

// UI state helpers (Loading, Error, Empty)
function showStatus(message, isError = false, showRetry = false) {
  statusMessage.classList.remove("hidden");
  statusMessage.classList.toggle("status-error", isError);
  statusMessage.innerHTML = `
    <p>${message}</p>
    ${showRetry ? '<button id="retryBtn" class="btn btn-active" style="margin-top:12px;">Retry</button>' : ""}
  `;

  const retryBtn = document.querySelector("#retryBtn");
  if (retryBtn) {
    retryBtn.addEventListener("click", fetchProducts);
  }
}

function hideStatus() {
  statusMessage.classList.add("hidden");
  statusMessage.innerHTML = "";
}

// Fetch products from API using async/await (MP4)
async function fetchProducts() {
  showStatus("Loading products from API...", false, false);
  productsGrid.innerHTML = "";

  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }
    const data = await response.json();
    state.products = Array.isArray(data.products) ? data.products : [];

    hideStatus();
    renderCategories();
    renderProducts();
  } catch (error) {
    showStatus(
      `Failed to load products (${error.message}). Please check your internet connection and try again.`,
      true,
      true
    );
  }
}

// Render category filter buttons using Set + map + forEach
function renderCategories() {
  const categories = ["all", ...new Set(state.products.map((item) => item.category))];
  categoryFilters.innerHTML = "";

  categories.forEach((category) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = `cat-btn ${state.selectedCategory === category ? "active" : ""}`;
    btn.textContent = category === "all" ? "All Categories" : category;

    btn.addEventListener("click", () => {
      state.selectedCategory = category;
      renderCategories();
      renderProducts();
    });

    categoryFilters.appendChild(btn);
  });
}

// Filter products by viewMode, category, and search query
function getFilteredProducts() {
  return state.products.filter((product) => {
    const matchesSaved =
      state.viewMode === "all" || state.savedIds.includes(product.id);

    const matchesCategory =
      state.selectedCategory === "all" ||
      product.category === state.selectedCategory;

    const query = state.searchQuery.trim().toLowerCase();
    const titleMatch = product.title.toLowerCase().includes(query);
    const brandMatch = (product.brand || "").toLowerCase().includes(query);
    const matchesSearch = query === "" || titleMatch || brandMatch;

    return matchesSaved && matchesCategory && matchesSearch;
  });
}

// Render product cards dynamically into DOM (MP3)
function renderProducts() {
  const filtered = getFilteredProducts();
  productsGrid.innerHTML = "";

  if (filtered.length === 0) {
    const emptyMsg =
      state.viewMode === "saved"
        ? "No saved products match your current filter."
        : "No products found matching your search or category.";
    showStatus(emptyMsg, false, false);
    return;
  }

  hideStatus();

  filtered.forEach((product) => {
    const isSaved = state.savedIds.includes(product.id);
    const card = document.createElement("article");
    card.className = "card";

    card.innerHTML = `
      <img src="${product.thumbnail}" alt="${product.title}" loading="lazy" />
      <div class="card-body">
        <span class="card-category">${product.category}</span>
        <h2 class="card-title">${product.title}</h2>
        <p class="card-brand">Brand: ${product.brand || "Generic"}</p>
        <div class="card-meta">
          <span class="price">${formatPrice(product.price)}</span>
          <span class="rating">★ ${product.rating}</span>
        </div>
      </div>
      <div class="card-footer">
        <button type="button" class="save-btn ${isSaved ? "saved" : ""}" data-id="${product.id}">
          ${isSaved ? "Saved in LocalStorage ✓" : "Save Product"}
        </button>
      </div>
    `;

    const saveBtn = card.querySelector(".save-btn");
    saveBtn.addEventListener("click", () => {
      const selected = state.products.find((p) => p.id === product.id);
      if (selected) {
        toggleSavedProduct(selected.id);
      }
    });

    productsGrid.appendChild(card);
  });
}

// Event listeners for search & view switching (MP3)
searchInput.addEventListener("input", (event) => {
  state.searchQuery = event.target.value;
  renderProducts();
});

allProductsBtn.addEventListener("click", () => {
  state.viewMode = "all";
  allProductsBtn.classList.add("btn-active");
  savedProductsBtn.classList.remove("btn-active");
  renderProducts();
});

savedProductsBtn.addEventListener("click", () => {
  state.viewMode = "saved";
  savedProductsBtn.classList.add("btn-active");
  allProductsBtn.classList.remove("btn-active");
  renderProducts();
});

// Initialize app
updateSavedCount();
fetchProducts();