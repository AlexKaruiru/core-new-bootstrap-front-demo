/**
 * Storage Cleanup Utility
 * Ensures all storage is cleared on logout
 */
class StorageCleanup {
  /**
   * Clear all browser storage
   */
  static clearAll() {
    try {
      // Clear sessionStorage
      sessionStorage.clear();
      
      // Clear localStorage
      localStorage.clear();
      
      // Clear IndexedDB (if used)
      if ('indexedDB' in window) {
        indexedDB.databases().then(databases => {
          databases.forEach(db => {
            indexedDB.deleteDatabase(db.name);
          });
        });
      }
      
      // Clear cookies (if any)
      document.cookie.split(";").forEach(c => {
        document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
      });
      
      return true;
    } catch (error) {
      console.error('Error clearing storage:', error);
      return false;
    }
  }
  
  /**
   * Clear specific storage items
   * @param {Array} items - Array of item keys to clear
   */
  static clearSpecific(items = []) {
    items.forEach(item => {
      sessionStorage.removeItem(item);
      localStorage.removeItem(item);
    });
  }
  
  /**
   * Get all storage keys
   * @returns {Object} Object with sessionStorage and localStorage keys
   */
  static getAllKeys() {
    const sessionKeys = [];
    const localKeys = [];
    
    for (let i = 0; i < sessionStorage.length; i++) {
      sessionKeys.push(sessionStorage.key(i));
    }
    
    for (let i = 0; i < localStorage.length; i++) {
      localKeys.push(localStorage.key(i));
    }
    
    return {
      sessionStorage: sessionKeys,
      localStorage: localKeys
    };
  }
}

// Export for use in other modules
window.StorageCleanup = StorageCleanup;



