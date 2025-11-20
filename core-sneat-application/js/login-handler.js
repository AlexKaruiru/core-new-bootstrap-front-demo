/**
 * Login Handler
 * Handles login form submission and redirects to main application
 */
(function() {
  'use strict';

  // Wait for SessionManager to be available
  function initLoginHandler() {
    if (!window.SessionManager) {
      setTimeout(initLoginHandler, 100);
      return;
    }

    // Handle form submission
    const formAuthentication = document.querySelector('#formAuthentication');
    
    if (formAuthentication) {
      formAuthentication.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const username = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const rememberMe = document.getElementById('remember-me').checked;
        
        // Simple validation
        if (!username || !password) {
          alert('Please enter both username and password');
          return;
        }
        
        // Attempt login using SessionManager
        if (window.SessionManager.login(username, password)) {
          // Store remember me preference
          if (rememberMe) {
            localStorage.setItem('rememberMe', 'true');
            localStorage.setItem('username', username);
          } else {
            localStorage.removeItem('rememberMe');
            localStorage.removeItem('username');
          }
          
          // Redirect to main application
          window.location.href = 'index.html';
        } else {
          alert('Invalid username or password. Default credentials: admin/admin');
        }
      });
    }

    // Check if already logged in - only after a delay to prevent loops
    setTimeout(function() {
      try {
        if (window.SessionManager && window.SessionManager.isLoggedIn()) {
          // Redirect to main app if already logged in
          if (window.location.pathname.includes('login.html')) {
            window.location.replace('index.html');
          }
        }
      } catch (error) {
        console.error('Error checking login status:', error);
      }
    }, 500);
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLoginHandler);
  } else {
    initLoginHandler();
  }

  // Password toggle functionality
  const passwordToggle = document.querySelector('.form-password-toggle .input-group-text');
  if (passwordToggle) {
    passwordToggle.addEventListener('click', function() {
      const passwordInput = document.getElementById('password');
      const icon = this.querySelector('i');
      
      if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        icon.classList.remove('bx-hide');
        icon.classList.add('bx-show');
      } else {
        passwordInput.type = 'password';
        icon.classList.remove('bx-show');
        icon.classList.add('bx-hide');
      }
    });
  }

  // Auto-fill username if remembered
  if (localStorage.getItem('rememberMe') === 'true' && localStorage.getItem('username')) {
    const usernameInput = document.getElementById('email');
    if (usernameInput) {
      usernameInput.value = localStorage.getItem('username');
      document.getElementById('remember-me').checked = true;
    }
  }
})();

