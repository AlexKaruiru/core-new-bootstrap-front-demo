/**
 * Banking Application Main Controller
 * Handles menu interactions and page loading
 */
class BankingApp {
  constructor() {
    this.init();
  }

  init() {
    // Wait for components to load
    document.addEventListener('DOMContentLoaded', () => {
      this.setupMenuListeners();
    });

    // Also check if DOM is already loaded
    if (document.readyState !== 'loading') {
      this.setupMenuListeners();
    }
  }

  setupMenuListeners() {
    // Use event delegation for menu links - wait for components to load
    setTimeout(() => {
      document.addEventListener('click', (e) => {
        const menuLink = e.target.closest('a.menu-link[data-page]');
        
        if (menuLink) {
          e.preventDefault();
          const pageId = menuLink.dataset.page;
          const title = menuLink.dataset.title || pageId;
          
          // Load the page in a tab
          if (window.BankingTabs) {
            window.BankingTabs.loadPage(pageId, title);
          }

          // Update active menu item
          this.updateActiveMenuItem(menuLink);
        }
      }, true);
    }, 500);
  }

  updateActiveMenuItem(activeLink) {
    // Remove active class from all menu items
    document.querySelectorAll('.menu-item').forEach(item => {
      item.classList.remove('active');
    });

    // Add active class to clicked item and its parent
    const menuItem = activeLink.closest('.menu-item');
    if (menuItem) {
      menuItem.classList.add('active');
      
      // Also activate parent menu if it's a submenu item
      const parentMenu = menuItem.closest('.menu-sub');
      if (parentMenu) {
        const parentMenuItem = parentMenu.closest('.menu-item');
        if (parentMenuItem) {
          parentMenuItem.classList.add('open');
        }
      }
    }
  }
}

// Initialize the app
window.BankingApp = new BankingApp();

