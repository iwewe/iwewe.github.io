/**
 * Modern Resume - Main JavaScript
 * Version: 2.0
 * Features: Mobile Navigation, Smooth Scroll, Active States
 */

(function() {
  'use strict';

  // ====================================
  // Mobile Navigation Toggle
  // ====================================

  function initMobileNav() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileSidebar = document.querySelector('.nav-mobile-sidebar');
    const mobileOverlay = document.querySelector('.nav-mobile-overlay');
    const navLinks = document.querySelectorAll('.nav-mobile-sidebar .nav-link');

    if (!menuToggle || !mobileSidebar || !mobileOverlay) return;

    // Toggle menu
    function toggleMenu() {
      const isActive = mobileSidebar.classList.contains('active');

      if (isActive) {
        closeMenu();
      } else {
        openMenu();
      }
    }

    function openMenu() {
      mobileSidebar.classList.add('active');
      mobileOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
      menuToggle.setAttribute('aria-expanded', 'true');
    }

    function closeMenu() {
      mobileSidebar.classList.remove('active');
      mobileOverlay.classList.remove('active');
      document.body.style.overflow = '';
      menuToggle.setAttribute('aria-expanded', 'false');
    }

    // Event listeners
    menuToggle.addEventListener('click', toggleMenu);
    mobileOverlay.addEventListener('click', closeMenu);

    // Close menu when clicking nav links
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        setTimeout(closeMenu, 300); // Delay untuk smooth scroll
      });
    });

    // Close menu on ESC key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileSidebar.classList.contains('active')) {
        closeMenu();
      }
    });
  }

  // ====================================
  // Active Navigation State
  // ====================================

  function initActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

    if (!sections.length || !navLinks.length) return;

    function updateActiveNav() {
      const scrollPosition = window.scrollY + 100;

      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          // Remove active from all nav items
          navLinks.forEach(link => {
            link.parentElement.classList.remove('active');
          });

          // Add active to current section's nav item
          const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
          if (activeLink) {
            activeLink.parentElement.classList.add('active');
          }
        }
      });
    }

    // Throttle scroll event for performance
    let scrollTimeout;
    window.addEventListener('scroll', () => {
      if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
      }
      scrollTimeout = window.requestAnimationFrame(updateActiveNav);
    });

    // Initial check
    updateActiveNav();
  }

  // ====================================
  // Smooth Scroll for Anchor Links
  // ====================================

  function initSmoothScroll() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');

        // Skip if href is just "#"
        if (href === '#') return;

        const target = document.querySelector(href);

        if (target) {
          e.preventDefault();

          const headerOffset = window.innerWidth < 1024 ? 64 : 0;
          const targetPosition = target.offsetTop - headerOffset;

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });

          // Update URL without jumping
          if (history.pushState) {
            history.pushState(null, null, href);
          }
        }
      });
    });
  }

  // ====================================
  // Scroll to Top Button (Optional)
  // ====================================

  function initScrollToTop() {
    const scrollBtn = document.querySelector('.scroll-to-top');

    if (!scrollBtn) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 500) {
        scrollBtn.classList.add('visible');
      } else {
        scrollBtn.classList.remove('visible');
      }
    });

    scrollBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // ====================================
  // Skill Progress Bars Animation
  // ====================================

  function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');

    if (!skillBars.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const width = bar.getAttribute('data-width') || bar.style.width;
          bar.style.width = width;
          observer.unobserve(bar);
        }
      });
    }, {
      threshold: 0.5
    });

    skillBars.forEach(bar => {
      const width = bar.style.width;
      bar.setAttribute('data-width', width);
      bar.style.width = '0%';
      observer.observe(bar);
    });
  }

  // ====================================
  // Card Hover Effects (Optional Enhancement)
  // ====================================

  function initCardEffects() {
    const cards = document.querySelectorAll('.card, .project-card');

    cards.forEach(card => {
      card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-4px)';
      });

      card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
      });
    });
  }

  // ====================================
  // External Links - Open in New Tab
  // ====================================

  function initExternalLinks() {
    const links = document.querySelectorAll('a[href^="http"]');

    links.forEach(link => {
      // Skip if already has target
      if (!link.getAttribute('target')) {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
      }
    });
  }

  // ====================================
  // Lazy Load Images (Modern Browser Support)
  // ====================================

  function initLazyLoad() {
    const images = document.querySelectorAll('img[data-src]');

    if (!images.length || !('IntersectionObserver' in window)) return;

    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.getAttribute('data-src');
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach(img => imageObserver.observe(img));
  }

  // ====================================
  // Initialize Typed.js if available
  // ====================================

  function initTyped() {
    if (typeof Typed === 'undefined') return;

    const typedElement = document.querySelector('.typing');
    if (!typedElement) return;

    new Typed('.typing', {
      strings: [
        'GRC Professional',
        'IT Infrastructure Leader',
        'Cybersecurity Enthusiast',
        'System Administrator',
        'Problem Solver'
      ],
      typeSpeed: 80,
      backSpeed: 50,
      backDelay: 1500,
      startDelay: 500,
      loop: true,
      showCursor: true,
      cursorChar: '|'
    });
  }

  // ====================================
  // Performance: Debounce Function
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

  // ====================================
  // Window Resize Handler
  // ====================================

  function initResizeHandler() {
    const handleResize = debounce(() => {
      // Close mobile menu if window is resized to desktop
      if (window.innerWidth >= 1024) {
        const mobileSidebar = document.querySelector('.nav-mobile-sidebar');
        const mobileOverlay = document.querySelector('.nav-mobile-overlay');

        if (mobileSidebar && mobileSidebar.classList.contains('active')) {
          mobileSidebar.classList.remove('active');
          mobileOverlay.classList.remove('active');
          document.body.style.overflow = '';
        }
      }
    }, 250);

    window.addEventListener('resize', handleResize);
  }

  // ====================================
  // Console Welcome Message
  // ====================================

  function consoleWelcome() {
    if (typeof console === 'undefined') return;

    const styles = [
      'color: #00796b',
      'font-size: 16px',
      'font-weight: bold',
      'padding: 10px'
    ].join(';');

    console.log('%c👋 Hi there! Welcome to my resume.', styles);
    console.log('%cInterested in the code? Check out the source on GitHub!', 'color: #666; font-size: 12px;');
  }

  // ====================================
  // Main Initialization
  // ====================================

  function init() {
    // Core Features
    initMobileNav();
    initActiveNavigation();
    initSmoothScroll();

    // Enhancement Features
    initSkillBars();
    initExternalLinks();
    initLazyLoad();
    initResizeHandler();

    // Optional Features
    initScrollToTop();

    // Typed.js (will be loaded separately)
    // Wait for DOM and Typed.js to be ready
    if (document.readyState === 'complete') {
      initTyped();
    } else {
      window.addEventListener('load', initTyped);
    }

    // Welcome message
    consoleWelcome();
  }

  // ====================================
  // Start when DOM is ready
  // ====================================

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
