/**
 * App Initializer
 * Ensures proper initialization order and fixes common issues
 */
(function() {
  'use strict';

  let initializationComplete = false;

  function initializeApp() {
    if (initializationComplete) return;
    
    // Wait for all critical components
    const requiredComponents = [
      () => window.SessionManager,
      () => window.ComponentLoader,
      () => window.BankingTabs,
      () => window.BankingApp
    ];

    let checkCount = 0;
    const maxChecks = 50; // 5 seconds max wait

    function checkComponents() {
      checkCount++;
      
      const allReady = requiredComponents.every(check => check() !== undefined);
      
      if (allReady) {
        performInitialization();
      } else if (checkCount < maxChecks) {
        setTimeout(checkComponents, 100);
      } else {
        console.warn('Some components failed to load, continuing anyway...');
        performInitialization();
      }
    }

    function performInitialization() {
      // Components are now embedded directly in index.html, so we don't need to load them
      // Just initialize the menu since components are already in DOM
      initializeMenu();
      initializationComplete = true;
    }

    // Start checking
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', checkComponents);
    } else {
      checkComponents();
    }
  }

  function initializeMenu() {
    // Wait for component to be loaded
    setTimeout(() => {
      const layoutMenuEl = document.querySelector('#layout-menu');
      
      if (!layoutMenuEl) {
        // Menu not loaded yet, try again
        setTimeout(initializeMenu, 200);
        return;
      }
      
      // Ensure menu is visible
      layoutMenuEl.style.display = '';
      layoutMenuEl.style.visibility = 'visible';
      
      if (window.Menu && !layoutMenuEl.menuInstance) {
        try {
          const menu = new Menu(layoutMenuEl, {
            orientation: 'vertical',
            closeChildren: false
          });
          
          if (!window.Helpers) {
            window.Helpers = {};
          }
          window.Helpers.mainMenu = menu;
          
          // Initialize Perfect Scrollbar if not already done
          const menuInner = layoutMenuEl.querySelector('.menu-inner');
          if (menuInner && window.PerfectScrollbar && !menuInner.classList.contains('ps')) {
            const ps = new PerfectScrollbar(menuInner, {
              suppressScrollX: true,
              wheelPropagation: false
            });
            window.Helpers.menuPsScroll = ps;
          }
          
          // Scroll to active
          if (window.Helpers.scrollToActive) {
            window.Helpers.scrollToActive(false);
          }
        } catch (error) {
          console.error('Error initializing menu:', error);
        }
      }
    }, 500);
  }

  // Start initialization
  initializeApp();

  // Also try on window load as fallback
  window.addEventListener('load', () => {
    if (!initializationComplete) {
      setTimeout(initializeApp, 100);
    }
  });
})();

