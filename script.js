// Enhanced Navigation scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle with animation
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    mobileMenu.classList.toggle('active');
    
    // Prevent body scroll when mobile menu is open
    if (mobileMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

// Active navigation link highlighting
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        if (window.scrollY >= sectionTop) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Add active class styling
const style = document.createElement('style');
style.textContent = `
    .nav-menu a.active {
        background: rgba(124, 58, 237, 0.15) !important;
        color: var(--cyber-glow) !important;
        border-color: var(--cyber-glow) !important;
        box-shadow: 0 0 20px rgba(168, 85, 247, 0.3) !important;
    }
    
    .nav-menu a.active::after {
        width: 80% !important;
    }
`;
document.head.appendChild(style);

// Update active link on scroll
window.addEventListener('scroll', updateActiveNavLink);

// Smooth scroll for navigation links
document.querySelectorAll('.nav-menu a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Close mobile menu if open
            const mobileMenu = document.getElementById('mobileMenu');
            if (mobileMenu.classList.contains('active')) {
                toggleMobileMenu();
            }
            
            // Smooth scroll to target
            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    });
});

// Initialize active link on page load
window.addEventListener('load', () => {
    updateActiveNavLink();
});

function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Copy to clipboard functionality
document.querySelectorAll('.copy-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        e.stopPropagation();
        const textToCopy = button.getAttribute('data-copy');
        navigator.clipboard.writeText(textToCopy)
            .then(() => {
                showToast('Host berhasil disalin!');
            })
            .catch(err => {
                console.error('Gagal menyalin teks:', err);
                showToast('Gagal menyalin host');
            });
    });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    });
});

window.addEventListener('load', () => {
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 500);
});

if ('ontouchstart' in window) {
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('touchstart', function () {
            this.classList.add('hover');
        });
        card.addEventListener('touchend', function () {
            setTimeout(() => {
                this.classList.remove('hover');
            }, 500);
        });
    });
}

// Konami Code Easter Egg with Purple Theme
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;
document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            document.body.style.background = 'linear-gradient(145deg, #8b5cf6, #c084fc, #f472b6)';
            document.body.style.animation = 'rainbow 2s ease-in-out infinite';
            showToast('?? Purple Power Activated! ??');
            konamiIndex = 0;
            setTimeout(() => {
                document.body.style.background = '';
                document.body.style.animation = '';
            }, 8000);
        }
    } else {
        konamiIndex = 0;
    }
});

// Add rainbow animation for easter egg
const rainbowStyle = document.createElement('style');
rainbowStyle.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg) brightness(1.2); }
        25% { filter: hue-rotate(90deg) brightness(1.3); }
        50% { filter: hue-rotate(180deg) brightness(1.4); }
        75% { filter: hue-rotate(270deg) brightness(1.3); }
        100% { filter: hue-rotate(360deg) brightness(1.2); }
    }
`;
document.head.appendChild(rainbowStyle);
