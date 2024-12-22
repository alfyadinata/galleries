let imagesData = [];

let currentCarouselIndex = 0;

// Initialize gallery
async function initializeGallery() {
    await fetch('images.json').then(response => response.json())
        .then(data => {
            imagesData = data;
        });
    initializeCarousel();
    initializeGalleryGrid();
    initializeAutocomplete();
}

// Autocomplete functionality
function initializeAutocomplete() {
    const searchInput = document.getElementById('searchInput');
    const resultsContainer = document.getElementById('autocomplete-results');
    const resetButton = document.getElementById('resetSearch');
    
    searchInput.addEventListener('input', (e) => {
        const value = e.target.value.toLowerCase();
        resetButton.style.display = value.length > 0 ? 'flex' : 'none';
        
        if (value.length < 1) {
            resultsContainer.style.display = 'none';
            resetSearch();
            return;
        }

        const matches = imagesData.filter(img => 
            img.title.toLowerCase().includes(value)
        ).slice(0, 5);

        displayAutocompleteResults(matches, resultsContainer);
    });

    // Reset search functionality
    resetButton.addEventListener('click', () => {
        searchInput.value = '';
        resetButton.style.display = 'none';
        resultsContainer.style.display = 'none';
        resetSearch();
    });

    // Close autocomplete when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-container')) {
            resultsContainer.style.display = 'none';
        }
    });
}

function resetSearch() {
    const gallery = document.querySelector('.gallery-grid');
    const items = gallery.children;
    
    Array.from(items).forEach(item => {
        item.style.display = 'block';
    });
}

function displayAutocompleteResults(matches, container) {
    if (!matches.length) {
        container.style.display = 'none';
        return;
    }

    container.innerHTML = '';
    container.style.display = 'block';

    matches.forEach(match => {
        const div = document.createElement('div');
        div.className = 'autocomplete-item';
        div.textContent = match.title;
        div.addEventListener('click', () => {
            document.getElementById('searchInput').value = match.title;
            document.getElementById('resetSearch').style.display = 'flex';
            container.style.display = 'none';
            filterGallery(match.title);
        });
        container.appendChild(div);
    });
}

// Carousel functionality
function initializeCarousel() {
    const featuredImages = imagesData.filter(img => img.is_featured);
    const track = document.querySelector('.carousel-track');
    if (!track) return;

    // Clear existing slides
    track.innerHTML = '';
    
    // Add slides
    featuredImages.forEach((image, index) => {
        const slide = document.createElement('div');
        slide.className = 'carousel-slide';
        slide.style.transform = `translateX(${index * 100}%)`;
        slide.innerHTML = `
            <img src="${image.image_url}" alt="${image.title}">
            <div class="image-title">${image.title}</div>
            ${createStarRating(image.rating)}
        `;
        track.appendChild(slide);
    });

    // Add event listeners for carousel navigation
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => moveCarousel(-1, featuredImages.length));
    }
    if (nextBtn) {
        nextBtn.addEventListener('click', () => moveCarousel(1, featuredImages.length));
    }

    // Start auto-rotation if there are multiple images
    if (featuredImages.length > 1) {
        setInterval(() => moveCarousel(1, featuredImages.length), 5000);
    }
}

function moveCarousel(direction, totalSlides) {
    if (totalSlides <= 1) return;

    const track = document.querySelector('.carousel-track');
    const slides = track.children;
    
    currentCarouselIndex = (currentCarouselIndex + direction + totalSlides) % totalSlides;

    // Update slide positions
    Array.from(slides).forEach((slide, index) => {
        slide.style.transform = `translateX(${(index - currentCarouselIndex) * 100}%)`;
    });
}

// Gallery Grid functionality
function initializeGalleryGrid() {
    const gallery = document.querySelector('.gallery-grid');
    
    imagesData.forEach(image => {
        const item = createGalleryItem(image);
        gallery.appendChild(item);
    });
}

function createGalleryItem(image) {
    const item = document.createElement('div');
    item.className = 'gallery-item';
    
    item.innerHTML = `
        <img src="${image.image_url}" alt="${image.title}">
        <div class="image-title">${image.title}</div>
        ${createStarRating(image.rating)}
    `;

    // Add tooltip functionality
    item.addEventListener('mouseenter', (e) => {
        const tooltip = document.querySelector('.tooltip');
        tooltip.innerHTML = `
            <img src="${image.image_url}" alt="${image.title}">
            <div class="tooltip-content">
                <div>${image.title}</div>
                <div>Rating: ${image.rating}/5</div>
            </div>
        `;
        
        const rect = item.getBoundingClientRect();
        tooltip.style.display = 'block';
        
        // Position tooltip to the right of the item
        tooltip.style.top = `${rect.top + window.scrollY}px`;
        tooltip.style.left = `${rect.right + 10}px`;
        
        // If tooltip would go off the right edge of the screen, show it on the left instead
        if (rect.right + tooltip.offsetWidth + 10 > window.innerWidth) {
            tooltip.style.left = `${rect.left - tooltip.offsetWidth - 10}px`;
        }
    });
    
    item.addEventListener('mouseleave', () => {
        document.querySelector('.tooltip').style.display = 'none';
    });

    return item;
}

// Star Rating functionality
function createStarRating(rating) {
    const stars = Array(5).fill('').map((_, index) => 
        `<span class="star">${index < rating ? '★' : '☆'}</span>`
    ).join('');
    
    return `<div class="rating">${stars}</div>`;
}

// Gallery filtering
function filterGallery(searchTerm) {
    const gallery = document.querySelector('.gallery-grid');
    const items = gallery.children;
    
    Array.from(items).forEach(item => {
        const title = item.querySelector('.image-title').textContent.toLowerCase();
        item.style.display = title.includes(searchTerm.toLowerCase()) ? 'block' : 'none';
    });
}

// Initialize the gallery when the page loads
document.addEventListener('DOMContentLoaded', initializeGallery);
