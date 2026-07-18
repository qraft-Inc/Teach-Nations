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

  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
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

  // Segmented visitor entry — highlights which audience is active.
  // Later stages tag Programs/Offers content with data-segment so this
  // actually filters that content; for now it just tracks the choice.
  const segmentBtns = document.querySelectorAll('.segment-btn');
  if (segmentBtns.length) {
    segmentBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        segmentBtns.forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
        document.body.setAttribute('data-active-segment', btn.dataset.segment);
      });
    });
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

