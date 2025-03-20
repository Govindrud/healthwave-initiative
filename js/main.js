
document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  
  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', function() {
      navLinks.classList.toggle('active');
      const icon = mobileMenuBtn.querySelector('i');
      if (icon.classList.contains('fa-bars')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-xmark');
      } else {
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
      }
    });
  }
  
  // Close mobile menu when clicking outside
  document.addEventListener('click', function(event) {
    if (navLinks && navLinks.classList.contains('active') && 
        !event.target.closest('.navbar')) {
      navLinks.classList.remove('active');
      const icon = mobileMenuBtn.querySelector('i');
      icon.classList.remove('fa-xmark');
      icon.classList.add('fa-bars');
    }
  });
  
  // Fix for iOS vh issue
  function setVH() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }
  
  setVH();
  window.addEventListener('resize', setVH);
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        // Close mobile menu if open
        if (navLinks && navLinks.classList.contains('active')) {
          navLinks.classList.remove('active');
          const icon = mobileMenuBtn.querySelector('i');
          icon.classList.remove('fa-xmark');
          icon.classList.add('fa-bars');
        }
        
        // Scroll to element
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Offset for fixed header
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Add active class to nav links on scroll
  function highlightNavOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 100;
      const sectionId = section.getAttribute('id');
      
      const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
      
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLink?.classList.add('active');
      } else {
        navLink?.classList.remove('active');
      }
    });
  }
  
  window.addEventListener('scroll', highlightNavOnScroll);
  
  // Animation on scroll
  function animateOnScroll() {
    const elements = document.querySelectorAll('.fade-in, .slide-in');
    
    elements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (elementTop < windowHeight * 0.8) {
        element.classList.add('visible');
      }
    });
  }
  
  // Add animation classes to elements
  const headers = document.querySelectorAll('.section-header');
  headers.forEach(header => header.classList.add('fade-in'));
  
  const cards = document.querySelectorAll('.about-card, .contact-card');
  cards.forEach((card, index) => {
    card.classList.add('slide-in');
    card.style.transitionDelay = `${index * 0.1}s`;
  });
  
  window.addEventListener('scroll', animateOnScroll);
  animateOnScroll(); // Run once on page load
});
