// ========================================
// BOGHARA PARTH - PORTFOLIO SCRIPT
// Cyber Security Analyst | Aspiring Ethical Hacker
// ========================================

class PortfolioApp {
    constructor() {
        this.currentPage = '';
        this.init();
    }

    init() {
        console.log('🚀 Portfolio Initialized');
        this.setActiveNavigation();
        this.initScrollAnimations();
        this.initKeyboardShortcuts();
        this.logInfo();
    }

    setActiveNavigation() {
        const currentPath = window.location.pathname;
        const fileName = currentPath.split('/').pop() || 'index.html';
        
        document.querySelectorAll('nav a').forEach(link => {
            link.classList.remove('active');
            
            const linkHref = link.getAttribute('href');
            if (linkHref === fileName || 
                (fileName === '' && linkHref === 'index.html') ||
                (fileName === 'index.html' && linkHref === 'index.html')) {
                link.classList.add('active');
            }
        });

        this.currentPage = fileName;
        console.log(`📍 Current page: ${this.currentPage}`);
    }

    initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });

        document.querySelectorAll('.experience-card, .skill-category, .project-card, .contact-card').forEach(el => {
            el.classList.add('fade-in');
            observer.observe(el);
        });
    }

    initKeyboardShortcuts() {
        const pages = ['index.html', 'about.html', 'experience.html', 'skills.html', 'projects.html', 'contact.html'];
        
        document.addEventListener('keydown', (e) => {
            const currentIndex = pages.indexOf(this.currentPage);

            if ((e.key === 'ArrowRight' || e.key === 'n') && currentIndex < pages.length - 1) {
                e.preventDefault();
                window.location.href = pages[currentIndex + 1];
            }
            else if ((e.key === 'ArrowLeft' || e.key === 'p') && currentIndex > 0) {
                e.preventDefault();
                window.location.href = pages[currentIndex - 1];
            }
            else if (e.key === 'Home' && e.ctrlKey) {
                e.preventDefault();
                window.location.href = 'index.html';
            }
            else if (e.key === 'End' && e.ctrlKey) {
                e.preventDefault();
                window.location.href = 'contact.html';
            }
        });

        console.log('⌨️  Keyboard shortcuts enabled');
    }

    logInfo() {
        console.log('✅ Portfolio loaded successfully');
        console.log('📄 Pages:', ['Home', 'About', 'Experience', 'Skills', 'Projects', 'Contact']);
        console.log('⌨️  Keyboard shortcuts:');
        console.log('   - Arrow Right / n: Next page');
        console.log('   - Arrow Left / p: Previous page');
        console.log('   - Ctrl + Home: Home page');
        console.log('   - Ctrl + End: Contact page');
    }

    navigateTo(page) {
        window.location.href = page;
    }

    getCurrentPage() {
        return this.currentPage;
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.portfolioApp = new PortfolioApp();
});

// Smooth scroll for anchor links
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Page transition effect
window.addEventListener('beforeunload', () => {
    document.body.style.opacity = '0';
});


function toggleSidebar(forceState) {
    const sidebar = document.getElementById("sidebar");
    if (!sidebar) return;
    const willOpen = typeof forceState === "boolean"
        ? forceState
        : !sidebar.classList.contains("active");
    sidebar.classList.toggle("active", willOpen);
    document.body.classList.toggle("nav-open", willOpen);

    const toggleBtn = document.querySelector(".menu-toggle");
    if (toggleBtn) {
        toggleBtn.setAttribute("aria-expanded", String(willOpen));
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const sidebar = document.getElementById("sidebar");
    const toggleBtn = document.querySelector(".menu-toggle");

    if (toggleBtn && sidebar) {
        toggleBtn.setAttribute("aria-controls", "sidebar");
        toggleBtn.setAttribute("aria-expanded", "false");
    }

    if (sidebar) {
        sidebar.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => toggleSidebar(false));
        });
    }

    document.addEventListener("click", (event) => {
        if (!sidebar || !sidebar.classList.contains("active")) return;
        const clickedToggle = event.target.closest(".menu-toggle");
        const clickedSidebar = event.target.closest("#sidebar");
        if (!clickedToggle && !clickedSidebar) {
            toggleSidebar(false);
        }
    });
});
