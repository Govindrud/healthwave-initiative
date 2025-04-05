
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (navLinks && navLinks.classList.contains('active') && 
            !event.target.closest('.nav-links') && 
            !event.target.closest('.menu-toggle')) {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });
    
    // Initialize scrolling animations
    initScrollAnimations();
    
    // Initialize accordion functionality if exists
    initAccordions();
    
    // Handle session messages
    showSessionMessages();
});

function initScrollAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in-up');
    
    if (fadeElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.1
        });
        
        fadeElements.forEach(element => {
            observer.observe(element);
        });
    }
}

function initAccordions() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    if (accordionHeaders.length > 0) {
        accordionHeaders.forEach(header => {
            header.addEventListener('click', function() {
                const accordionItem = this.parentElement;
                const accordionContent = this.nextElementSibling;
                
                // Toggle current item
                accordionItem.classList.toggle('active');
                
                // Adjust content height
                if (accordionItem.classList.contains('active')) {
                    accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px';
                } else {
                    accordionContent.style.maxHeight = 0;
                }
                
                // Close other items if this is a single-open accordion
                const isSingleOpen = accordionItem.parentElement.classList.contains('single-open');
                if (isSingleOpen) {
                    const siblingItems = accordionItem.parentElement.children;
                    for (let i = 0; i < siblingItems.length; i++) {
                        const sibling = siblingItems[i];
                        if (sibling !== accordionItem && sibling.classList.contains('active')) {
                            sibling.classList.remove('active');
                            sibling.querySelector('.accordion-content').style.maxHeight = 0;
                        }
                    }
                }
            });
        });
    }
}

function showSessionMessages() {
    const message = document.getElementById('session-message');
    
    if (message) {
        // Show the message
        message.classList.add('show');
        
        // Auto hide after 5 seconds
        setTimeout(() => {
            message.classList.remove('show');
        }, 5000);
        
        // Close button functionality
        const closeBtn = message.querySelector('.close-message');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                message.classList.remove('show');
            });
        }
    }
}

// Generic toast notification function
window.showToast = function(message, type = 'info') {
    // Check if toast container exists
    let toastContainer = document.getElementById('toast-container');
    
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.id = 'toast-container';
        document.body.appendChild(toastContainer);
    }
    
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    let iconClass = 'fa-info-circle';
    switch(type) {
        case 'success':
            iconClass = 'fa-check-circle';
            break;
        case 'error':
            iconClass = 'fa-exclamation-circle';
            break;
        case 'warning':
            iconClass = 'fa-exclamation-triangle';
            break;
    }
    
    toast.innerHTML = `
        <div class="toast-content">
            <i class="fas ${iconClass} toast-icon"></i>
            <div class="toast-message">${message}</div>
        </div>
        <button class="toast-close">&times;</button>
    `;
    
    toastContainer.appendChild(toast);
    
    // Show toast after a small delay for animation
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);
    
    // Auto-hide toast after 5 seconds
    const hideTimeout = setTimeout(() => {
        hideToast(toast);
    }, 5000);
    
    // Add close button event listener
    const closeBtn = toast.querySelector('.toast-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            clearTimeout(hideTimeout);
            hideToast(toast);
        });
    }
};

function hideToast(toast) {
    toast.classList.remove('show');
    
    // Remove from DOM after animation completes
    setTimeout(() => {
        if (toast.parentNode) {
            toast.parentNode.removeChild(toast);
        }
    }, 300);
}
