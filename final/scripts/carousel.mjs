const slidesContainer = document.querySelector('#carousel-slides');
const dotsContainer = document.querySelector('#carousel-dots');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

let currentIndex = 0;
let totalSlides = 0;
let autoSlideInterval;

// ===============================
// LOAD DATA + BUILD CAROUSEL
// ===============================
async function loadCarousel() {
    try {
        const response = await fetch('data/media.json');

        if (!response.ok) {
            throw new Error('Failed to fetch media data');
        }

        const data = await response.json();

        // Filter only films (array method requirement)
        const films = data
            .filter(item => item.type === "Film")
            .slice(0, 5);

        buildSlides(films);
        initializeCarousel(films.length);

    } catch (error) {
        console.error('Carousel loading error:', error);
    }
}

// ===============================
// CREATE SLIDES + DOTS
// ===============================
function buildSlides(films) {

    films.forEach((film, index) => {

        // Create slide
        const slide = document.createElement('div');
        slide.classList.add('carousel-slide');

        slide.innerHTML = `
            <img src="${film.image}"
                 alt="${film.title} movie poster"
                 loading="lazy"
                 width="1200"
                 height="600">
        `;

        slidesContainer.appendChild(slide);

        // Create dot
        const dot = document.createElement('button');
        dot.setAttribute('aria-label', `Go to slide ${index + 1}`);

        if (index === 0) dot.classList.add('active');

        dot.addEventListener('click', () => {
            currentIndex = index;
            updateCarousel();
            resetAutoSlide();
        });

        dotsContainer.appendChild(dot);
    });
}

// ===============================
// INITIALIZE CONTROLS
// ===============================
function initializeCarousel(count) {

    totalSlides = count;

    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoSlide();
    });

    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoSlide();
    });

    // Pause on hover (UX improvement)
    slidesContainer.addEventListener('mouseenter', stopAutoSlide);
    slidesContainer.addEventListener('mouseleave', startAutoSlide);

    startAutoSlide();
}

// ===============================
// SLIDE LOGIC
// ===============================
function updateCarousel() {

    slidesContainer.style.transform =
        `translateX(-${currentIndex * 100}%)`;

    const dots = document.querySelectorAll('.carousel-dots button');

    dots.forEach(dot => dot.classList.remove('active'));
    dots[currentIndex].classList.add('active');
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateCarousel();
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateCarousel();
}

// ===============================
// AUTO SLIDE
// ===============================
function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 5000);
}

function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}

function resetAutoSlide() {
    stopAutoSlide();
    startAutoSlide();
}

// ===============================
loadCarousel();
