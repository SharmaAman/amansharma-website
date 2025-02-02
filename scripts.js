// Lightbox functionality
let currentImageIndex = 0;
let images = [];

function openLightbox(imgElement) {
    const lightbox = document.querySelector('.lightbox');
    const lightboxImg = lightbox.querySelector('img');
    lightboxImg.src = imgElement.src;
    lightbox.classList.add('active');

    // Prevent background scrolling
    document.body.style.overflow = 'hidden';

    // Get all images in the grid
    images = Array.from(document.querySelectorAll('.photo-grid img'));
    currentImageIndex = images.indexOf(imgElement);

    // Add touch event listeners
    lightbox.addEventListener('touchstart', handleTouchStart, false);
    lightbox.addEventListener('touchmove', handleTouchMove, false);
}

function closeLightbox() {
    const lightbox = document.querySelector('.lightbox');
    lightbox.classList.remove('active');

    // Restore background scrolling
    document.body.style.overflow = 'auto';

    // Remove touch event listeners
    lightbox.removeEventListener('touchstart', handleTouchStart, false);
    lightbox.removeEventListener('touchmove', handleTouchMove, false);
}

let xDown = null;
let yDown = null;

function handleTouchStart(event) {
    const firstTouch = event.touches[0];
    xDown = firstTouch.clientX;
    yDown = firstTouch.clientY;
}

function handleTouchMove(event) {
    if (!xDown || !yDown) {
        return;
    }

    const xUp = event.touches[0].clientX;
    const yUp = event.touches[0].clientY;

    const xDiff = xDown - xUp;
    const yDiff = yDown - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
        // Horizontal swipe
        if (xDiff > 0) {
            // Swipe left
            showNextImage();
        } else {
            // Swipe right
            showPreviousImage();
        }
    } else {
        // Vertical swipe
        if (yDiff > 0) {
            // Swipe up
            closeLightbox();
        } else {
            // Swipe down
            closeLightbox();
        }
    }

    // Reset values
    xDown = null;
    yDown = null;
}https://i.postimg.cc/V6Ny47Mg/DSCF0033.jpg

function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    const lightboxImg = document.querySelector('.lightbox img');
    lightboxImg.src = images[currentImageIndex].src;
}

function showPreviousImage() {
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    const lightboxImg = document.querySelector('.lightbox img');
    lightboxImg.src = images[currentImageIndex].src;
}

// Close lightbox on ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
});

// Scroll animations

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.style.opacity = 1;

            entry.target.style.transform = 'translateY(0)';

        }

    });

});

document.querySelectorAll('.content-section').forEach((el) => {
    el.style.opacity = 0;
    el.style.transform = 'translateY(20px)';
    observer.observe(el);
});

// Function to handle the sliding underline effect
function handleNavLinkClick(event) {
    const navLinks = document.querySelectorAll('.nav-link');
    const targetLink = event.currentTarget;

    // Remove the active class from all links
    navLinks.forEach(link => {
        link.classList.remove('active');
    });

    // Add the active class to the clicked link
    targetLink.classList.add('active');
}

// Add event listeners to navigation links
document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', handleNavLinkClick);
    });

    // Highlight the current page on load
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href').split('/').pop();
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });
});

// Function to load content dynamically
function loadContent(url) {
    fetch(url)
        .then(response => response.text())
        .then(html => {
            // Extract the content from the fetched page
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const newContent = doc.querySelector('main').innerHTML;

            // Update the content area
            document.querySelector('main').innerHTML = newContent;

            // Update the active link in the navigation bar
            updateActiveLink(url);
        })
        .catch(error => console.error('Error loading content:', error));
}

// Function to update the active link in the navigation bar
function updateActiveLink(url) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href').split('/').pop();
        const currentPage = url.split('/').pop();
        if (linkPage === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Add event listeners to navigation links
document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault(); // Prevent default link behavior
            const targetPage = link.getAttribute('href');

            // Update the browser history
            history.pushState(null, '', targetPage);

            // Load the new content
            loadContent(targetPage);
        });
    });

    // Handle back/forward navigation
    window.addEventListener('popstate', function () {
        loadContent(window.location.pathname);
    });

    // Highlight the current page on load
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    updateActiveLink(currentPage);
});



// Lazy load images
document.addEventListener('DOMContentLoaded', function () {
    const lazyImages = document.querySelectorAll('.lazy-load');

    const lazyLoad = (image) => {
        const src = image.getAttribute('data-src');
        if (!src) return;

        // Load the image
        image.src = src;
        image.classList.add('loaded'); // Add a class to indicate the image is loaded
        image.removeAttribute('data-src'); // Remove the data-src attribute
    };

    const lazyImageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                lazyLoad(entry.target);
                observer.unobserve(entry.target); // Stop observing once the image is loaded
            }
        });
    }, {
        rootMargin: '0px 0px 200px 0px', // Load images 200px before they enter the viewport
    });

    lazyImages.forEach((image) => {
        lazyImageObserver.observe(image); // Start observing each lazy-loaded image
    });
});