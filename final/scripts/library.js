const libraryGrid = document.getElementById("libraryGrid");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const gridBtn = document.getElementById("gridView");
const listBtn = document.getElementById("listView");

const modal = document.getElementById("mediaModal");
const modalBody = document.getElementById("modalBody");
const closeModal = document.getElementById("closeModal");

let allMedia = [];
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

async function loadLibrary() {
  const response = await fetch("data/media.json");
  allMedia = await response.json();
  displayMedia(allMedia);
}

function displayMedia(media) {
  libraryGrid.innerHTML = media.map(item => `
    <div class="library-card">
      <img src="${item.image}" alt="${item.title}">
      <div class="library-content-card">
        <h3>${item.title}</h3>
        <div class="library-meta">
          ${item.type} • ${item.year} • ⭐ ${item.rating || 4.5}
        </div>
        <p>${item.description}</p>

        <button class="favorite-btn ${favorites.includes(item.id) ? "saved" : ""}" 
          onclick="toggleFavorite(${item.id})">
          ${favorites.includes(item.id) ? "Saved ✓" : "Add to Favorites"}
        </button>

        <button class="favorite-btn" onclick="openModal(${item.id})">
          View Details
        </button>
      </div>
    </div>
  `).join("");
}

function toggleFavorite(id) {
  if (favorites.includes(id)) {
    favorites = favorites.filter(fav => fav !== id);
  } else {
    favorites.push(id);
  }

  localStorage.setItem("favorites", JSON.stringify(favorites));
  displayMedia(allMedia);
}

function openModal(id) {
  const item = allMedia.find(media => media.id === id);

  modalBody.innerHTML = `
    <img src="${item.image}" alt="${item.title}">
    <h2>${item.title}</h2>
    <p><strong>Category:</strong> ${item.type}</p>
    <p><strong>Year:</strong> ${item.year}</p>
    <p><strong>Rating:</strong> ⭐ ${item.rating || 4.5}</p>
    <p>${item.description}</p>
  `;

  modal.classList.remove("hidden");
}

closeModal.addEventListener("click", () => {
  modal.classList.add("hidden");
});

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.add("hidden");
  }
});

function filterMedia() {
  let filtered = allMedia;

  const searchValue = searchInput.value.toLowerCase();
  const categoryValue = categoryFilter.value;

  if (searchValue) {
    filtered = filtered.filter(item =>
      item.title.toLowerCase().includes(searchValue)
    );
  }

  if (categoryValue !== "all") {
    filtered = filtered.filter(item =>
      item.type === categoryValue
    );
  }

  displayMedia(filtered);
}

searchInput.addEventListener("input", filterMedia);
categoryFilter.addEventListener("change", filterMedia);

gridBtn.addEventListener("click", () => {
  libraryGrid.classList.remove("list");
  gridBtn.classList.add("active");
  listBtn.classList.remove("active");
});

listBtn.addEventListener("click", () => {
  libraryGrid.classList.add("list");
  listBtn.classList.add("active");
  gridBtn.classList.remove("active");
});

loadLibrary();

const requestModal = document.getElementById("requestModal");
const openRequestBtn = document.getElementById("openRequestForm");
const closeRequestBtn = document.getElementById("closeRequestModal");

openRequestBtn.addEventListener("click", () => {
  requestModal.classList.remove("hidden");
});

closeRequestBtn.addEventListener("click", () => {
  requestModal.classList.add("hidden");
});

requestModal.addEventListener("click", (e) => {
  if (e.target === requestModal) {
    requestModal.classList.add("hidden");
  }
});

