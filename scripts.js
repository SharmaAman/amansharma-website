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


// Smooth page transitions
document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault(); // Prevent default link behavior
            const targetPage = link.getAttribute('href');

            // Add fade-out class to the body
            document.body.classList.add('fade-out');

            // Wait for the fade-out animation to complete, then navigate
            setTimeout(() => {
                window.location.href = targetPage;
            }, 500); // Match the duration of the fade-out animation
        });
    });
});