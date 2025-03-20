
// Contact Form JS
document.addEventListener('DOMContentLoaded', function() {
    // Copy button functionality
    const copyButtons = document.querySelectorAll('.copy-btn');
    copyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const textToCopy = this.getAttribute('data-copy');
            navigator.clipboard.writeText(textToCopy).then(() => {
                showToast('Copied to clipboard!');
                
                // Add temporary visual feedback
                this.classList.add('copied');
                this.textContent = 'Copied!';
                
                setTimeout(() => {
                    this.classList.remove('copied');
                    this.textContent = this.textContent.includes('Email') 
                        ? 'Copy Email Address' 
                        : 'Copy Phone Number';
                }, 2000);
            }).catch(err => {
                console.error('Could not copy text: ', err);
            });
        });
    });
    
    // Live chat button
    const chatButton = document.querySelector('.chat-btn');
    if (chatButton) {
        chatButton.addEventListener('click', function() {
            showToast('Chat initiated! An agent will connect with you shortly.');
            
            // Simulate chat interface appearing
            setTimeout(() => {
                const chatInterface = document.createElement('div');
                chatInterface.className = 'chat-interface';
                chatInterface.innerHTML = `
                    <div class="chat-header">
                        <h4>Live Support</h4>
                        <button class="close-chat"><i class="fa-solid fa-times"></i></button>
                    </div>
                    <div class="chat-messages">
                        <div class="message agent">
                            <div class="message-content">
                                <p>Hello! Thanks for reaching out. How can I help you today?</p>
                                <span class="message-time">${getCurrentTime()}</span>
                            </div>
                        </div>
                    </div>
                    <div class="chat-input">
                        <input type="text" placeholder="Type your message..." />
                        <button class="send-message"><i class="fa-solid fa-paper-plane"></i></button>
                    </div>
                `;
                
                document.body.appendChild(chatInterface);
                
                // Add event listeners for chat interface
                const closeChat = document.querySelector('.close-chat');
                closeChat.addEventListener('click', function() {
                    document.body.removeChild(chatInterface);
                });
                
                const sendMessage = document.querySelector('.send-message');
                const chatInput = document.querySelector('.chat-input input');
                
                sendMessage.addEventListener('click', function() {
                    sendChatMessage(chatInput.value);
                });
                
                chatInput.addEventListener('keypress', function(e) {
                    if (e.key === 'Enter') {
                        sendChatMessage(chatInput.value);
                    }
                });
                
                function sendChatMessage(text) {
                    if (!text.trim()) return;
                    
                    const chatMessages = document.querySelector('.chat-messages');
                    const messageElement = document.createElement('div');
                    messageElement.className = 'message user';
                    messageElement.innerHTML = `
                        <div class="message-content">
                            <p>${text}</p>
                            <span class="message-time">${getCurrentTime()}</span>
                        </div>
                    `;
                    
                    chatMessages.appendChild(messageElement);
                    chatInput.value = '';
                    
                    // Auto response after a delay
                    setTimeout(() => {
                        const responseElement = document.createElement('div');
                        responseElement.className = 'message agent';
                        responseElement.innerHTML = `
                            <div class="message-content">
                                <p>Thank you for your message. Our team will assist you shortly.</p>
                                <span class="message-time">${getCurrentTime()}</span>
                            </div>
                        `;
                        
                        chatMessages.appendChild(responseElement);
                        chatMessages.scrollTop = chatMessages.scrollHeight;
                    }, 1000);
                    
                    chatMessages.scrollTop = chatMessages.scrollHeight;
                }
            }, 500);
        });
    }
    
    // Contact form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            // Form will be handled by the PHP script, but we can add client-side validation
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const subjectInput = document.getElementById('subject');
            const messageInput = document.getElementById('message');
            
            let isValid = true;
            
            // Simple validation
            if (!nameInput.value.trim()) {
                highlightInvalidField(nameInput);
                isValid = false;
            }
            
            if (!emailInput.value.trim() || !isValidEmail(emailInput.value)) {
                highlightInvalidField(emailInput);
                isValid = false;
            }
            
            if (!subjectInput.value.trim()) {
                highlightInvalidField(subjectInput);
                isValid = false;
            }
            
            if (!messageInput.value.trim()) {
                highlightInvalidField(messageInput);
                isValid = false;
            }
            
            if (!isValid) {
                event.preventDefault();
                showToast('Please fill in all required fields correctly.', 'error');
            }
        });
    }
    
    // Check URL parameters for form submission status
    const urlParams = new URLSearchParams(window.location.search);
    const status = urlParams.get('status');
    const message = urlParams.get('message');
    
    if (status && message) {
        showToast(message, status);
        
        // Remove parameters from URL
        const url = new URL(window.location);
        url.searchParams.delete('status');
        url.searchParams.delete('message');
        window.history.replaceState({}, '', url);
    }
    
    // Helper functions
    function highlightInvalidField(field) {
        field.classList.add('invalid');
        
        field.addEventListener('input', function() {
            field.classList.remove('invalid');
        }, { once: true });
    }
    
    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    
    function getCurrentTime() {
        const now = new Date();
        let hours = now.getHours();
        let minutes = now.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        
        hours = hours % 12;
        hours = hours ? hours : 12;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        
        return `${hours}:${minutes} ${ampm}`;
    }
});

// Toast notification function
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const toastMessage = document.querySelector('.toast-message');
    const toastIcon = document.querySelector('.toast-icon');
    
    // Set message
    toastMessage.textContent = message;
    
    // Set appropriate icon based on type
    if (type === 'error') {
        toast.classList.add('error');
        toastIcon.classList.remove('fa-check-circle');
        toastIcon.classList.add('fa-exclamation-circle');
    } else {
        toast.classList.remove('error');
        toastIcon.classList.remove('fa-exclamation-circle');
        toastIcon.classList.add('fa-check-circle');
    }
    
    // Show toast
    toast.classList.add('show');
    
    // Hide toast after 5 seconds
    setTimeout(() => {
        toast.classList.remove('show');
    }, 5000);
}
