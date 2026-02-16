const favoritesGrid = document.getElementById("favoritesGrid");
const favoritesCount = document.getElementById("favoritesCount");

let allMedia = [];
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

async function loadFavorites() {
  try {
    const response = await fetch("data/media.json");
    allMedia = await response.json();

    const favoriteItems = allMedia.filter(item =>
      favorites.includes(item.id)
    );

    displayFavorites(favoriteItems);

  } catch (error) {
    console.error("Error loading favorites:", error);
  }
}

function displayFavorites(items) {

  favoritesCount.textContent = `${items.length} item(s) saved`;

  if (items.length === 0) {
    favoritesGrid.innerHTML = `
      <div class="empty-state">
        <h2>No favorites yet</h2>
        <p>Start adding media from the library.</p>
        <a href="discover.html">Browse Library →</a>
      </div>
    `;
    return;
  }

  favoritesGrid.innerHTML = items.map(item => `
    <div class="library-card">
      <img src="${item.image}" alt="${item.title}">
      <div class="library-content-card">
        <h3>${item.title}</h3>
        <div class="library-meta">
          ${item.category} • ${item.year}
        </div>
        <p>${item.description}</p>

        <button class="favorite-btn saved" 
          onclick="removeFavorite(${item.id})">
          Remove from Favorites
        </button>
      </div>
    </div>
  `).join("");
}

function removeFavorite(id) {
  favorites = favorites.filter(fav => fav !== id);
  localStorage.setItem("favorites", JSON.stringify(favorites));
  loadFavorites();
}

loadFavorites();
