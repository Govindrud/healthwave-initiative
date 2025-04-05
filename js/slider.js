
/**
 * Hero Image Slider JavaScript
 */
document.addEventListener('DOMContentLoaded', function() {
    const sliderWrapper = document.querySelector('.slider-wrapper');
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.slider-dot');
    const prevButton = document.querySelector('.slider-prev');
    const nextButton = document.querySelector('.slider-next');
    
    if (!sliderWrapper || slides.length === 0) return;
    
    let currentSlide = 0;
    const slideCount = slides.length;
    
    // Initialize the slider
    function initSlider() {
        // Show first slide
        updateSlider();
        
        // Set up auto slide
        startAutoSlide();
    }
    
    // Update slider to show the current slide
    function updateSlider() {
        // Hide all slides
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Show current slide
        slides[currentSlide].classList.add('active');
        
        // Update dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        dots[currentSlide].classList.add('active');
    }
    
    // Go to previous slide
    function prevSlide() {
        currentSlide--;
        if (currentSlide < 0) {
            currentSlide = slideCount - 1;
        }
        updateSlider();
    }
    
    // Go to next slide
    function nextSlide() {
        currentSlide++;
        if (currentSlide >= slideCount) {
            currentSlide = 0;
        }
        updateSlider();
    }
    
    // Go to a specific slide
    function goToSlide(index) {
        currentSlide = index;
        updateSlider();
        resetAutoSlide();
    }
    
    // Auto slide functionality
    let autoSlideInterval;
    
    function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
            nextSlide();
        }, 5000); // Change slide every 5 seconds
    }
    
    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }
    
    // Add event listeners
    if (prevButton) {
        prevButton.addEventListener('click', () => {
            prevSlide();
            resetAutoSlide();
        });
    }
    
    if (nextButton) {
        nextButton.addEventListener('click', () => {
            nextSlide();
            resetAutoSlide();
        });
    }
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index);
        });
    });
    
    // Initialize slider
    initSlider();
    
    // Add pause on hover functionality
    sliderWrapper.addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
    });
    
    sliderWrapper.addEventListener('mouseleave', () => {
        startAutoSlide();
    });
});
