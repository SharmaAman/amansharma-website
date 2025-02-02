// Lightbox functionality
function openLightbox(imgElement) {
    const lightbox = document.querySelector('.lightbox');
    const lightboxImg = lightbox.querySelector('img');
    lightboxImg.src = imgElement.src;
    lightbox.classList.add('active');
}

function closeLightbox() {
    document.querySelector('.lightbox').classList.remove('active');
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



