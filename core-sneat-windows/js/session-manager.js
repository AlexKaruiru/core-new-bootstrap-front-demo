/**
 * Global Session Manager
 * Manages user sessions, authentication, and session timeout
 */
class SessionManager {
  constructor() {
    this.SESSION_DURATION = 30 * 60 * 1000; // 30 minutes in milliseconds
    this.CHECK_INTERVAL = 60 * 1000; // Check every minute
    this.WARNING_TIME = 5 * 60 * 1000; // Warn 5 minutes before expiry
    
    this.sessionTimer = null;
    this.warningTimer = null;
    this.activityCheckInterval = null;
    
    this.init();
  }

  init() {
    // Only check session if we're on the main app page (not login page)
    // This prevents redirect loops
    if (!window.location.pathname.includes('login.html')) {
      // Check session on page load, but prevent redirect if on login page
      this.checkSession(false);
      
      // Set up activity listeners
      this.setupActivityListeners();
      
      // Start session monitoring
      this.startSessionMonitoring();
    }
  }

  /**
   * Login user with credentials
   * @param {string} username 
   * @param {string} password 
   * @returns {boolean} Success status
   */
  login(username, password) {
    // Default credentials: admin/admin
    if (username === 'admin' && password === 'admin') {
      const sessionData = {
        username: username,
        loginTime: Date.now(),
        expiryTime: Date.now() + this.SESSION_DURATION,
        isActive: true
      };
      
      sessionStorage.setItem('sessionData', JSON.stringify(sessionData));
      sessionStorage.setItem('isLoggedIn', 'true');
      sessionStorage.setItem('username', username);
      
      // Start session monitoring
      this.startSessionMonitoring();
      
      return true;
    }
    
    return false;
  }

  /**
   * Logout user
   */
  logout() {
    // Clear timers first
    this.clearTimers();
    
    // Use StorageCleanup if available, otherwise clear manually
    if (window.StorageCleanup) {
      window.StorageCleanup.clearAll();
    } else {
      // Clear all session data
      sessionStorage.clear();
      
      // Clear all local storage
      localStorage.clear();
    }
    
    // Show logout message
    this.showToast('You have been logged out successfully. All data has been cleared.', 'success', 3000);
    
    // Redirect to login after a brief delay
    setTimeout(() => {
      // Force redirect even if there are any issues
      try {
        window.location.href = 'login.html';
      } catch (e) {
        // Fallback redirect
        window.location.replace('login.html');
      }
    }, 500);
  }

  /**
   * Check if session is valid
   * @param {boolean} preventRedirect - If true, don't call logout (prevents redirect loops)
   * @returns {boolean} Session validity
   */
  checkSession(preventRedirect = false) {
    const sessionData = this.getSessionData();
    
    if (!sessionData || !sessionData.isActive) {
      if (!preventRedirect) {
        this.logout();
      }
      return false;
    }
    
    const now = Date.now();
    
    // Check if session expired
    if (now >= sessionData.expiryTime) {
      if (!preventRedirect) {
        this.showSessionExpiredMessage();
        this.logout();
      }
      return false;
    }
    
    // Extend session on activity
    this.extendSession();
    
    return true;
  }

  /**
   * Get current session data
   * @returns {Object|null} Session data
   */
  getSessionData() {
    const sessionDataStr = sessionStorage.getItem('sessionData');
    if (!sessionDataStr) return null;
    
    try {
      return JSON.parse(sessionDataStr);
    } catch (e) {
      return null;
    }
  }

  /**
   * Extend session on user activity
   */
  extendSession() {
    const sessionData = this.getSessionData();
    if (!sessionData) return;
    
    // Update expiry time
    sessionData.expiryTime = Date.now() + this.SESSION_DURATION;
    sessionStorage.setItem('sessionData', JSON.stringify(sessionData));
  }

  /**
   * Get remaining session time in minutes
   * @returns {number} Minutes remaining
   */
  getRemainingTime() {
    const sessionData = this.getSessionData();
    if (!sessionData) return 0;
    
    const remaining = sessionData.expiryTime - Date.now();
    return Math.max(0, Math.floor(remaining / 60000));
  }

