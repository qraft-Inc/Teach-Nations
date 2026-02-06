// Mobile hamburger menu toggle
document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-list a');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', function() {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
      const isExpanded = hamburger.classList.contains('active');
      hamburger.setAttribute('aria-expanded', isExpanded);
    });

    // Close menu when clicking on a link (except dropdown toggles)
    navLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        // Don't close if it's a dropdown toggle
        if (!link.classList.contains('dropdown-toggle')) {
          hamburger.classList.remove('active');
          navMenu.classList.remove('active');
          hamburger.setAttribute('aria-expanded', 'false');
        }
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
      if (!navMenu.contains(event.target) && !hamburger.contains(event.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Dropdown menu toggle for mobile
  const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
  dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', function(e) {
      // On mobile, toggle dropdown visibility
      if (window.innerWidth <= 800) {
        e.preventDefault();
        const dropdown = toggle.parentElement;
        const dropdownMenu = dropdown.querySelector('.dropdown-menu');
        
        // Toggle visibility
        if (dropdownMenu.style.display === 'block') {
          dropdownMenu.style.display = 'none';
        } else {
          // Close other dropdowns
          document.querySelectorAll('.dropdown-menu').forEach(menu => {
            menu.style.display = 'none';
          });
          dropdownMenu.style.display = 'block';
        }
      }
    });
  });

  // Navbar scroll effect
  const header = document.querySelector('.site-header');
  const heroCarousel = document.querySelector('.hero-carousel');
  
  window.addEventListener('scroll', function() {
    const scrolled = window.scrollY;
    
    // Add shadow to navbar on scroll
    if (scrolled > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    // Parallax effect on hero
    if (heroCarousel && scrolled < window.innerHeight) {
      const parallaxSpeed = 0.5;
      heroCarousel.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    }
  });

  // Parallax scroll effect for sections
  const parallaxSections = document.querySelectorAll('.parallax-section');
  
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  parallaxSections.forEach(section => {
    observer.observe(section);
  });

  // Hero Carousel
  const carousel = document.querySelector('.carousel-container');
  if (carousel) {
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    let currentSlide = 0;
    let autoplayInterval;

    function showSlide(index) {
      slides.forEach((slide, i) => {
        slide.classList.remove('active');
        dots[i].classList.remove('active');
      });
      
      currentSlide = (index + slides.length) % slides.length;
      slides[currentSlide].classList.add('active');
      dots[currentSlide].classList.add('active');
    }

    function nextSlide() {
      showSlide(currentSlide + 1);
    }

    function prevSlide() {
      showSlide(currentSlide - 1);
    }

    function startAutoplay() {
      autoplayInterval = setInterval(nextSlide, 5000);
    }

    function stopAutoplay() {
      clearInterval(autoplayInterval);
    }

    // Event listeners
    if (nextBtn) nextBtn.addEventListener('click', () => {
      nextSlide();
      stopAutoplay();
      startAutoplay();
    });

    if (prevBtn) prevBtn.addEventListener('click', () => {
      prevSlide();
      stopAutoplay();
      startAutoplay();
    });

    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        showSlide(index);
        stopAutoplay();
        startAutoplay();
      });
    });

    // Pause on hover
    carousel.addEventListener('mouseenter', stopAutoplay);
    carousel.addEventListener('mouseleave', startAutoplay);

    // Start autoplay
    startAutoplay();
  }

  // Smooth scroll to section if hash is present in URL
  if (window.location.hash) {
    setTimeout(function() {
      const target = document.querySelector(window.location.hash);
      if (target) {
        const headerHeight = header ? header.offsetHeight : 82;
        const targetPosition = target.offsetTop - headerHeight - 20;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    }, 100);
  }
});

console.log('Teach Nations site loaded');

