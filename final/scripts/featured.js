const featuredGrid = document.getElementById("featuredGrid");

async function loadFeatured() {
  try {
    const response = await fetch("data/media.json");
    const mediaItems = await response.json();

    const featuredItems = mediaItems.filter(item => item.featured === true);

    featuredGrid.innerHTML = featuredItems.map(item => `
        
      <div class="featured-card">
        <img src="${item.image}" alt="${item.title}">
        <div class="featured-content">
          <h3>${item.title}</h3>
          <p>${item.description}</p>
          <div class="featured-meta">
            ${item.creator} • ${item.year}
          </div>
          <button class="details-btn">View Details</button>
        </div>
      </div>
    `).join("");

  } catch (error) {
    console.error("Error loading featured media:", error);
  }
}

loadFeatured();
