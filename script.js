// ====================================
// KRISHI MITRA - INTERACTIVE FEATURES
// ====================================

document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initSmoothScroll();
    initScrollAnimations();
    initNavbarScroll();
});

// ====================================
// MOBILE MENU TOGGLE
// ====================================

function initMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navLinks = document.getElementById('navLinks');
    
    if (!mobileMenuToggle || !navLinks) return;
    
    mobileMenuToggle.addEventListener('click', () => {
        mobileMenuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close menu when clicking on a link
    const navLinkItems = navLinks.querySelectorAll('.nav-link');
    navLinkItems.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!mobileMenuToggle.contains(e.target) && !navLinks.contains(e.target)) {
            mobileMenuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
}

// ====================================
// SMOOTH SCROLLING
// ====================================

function initSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-link, .cta-button');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            // Only handle internal links
            if (href && href.startsWith('#')) {
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    e.preventDefault();
                    
                    const navbarHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = targetElement.offsetTop - navbarHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// ====================================
// SCROLL ANIMATIONS
// ====================================

function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: unobserve after animation
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// ====================================
// NAVBAR SCROLL EFFECT
// ====================================

function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add shadow when scrolled
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
}

// ====================================
// ACTIVE NAVIGATION LINK HIGHLIGHTING
// ====================================

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

// Initialize active nav link tracking
updateActiveNavLink();

// ====================================
// PARALLAX EFFECT (SUBTLE)
// ====================================

function initParallax() {
    const heroGradient = document.querySelector('.hero-gradient');
    
    if (!heroGradient) return;
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;
        
        if (scrolled < window.innerHeight) {
            heroGradient.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        }
    });
}

// Initialize parallax if user prefers motion
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    initParallax();
}

// ====================================
// DYNAMIC ANIMATION DELAYS
// ====================================

function setAnimationDelays() {
    const cards = document.querySelectorAll('.feature-card, .benefit-card, .roadmap-item, .team-card');
    
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
}

// Initialize animation delays
setAnimationDelays();

// ====================================
// LOADING ANIMATION
// ====================================

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// ====================================
// ACCESSIBILITY: KEYBOARD NAVIGATION
// ====================================

function initKeyboardNav() {
    const focusableElements = document.querySelectorAll(
        'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
    );
    
    focusableElements.forEach(element => {
        element.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                if (element.tagName === 'A' || element.tagName === 'BUTTON') {
                    element.click();
                }
            }
        });
    });
}

initKeyboardNav();

// ====================================
// PERFORMANCE: DEBOUNCE UTILITY
// ====================================

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll events for better performance
const debouncedScroll = debounce(() => {
    updateActiveNavLink();
}, 100);

window.addEventListener('scroll', debouncedScroll);

// ====================================
// CONSOLE BRANDING (FUN EASTER EGG)
// ====================================

console.log(
    '%c🌱 Krishi Mitra ',
    'background: linear-gradient(135deg, #3A7D44 0%, #7CB342 100%); color: white; padding: 10px 20px; font-size: 16px; font-weight: bold; border-radius: 8px;'
);
console.log(
    '%cBuilt with ❤️ by Amulya, Aditya, and Naitik',
    'color: #3A7D44; font-size: 12px; font-style: italic;'
);
console.log(
    '%cMaking farming smarter, one field at a time! 🚜',
    'color: #7CB342; font-size: 12px;'
);
