
document.addEventListener('DOMContentLoaded', function() {
  // Copy to clipboard functionality
  const copyButtons = document.querySelectorAll('.copy-btn');
  
  copyButtons.forEach(button => {
    button.addEventListener('click', function() {
      const textToCopy = this.getAttribute('data-copy');
      
      navigator.clipboard.writeText(textToCopy).then(() => {
        // Show success message
        const originalText = this.textContent;
        this.textContent = 'Copied!';
        
        // Reset button text after 2 seconds
        setTimeout(() => {
          this.textContent = originalText;
        }, 2000);
      }).catch(err => {
        console.error('Failed to copy: ', err);
      });
    });
  });
  
  // Live chat button functionality
  const chatButton = document.querySelector('.chat-btn');
  
  if (chatButton) {
    chatButton.addEventListener('click', function() {
      // Show a toast notification
      showToast('Chat Initiated', 'A support agent will connect with you shortly.');
      
      // In a real implementation, you would initialize a chat widget here
      // For demonstration, we'll just show a notification
      setTimeout(() => {
        // Create a chat bubble
        createChatBubble();
      }, 2000);
    });
  }
  
  // Contact form submission
  const contactForm = document.querySelector('.contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      // In a local demo without PHP, prevent the default form submission
      if (!window.location.href.includes('serverbyt.in')) {
        e.preventDefault();
        
        // Simulate form submission
        const submitBtn = this.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
          submitBtn.innerHTML = '<i class="fa-solid fa-check"></i> Sent!';
          
          showToast('Message Sent!', 'We\'ll get back to you as soon as possible.');
          
          // Reset form
          this.reset();
          
          // Reset button after 2 seconds
          setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
          }, 2000);
        }, 1500);
      }
    });
  }
  
  // Toast notification system
  function showToast(title, message) {
    // Create toast container if it doesn't exist
    let toastContainer = document.querySelector('.toast-container');
    
    if (!toastContainer) {
      toastContainer = document.createElement('div');
      toastContainer.className = 'toast-container';
      document.body.appendChild(toastContainer);
      
      // Add styles
      const style = document.createElement('style');
      style.textContent = `
        .toast-container {
          position: fixed;
          bottom: 20px;
          right: 20px;
          z-index: 9999;
        }
        .toast {
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          padding: 16px;
          margin-top: 8px;
          min-width: 300px;
          max-width: 400px;
          animation: slideIn 0.3s ease forwards;
          transform: translateX(100%);
        }
        .toast-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }
        .toast-title {
          font-weight: 600;
          font-size: 16px;
        }
        .toast-close {
          background: none;
          border: none;
          cursor: pointer;
          font-size: 16px;
          color: #64748b;
        }
        .toast-body {
          color: #64748b;
          font-size: 14px;
        }
        @keyframes slideIn {
          to {
            transform: translateX(0);
          }
        }
        @keyframes slideOut {
          to {
            transform: translateX(120%);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);
    }
    
    // Create toast element
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <div class="toast-header">
        <div class="toast-title">${title}</div>
        <button class="toast-close">&times;</button>
      </div>
      <div class="toast-body">${message}</div>
    `;
    
    // Add to container
    toastContainer.appendChild(toast);
    
    // Add close button functionality
    const closeBtn = toast.querySelector('.toast-close');
    closeBtn.addEventListener('click', () => {
      toast.style.animation = 'slideOut 0.3s ease forwards';
      setTimeout(() => {
        toast.remove();
      }, 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
      if (toast.parentNode) {
        toast.style.animation = 'slideOut 0.3s ease forwards';
        setTimeout(() => {
          toast.remove();
        }, 300);
      }
    }, 5000);
  }
  
  // Create a simple chat bubble
  function createChatBubble() {
    // Create chat bubble if it doesn't exist
    let chatBubble = document.querySelector('.chat-bubble');
    
    if (!chatBubble) {
      chatBubble = document.createElement('div');
      chatBubble.className = 'chat-bubble';
      document.body.appendChild(chatBubble);
      
      // Add styles
      const style = document.createElement('style');
      style.textContent = `
        .chat-bubble {
          position: fixed;
          bottom: 20px;
          right: 20px;
          background-color: white;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
          padding: 20px;
          width: 300px;
          z-index: 9998;
          animation: fadeIn 0.3s ease forwards;
        }
        .chat-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
          border-bottom: 1px solid #e2e8f0;
          padding-bottom: 8px;
        }
        .chat-title {
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .chat-close {
          background: none;
          border: none;
          cursor: pointer;
          font-size: 16px;
          color: #64748b;
        }
        .chat-message {
          background-color: #f1f5f9;
          border-radius: 12px;
          padding: 12px;
          margin-bottom: 12px;
        }
        .chat-input {
          display: flex;
          gap: 8px;
        }
        .chat-input input {
          flex: 1;
          padding: 10px;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
        }
        .chat-input button {
          background-color: var(--meant-600);
          color: white;
          border: none;
          border-radius: 8px;
          padding: 0 12px;
          cursor: pointer;
        }
        .chat-input button:hover {
          background-color: var(--meant-700);
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `;
      document.head.appendChild(style);
      
      chatBubble.innerHTML = `
        <div class="chat-header">
          <div class="chat-title">
            <i class="fa-solid fa-comment" style="color: var(--meant-600);"></i>
            Chat Support
          </div>
          <button class="chat-close">&times;</button>
        </div>
        <div class="chat-message">
          <strong>Support Agent:</strong> Hello! How can I help you today with your mental health journey?
        </div>
        <div class="chat-input">
          <input type="text" placeholder="Type your message...">
          <button><i class="fa-solid fa-paper-plane"></i></button>
        </div>
      `;
      
      // Add close button functionality
      const closeBtn = chatBubble.querySelector('.chat-close');
      closeBtn.addEventListener('click', () => {
        chatBubble.remove();
      });
      
      // Add simple chat functionality
      const chatInput = chatBubble.querySelector('input');
      const sendBtn = chatBubble.querySelector('button');
      
      function sendMessage() {
        if (chatInput.value.trim() === '') return;
        
        const messageContainer = document.createElement('div');
        messageContainer.className = 'chat-message';
        messageContainer.style.backgroundColor = '#e0f2fe';
        messageContainer.style.marginLeft = 'auto';
        messageContainer.style.maxWidth = '80%';
        messageContainer.style.textAlign = 'right';
        messageContainer.innerHTML = `
          <strong>You:</strong> ${chatInput.value}
        `;
        
        // Insert before the chat input
        chatBubble.insertBefore(messageContainer, chatBubble.querySelector('.chat-input'));
        
        // Clear input
        chatInput.value = '';
        
        // Simulate reply after 1 second
        setTimeout(() => {
          const replyContainer = document.createElement('div');
          replyContainer.className = 'chat-message';
          replyContainer.innerHTML = `
            <strong>Support Agent:</strong> Thank you for reaching out. One of our specialists will continue this conversation shortly. Is there anything specific you'd like to discuss about mental health support?
          `;
          
          chatBubble.insertBefore(replyContainer, chatBubble.querySelector('.chat-input'));
          
          // Scroll to bottom
          chatBubble.scrollTop = chatBubble.scrollHeight;
        }, 1000);
      }
      
      sendBtn.addEventListener('click', sendMessage);
      chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
          sendMessage();
        }
      });
    }
  }
});
