/**
 * Auth Guard
 * Provides additional authentication checking and redirect functionality
 */
(function() {
  'use strict';

  const AuthGuard = {
    /**
     * Check if user has any session information
     * @returns {boolean}
     */
    hasSessionInfo() {
      const isLoggedIn = sessionStorage.getItem('isLoggedIn');
      const sessionData = sessionStorage.getItem('sessionData');
      const username = sessionStorage.getItem('username');
      
      return isLoggedIn === 'true' || sessionData !== null || username !== null;
    },

    /**
     * Check if user is authenticated (has valid session)
     * @returns {boolean}
     */
    isAuthenticated() {
      // Quick check first
      if (!this.hasSessionInfo()) {
        return false;
      }

      // Use SessionManager if available
      if (window.SessionManager) {
        try {
          return window.SessionManager.isLoggedIn();
        } catch (error) {
          console.error('Error checking authentication:', error);
          return false;
        }
      }

      // Fallback: check session data manually
      try {
        const sessionDataStr = sessionStorage.getItem('sessionData');
        if (!sessionDataStr) {
          return false;
        }

        const sessionData = JSON.parse(sessionDataStr);
        const now = Date.now();

        // Check if session is expired
        if (now >= sessionData.expiryTime) {
          return false;
        }

        // Check if session is active
        return sessionData.isActive === true;
      } catch (error) {
        console.error('Error parsing session data:', error);
        return false;
      }
    },

    /**
     * Redirect to login page if not authenticated
     * @param {boolean} forceRedirect - Force redirect even if already on login page
     */
    requireAuth(forceRedirect = false) {
      if (!this.isAuthenticated()) {
        const isLoginPage = window.location.pathname.includes('login.html');
        
        if (!isLoginPage || forceRedirect) {
          window.location.replace('login.html');
        }
        return false;
      }
      return true;
    },

    /**
     * Redirect to main app if already authenticated
     */
    redirectIfAuthenticated() {
      if (this.isAuthenticated()) {
        const isLoginPage = window.location.pathname.includes('login.html');
        
        if (isLoginPage) {
          window.location.replace('index.html');
        }
        return true;
      }
      return false;
    }
  };

  // Export to window
  window.AuthGuard = AuthGuard;
})();




