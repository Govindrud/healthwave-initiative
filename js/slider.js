
document.addEventListener('DOMContentLoaded', function() {
    // Image slider initialization
    initImageSlider();
});

function initImageSlider() {
    // Image slider for happy people section
    const sliderTrack = document.querySelector('.slider-track');
    const sliderItems = document.querySelectorAll('.slider-item');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (sliderTrack && sliderItems.length > 0) {
        let currentIndex = 0;
        const itemCount = sliderItems.length;
        
        // Set initial position
        updateSlider();
        
        // Event listeners for dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentIndex = index;
                updateSlider();
            });
        });
        
        // Event listeners for prev/next buttons
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                currentIndex = (currentIndex - 1 + itemCount) % itemCount;
                updateSlider();
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                currentIndex = (currentIndex + 1) % itemCount;
                updateSlider();
            });
        }
        
        // Auto advance slide
        let slideInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % itemCount;
            updateSlider();
        }, 5000);
        
        // Pause slider on hover
        sliderTrack.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        
        sliderTrack.addEventListener('mouseleave', () => {
            slideInterval = setInterval(() => {
                currentIndex = (currentIndex + 1) % itemCount;
                updateSlider();
            }, 5000);
        });
        
        // Touch events for mobile swipe
        let touchStartX = 0;
        let touchEndX = 0;
        
        sliderTrack.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        sliderTrack.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });
        
        function handleSwipe() {
            const swipeThreshold = 50; // Minimum distance required for a swipe
            
            if (touchEndX < touchStartX - swipeThreshold) {
                // Swipe left - next slide
                currentIndex = (currentIndex + 1) % itemCount;
                updateSlider();
            }
            
            if (touchEndX > touchStartX + swipeThreshold) {
                // Swipe right - previous slide
                currentIndex = (currentIndex - 1 + itemCount) % itemCount;
                updateSlider();
            }
        }
        
        // Update slider position and active dot
        function updateSlider() {
            // Update slider track position
            sliderTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
            
            // Update active dot
            dots.forEach((dot, index) => {
                if (index === currentIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }
    }
}