  /**
   * Start session monitoring
   */
  startSessionMonitoring() {
    this.clearTimers();
    
    const sessionData = this.getSessionData();
    if (!sessionData) return;
    
    const now = Date.now();
    const timeUntilWarning = sessionData.expiryTime - now - this.WARNING_TIME;
    const timeUntilExpiry = sessionData.expiryTime - now;
    
    // Set warning timer
    if (timeUntilWarning > 0) {
      this.warningTimer = setTimeout(() => {
        this.showSessionWarning();
      }, timeUntilWarning);
    } else if (timeUntilExpiry > 0 && timeUntilExpiry <= this.WARNING_TIME) {
      // Show warning immediately if already in warning period
      this.showSessionWarning();
    }
    
    // Set expiry timer
    if (timeUntilExpiry > 0) {
      this.sessionTimer = setTimeout(() => {
        this.showSessionExpiredMessage();
        this.logout();
      }, timeUntilExpiry);
    }
    
    // Periodic check
    this.activityCheckInterval = setInterval(() => {
      if (!this.checkSession()) {
        this.clearTimers();
      }
    }, this.CHECK_INTERVAL);
  }

  /**
   * Clear all timers
   */
  clearTimers() {
    if (this.sessionTimer) {
      clearTimeout(this.sessionTimer);
      this.sessionTimer = null;
    }
    
    if (this.warningTimer) {
      clearTimeout(this.warningTimer);
      this.warningTimer = null;
    }
    
    if (this.activityCheckInterval) {
      clearInterval(this.activityCheckInterval);
      this.activityCheckInterval = null;
    }
  }

  /**
   * Set up activity listeners to extend session
   */
  setupActivityListeners() {
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    
    let activityTimeout;
    events.forEach(event => {
      document.addEventListener(event, () => {
        clearTimeout(activityTimeout);
        
        // Debounce activity detection
        activityTimeout = setTimeout(() => {
          if (this.getSessionData()) {
            this.extendSession();
            this.startSessionMonitoring(); // Restart monitoring with new expiry
          }
        }, 1000);
      }, { passive: true });
    });
  }

  /**
   * Show session warning (5 minutes before expiry)
   */
  showSessionWarning() {
    const remaining = this.getRemainingTime();
    
    // Create or update warning toast
    this.showToast(
      `Your session will expire in ${remaining} minutes. Click anywhere to extend your session.`,
      'warning',
      60000 // Show for 1 minute
    );
  }

  /**
   * Show session expired message
   */
  showSessionExpiredMessage() {
    this.showToast(
      'Your session has expired. Please log in again.',
      'error',
      5000
    );
  }

  /**
   * Show toast notification
   */
  showToast(message, type = 'info', duration = 5000) {
    // Remove existing toast if any
    const existingToast = document.getElementById('session-toast');
    if (existingToast) {
      existingToast.remove();
    }
    
    // Determine alert class and title based on type
    let alertClass = 'alert-info';
    let title = 'Information';
    
    if (type === 'error' || type === 'danger') {
      alertClass = 'alert-danger';
      title = 'Session Expired';
    } else if (type === 'warning') {
      alertClass = 'alert-warning';
      title = 'Session Warning';
    } else if (type === 'success') {
      alertClass = 'alert-success';
      title = 'Success';
    } else if (type === 'info') {
      alertClass = 'alert-info';
      title = 'Information';
    }
    
    // Create toast element
    const toast = document.createElement('div');
    toast.id = 'session-toast';
    toast.className = `alert ${alertClass} alert-dismissible fade show position-fixed`;
    toast.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px; max-width: 400px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);';
    toast.innerHTML = `
      <strong>${title}</strong>
      <p class="mb-0">${message}</p>
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    
    document.body.appendChild(toast);
    
    // Auto-remove after duration
    if (duration > 0) {
      setTimeout(() => {
        if (toast.parentNode) {
          toast.classList.remove('show');
          setTimeout(() => {
            if (toast.parentNode) {
              toast.remove();
            }
          }, 150);
        }
      }, duration);
    }
  }

  /**
   * Check if user is logged in
   * @returns {boolean}
   */
  isLoggedIn() {
    try {
      // Quick check first
      const isLoggedInFlag = sessionStorage.getItem('isLoggedIn');
      if (isLoggedInFlag !== 'true') {
        return false;
      }
      
      const sessionData = this.getSessionData();
      if (!sessionData) {
        return false;
      }
      
      // Check if session is still valid
      const now = Date.now();
      if (now >= sessionData.expiryTime) {
        // Session expired - but don't call logout here to prevent redirect loops
        // Just return false
        return false;
      }
      
      return sessionData.isActive === true;
    } catch (error) {
      console.error('Error checking login status:', error);
      return false;
    }
  }

  /**
   * Get current username
   * @returns {string|null}
   */
  getUsername() {
    const sessionData = this.getSessionData();
    return sessionData ? sessionData.username : null;
  }
}

// Create global instance
window.SessionManager = new SessionManager();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SessionManager;
}

