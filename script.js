// ===========================
// Navigation
// ===========================

// Mobile navigation toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a nav link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Add active class to nav links based on scroll position
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Add shadow to navbar on scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===========================
// Profile Image Loading
// ===========================

const profileImage = document.querySelector('.profile-image');
const profilePlaceholder = document.querySelector('.profile-image-placeholder');

if (profileImage) {
    profileImage.addEventListener('load', () => {
        profileImage.classList.add('loaded');
    });

    // Check if image is already loaded (cached)
    if (profileImage.complete) {
        profileImage.classList.add('loaded');
    }

    // Handle error - keep placeholder visible
    profileImage.addEventListener('error', () => {
        profileImage.style.display = 'none';
        if (profilePlaceholder) {
            profilePlaceholder.style.display = 'flex';
        }
    });
}

// ===========================
// Scroll to Top Button
// ===========================

const scrollToTopBtn = document.getElementById('scrollToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===========================
// Smooth Scrolling for Anchor Links
// ===========================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const navbarHeight = navbar.offsetHeight;
            const targetPosition = target.offsetTop - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===========================
// Animation on Scroll
// ===========================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
const animateOnScroll = document.querySelectorAll(
    '.about-card, .publication-item, .exp-item, .award-item, .project-card, .teaching-section, .contact-item, .reference-item'
);

animateOnScroll.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ===========================
// Copy Email to Clipboard
// ===========================

const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
emailLinks.forEach(link => {
    link.addEventListener('dblclick', (e) => {
        e.preventDefault();
        const email = link.getAttribute('href').replace('mailto:', '');
        
        navigator.clipboard.writeText(email).then(() => {
            // Create tooltip
            const tooltip = document.createElement('span');
            tooltip.textContent = 'Email copied!';
            tooltip.style.cssText = `
                position: absolute;
                background: #10b981;
                color: white;
                padding: 5px 10px;
                border-radius: 5px;
                font-size: 12px;
                z-index: 1000;
                pointer-events: none;
                animation: fadeIn 0.3s ease;
            `;
            
            link.parentElement.style.position = 'relative';
            link.parentElement.appendChild(tooltip);
            
            setTimeout(() => {
                tooltip.remove();
            }, 2000);
        });
    });
});

// ===========================
// Dynamic Year in Footer
// ===========================

const updateFooterYear = () => {
    const year = new Date().getFullYear();
    const footerText = document.querySelector('.footer p');
    if (footerText && footerText.textContent.includes('2026')) {
        footerText.textContent = footerText.textContent.replace('2026', year);
    }
};

updateFooterYear();

// ===========================
// Loading Animation
// ===========================

window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ===========================
// Publication Link Analytics (Optional)
// ===========================

const publicationLinks = document.querySelectorAll('.pub-link');
publicationLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const linkType = link.textContent.trim();
        const publicationTitle = link.closest('.publication-item').querySelector('.pub-title').textContent;
        console.log(`Clicked: ${linkType} - ${publicationTitle}`);
        // You can add Google Analytics or other tracking here
    });
});

// ===========================
// Project Card Hover Effect
// ===========================

const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.borderLeft = '4px solid var(--primary-color)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.borderLeft = 'none';
    });
});

// ===========================
// Search Functionality (Optional Enhancement)
// ===========================

// You can add a search bar to filter publications or projects
function createSearchBar() {
    // This is a placeholder for future enhancement
    // You can implement a search functionality for publications/projects
}

// ===========================
// Dark Mode Toggle (Optional Enhancement)
// ===========================

function setupDarkMode() {
    // Check for saved dark mode preference
    const darkModePreference = localStorage.getItem('darkMode');
    
    if (darkModePreference === 'enabled') {
        document.body.classList.add('dark-mode');
    }
    
    // You can add a toggle button and implement dark mode styles
}

// ===========================
// Print CV Functionality
// ===========================

function printCV() {
    window.print();
}

// Add keyboard shortcut for print (Ctrl+P or Cmd+P is default, but you can customize)
document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
        // Custom print logic can go here
        // e.preventDefault();
        // printCV();
    }
});

// ===========================
// Lazy Loading Images (if you add images later)
// ===========================

const lazyLoadImages = () => {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
};

// Call lazy load if needed
// lazyLoadImages();

// ===========================
// Performance Optimization
// ===========================

// Debounce function for scroll events
function debounce(func, wait = 10, immediate = true) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Apply debounce to scroll events if needed
// const debouncedScroll = debounce(() => {
//     // Your scroll logic here
// });
// window.addEventListener('scroll', debouncedScroll);

// ===========================
// Console Message
// ===========================

console.log('%c👋 Welcome to Alireza Maleki\'s Personal Website!', 'color: #2563eb; font-size: 16px; font-weight: bold;');
console.log('%cInterested in the code? Check it out on GitHub!', 'color: #6b7280; font-size: 12px;');
console.log('%chttps://github.com/allirezamaleki', 'color: #2563eb; font-size: 12px;');

// ===========================
// Export functions if using modules
// ===========================

// export { printCV, setupDarkMode, lazyLoadImages };
