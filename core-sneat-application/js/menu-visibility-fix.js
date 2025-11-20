/**
 * Menu Visibility Fix
 * Ensures the sidebar menu is visible after component load
 */
(function() {
  'use strict';
  
  function ensureMenuVisible() {
    const layoutMenuEl = document.querySelector('#layout-menu');
    const sidebarContainer = document.querySelector('#sidebar-container');
    
    if (layoutMenuEl) {
      // Ensure menu is visible
      layoutMenuEl.style.display = '';
      layoutMenuEl.style.visibility = 'visible';
      layoutMenuEl.style.opacity = '1';
      
      // Ensure sidebar container is visible
      if (sidebarContainer) {
        sidebarContainer.style.display = '';
        sidebarContainer.style.visibility = 'visible';
      }
    } else {
      // Menu not loaded yet, try again
      setTimeout(ensureMenuVisible, 200);
    }
  }
  
  // Run immediately and on various events
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ensureMenuVisible);
  } else {
    ensureMenuVisible();
  }
  
  // Also run after a delay to catch late-loading components
  setTimeout(ensureMenuVisible, 1000);
  setTimeout(ensureMenuVisible, 2000);
  
  // Run on window load
  window.addEventListener('load', ensureMenuVisible);
})();



