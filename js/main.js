
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }
    
    // Image slider functionality
    initImageSlider();
    
    // Initialize any tooltips
    initTooltips();
});

// Function to initialize image sliders
function initImageSlider() {
    const sliders = document.querySelectorAll('.slider-container');
    
    sliders.forEach(slider => {
        const track = slider.querySelector('.slider-track');
        const slides = slider.querySelectorAll('.slider-item');
        const dots = slider.querySelectorAll('.dot');
        const prevBtn = slider.querySelector('.prev-btn');
        const nextBtn = slider.querySelector('.next-btn');
        
        if (!track || slides.length === 0) return;
        
        let currentSlide = 0;
        
        // Set up the slider
        slides.forEach((slide, index) => {
            slide.style.display = index === 0 ? 'block' : 'none';
        });
        
        // Next button functionality
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                goToSlide((currentSlide + 1) % slides.length);
            });
        }
        
        // Previous button functionality
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                goToSlide(currentSlide === 0 ? slides.length - 1 : currentSlide - 1);
            });
        }
        
        // Dots functionality
        if (dots) {
            dots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    goToSlide(index);
                });
            });
        }
        
        // Function to change slide
        function goToSlide(index) {
            slides[currentSlide].style.display = 'none';
            dots && dots[currentSlide].classList.remove('active');
            
            currentSlide = index;
            
            slides[currentSlide].style.display = 'block';
            dots && dots[currentSlide].classList.add('active');
        }
        
        // Auto slide (optional)
        let slideInterval = setInterval(() => {
            goToSlide((currentSlide + 1) % slides.length);
        }, 5000);
        
        // Pause auto slide on hover
        slider.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        
        slider.addEventListener('mouseleave', () => {
            slideInterval = setInterval(() => {
                goToSlide((currentSlide + 1) % slides.length);
            }, 5000);
        });
    });
}

// Function to initialize tooltips
function initTooltips() {
    const tooltips = document.querySelectorAll('[data-tooltip]');
    
    tooltips.forEach(tooltip => {
        tooltip.addEventListener('mouseenter', function() {
            const tooltipText = this.getAttribute('data-tooltip');
            
            if (!tooltipText) return;
            
            const tooltipElement = document.createElement('div');
            tooltipElement.className = 'tooltip';
            tooltipElement.textContent = tooltipText;
            
            document.body.appendChild(tooltipElement);
            
            const rect = this.getBoundingClientRect();
            const tooltipRect = tooltipElement.getBoundingClientRect();
            
            tooltipElement.style.top = `${rect.top - tooltipRect.height - 10}px`;
            tooltipElement.style.left = `${rect.left + (rect.width/2) - (tooltipRect.width/2)}px`;
            tooltipElement.style.opacity = '1';
        });
        
        tooltip.addEventListener('mouseleave', function() {
            const tooltipElement = document.querySelector('.tooltip');
            if (tooltipElement) {
                tooltipElement.remove();
            }
        });
    });
}

// Global toast notification function
window.showToast = function(message, type = 'info') {
    const toastContainer = document.getElementById('toast-container') || createToastContainer();
    
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    // Set icon based on type
    let icon = 'info-circle';
    switch(type) {
        case 'success':
            icon = 'check-circle';
            break;
        case 'error':
            icon = 'exclamation-circle';
            break;
        case 'warning':
            icon = 'exclamation-triangle';
            break;
    }
    
    toast.innerHTML = `
        <div class="toast-content">
            <i class="fas fa-${icon} toast-icon"></i>
            <div class="toast-message">${message}</div>
        </div>
        <button class="toast-close">&times;</button>
    `;
    
    toastContainer.appendChild(toast);
    
    // Add the show class to trigger animation
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);
    
    // Auto remove after 5 seconds
    const timeout = setTimeout(() => {
        removeToast(toast);
    }, 5000);
    
    // Close button event
    toast.querySelector('.toast-close').addEventListener('click', () => {
        clearTimeout(timeout);
        removeToast(toast);
    });
    
    function removeToast(toast) {
        toast.classList.remove('show');
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }
    
    function createToastContainer() {
        const container = document.createElement('div');
        container.id = 'toast-container';
        document.body.appendChild(container);
        return container;
    }
};
