/**
 * Component Loader
 * Loads HTML components and injects them into the page
 */
class ComponentLoader {
  constructor() {
    this.componentsPath = 'components/';
    this.loadedComponents = new Set();
  }

  /**
   * Load a component and inject it into a target element
   * @param {string} componentName - Name of the component file (without .html)
   * @param {string} targetSelector - CSS selector for the target element
   * @param {Function} callback - Optional callback function after component is loaded
   */
  async loadComponent(componentName, targetSelector, callback) {
    // Check if component is already loaded
    if (this.loadedComponents.has(componentName)) {
      if (callback) callback();
      return;
    }

    try {
      console.log(`Loading component: ${componentName} into ${targetSelector}`);
      const response = await fetch(`${this.componentsPath}${componentName}.html`);
      
      if (!response.ok) {
        throw new Error(`Failed to load component: ${componentName} - Status: ${response.status}`);
      }

      const html = await response.text();
      const targetElement = document.querySelector(targetSelector);

      if (!targetElement) {
        throw new Error(`Target element not found: ${targetSelector}`);
      }

      // Inject the HTML
      targetElement.innerHTML = html;
      console.log(`Component ${componentName} loaded successfully`);
      
      // Mark as loaded
      this.loadedComponents.add(componentName);

      // Execute scripts in the loaded component
      this.executeScripts(targetElement);

      // Initialize component-specific functionality
      this.initializeComponent(componentName, targetElement);

      if (callback) callback();
    } catch (error) {
      console.error(`Error loading component ${componentName}:`, error);
    }
  }

  /**
   * Execute scripts within a loaded component
   * @param {HTMLElement} element - The element containing scripts
   */
  executeScripts(element) {
    const scripts = element.querySelectorAll('script');
    scripts.forEach((oldScript) => {
      const newScript = document.createElement('script');
      Array.from(oldScript.attributes).forEach((attr) => {
        newScript.setAttribute(attr.name, attr.value);
      });
      newScript.appendChild(document.createTextNode(oldScript.innerHTML));
      oldScript.parentNode.replaceChild(newScript, oldScript);
    });
  }

  /**
   * Initialize component-specific functionality
   * @param {string} componentName - Name of the component
   * @param {HTMLElement} element - The loaded component element
   */
  initializeComponent(componentName, element) {
    switch (componentName) {
      case 'navbar':
        this.initializeNavbar(element);
        break;
      case 'sidebar':
        this.initializeSidebar(element);
        break;
      case 'footer':
        this.initializeFooter(element);
        break;
    }
  }

  /**
   * Initialize navbar-specific functionality
   */
  initializeNavbar(element) {
    // Update current date
    const dateElement = element.querySelector('#current-date');
    if (dateElement) {
      const now = new Date();
      const options = { day: '2-digit', month: 'short', year: 'numeric' };
      dateElement.textContent = now.toLocaleDateString('en-GB', options);
    }
    
    // Update username from session if available
    if (window.SessionManager) {
      const username = window.SessionManager.getUsername();
      if (username) {
        // Update username in navbar
        const usernameElement = element.querySelector('#navbar-username');
        if (usernameElement) {
          usernameElement.textContent = username.toUpperCase();
        }
        // Also update any other username elements
        const usernameElements = element.querySelectorAll('.fw-semibold.d-block');
        usernameElements.forEach(el => {
          if (el.id !== 'navbar-username' && (el.textContent.trim() === 'CSADM' || el.textContent.trim() === 'Administrator')) {
            el.textContent = username.toUpperCase();
          }
        });
      }
    }
    
    // Setup logout button handler for dynamically loaded navbar
    const logoutBtn = element.querySelector('#logout-btn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        if (window.SessionManager) {
          window.SessionManager.logout();
        } else if (window.StorageCleanup) {
          window.StorageCleanup.clearAll();
          window.location.href = 'login.html';
        } else {
          // Fallback
          sessionStorage.clear();
          localStorage.clear();
          window.location.href = 'login.html';
        }
      });
    }
  }

  /**
   * Initialize sidebar-specific functionality
   */
  initializeSidebar(element) {
    // Wait a bit for DOM to settle, then initialize menu like Sneat does
    setTimeout(() => {
      this.initializeMenu(element);
    }, 100);
  }
  
  /**
   * Initialize menu following Sneat's pattern
   */
  initializeMenu(element) {
    const layoutMenuEl = element.querySelector('#layout-menu');
    if (!layoutMenuEl) return;
    
    // Initialize Menu class from Sneat (exactly like main.js)
    if (window.Menu && !layoutMenuEl.menuInstance) {
      try {
        const menu = new Menu(layoutMenuEl, {
          orientation: 'vertical',
          closeChildren: false
        });
        
        // Store menu instance (like Sneat does)
        if (!window.Helpers) {
          window.Helpers = {};
        }
        window.Helpers.mainMenu = menu;
        
        // Scroll to active menu item
        if (window.Helpers.scrollToActive) {
          window.Helpers.scrollToActive(false);
        }
      } catch (error) {
        console.error('Error initializing menu:', error);
      }
    }
    
    // Initialize Perfect Scrollbar for menu (like Sneat does)
    if (window.PerfectScrollbar) {
      const menuInner = layoutMenuEl.querySelector('.menu-inner');
      if (menuInner && !menuInner.classList.contains('ps')) {
        const ps = new PerfectScrollbar(menuInner, {
          suppressScrollX: true,
          wheelPropagation: !Menu._hasClass('layout-menu-fixed layout-menu-fixed-offcanvas')
        });
        
        // Store scrollbar reference
        if (window.Helpers) {
          window.Helpers.menuPsScroll = ps;
        }
        
        // Show/hide menu shadow on scroll (like Sneat does)
        const menuShadow = layoutMenuEl.querySelector('.menu-inner-shadow');
        if (menuShadow) {
          menuInner.addEventListener('ps-scroll-y', function() {
            const thumb = menuInner.querySelector('.ps__thumb-y');
            if (thumb && thumb.offsetTop) {
              menuShadow.style.display = 'block';
            } else {
              menuShadow.style.display = 'none';
            }
          });
        }
      }
    }
    
    // Initialize menu toggle buttons (like Sneat does)
    const menuTogglers = layoutMenuEl.querySelectorAll('.layout-menu-toggle');
    menuTogglers.forEach(toggler => {
      toggler.addEventListener('click', (e) => {
        e.preventDefault();
        if (window.Helpers && window.Helpers.toggleCollapsed) {
          window.Helpers.toggleCollapsed();
        }
      });
    });
    
    // Ensure menu is visible
    if (layoutMenuEl) {
      layoutMenuEl.style.display = '';
      layoutMenuEl.style.visibility = 'visible';
    }
  }

  /**
   * Initialize footer-specific functionality
   */
  initializeFooter(element) {
    // Footer-specific initialization can go here
  }

  /**
   * Load all default components for the layout
   */
  async loadLayout() {
    try {
      console.log('Loading layout components...');
      await Promise.all([
        this.loadComponent('sidebar', '#sidebar-container'),
        this.loadComponent('navbar', '#navbar-container'),
        this.loadComponent('footer', '#footer-container')
      ]);
      console.log('All layout components loaded successfully');
      
      // Initialize menu after sidebar loads - following Sneat's pattern
      setTimeout(() => {
        this.initializeMenuAfterLoad();
      }, 200);
    } catch (error) {
      console.error('Error loading layout:', error);
      // Try to show error in UI
      const sidebarContainer = document.querySelector('#sidebar-container');
      if (sidebarContainer && sidebarContainer.innerHTML.trim() === '') {
        sidebarContainer.innerHTML = '<div class="alert alert-danger">Error loading sidebar. Please refresh the page.</div>';
      }
    }
  }
  
  /**
   * Initialize menu after all components are loaded - Following Sneat's main.js pattern
   */
  initializeMenuAfterLoad() {
    // Wait for Menu class to be available
    if (!window.Menu) {
      setTimeout(() => this.initializeMenuAfterLoad(), 100);
      return;
    }
    
    const layoutMenuEl = document.querySelector('#layout-menu');
    if (!layoutMenuEl) {
      setTimeout(() => this.initializeMenuAfterLoad(), 100);
      return;
    }
    
    // Ensure menu is visible
    layoutMenuEl.style.display = '';
    layoutMenuEl.style.visibility = 'visible';
    layoutMenuEl.style.opacity = '1';
    
    try {
      // Check if menu is already initialized
      if (layoutMenuEl.menuInstance) {
        return;
      }
      
      // Initialize exactly like Sneat's main.js
      const menu = new Menu(layoutMenuEl, {
        orientation: 'vertical',
        closeChildren: false
      });
      
      // Store menu instance (like Sneat does)
      if (!window.Helpers) {
        window.Helpers = {};
      }
      window.Helpers.mainMenu = menu;
      
      // Scroll to active menu item (like Sneat does)
      if (window.Helpers.scrollToActive) {
        window.Helpers.scrollToActive(false);
      }
      
      // Initialize menu togglers (like Sneat does)
      const menuTogglers = layoutMenuEl.querySelectorAll('.layout-menu-toggle');
      menuTogglers.forEach(item => {
        item.addEventListener('click', event => {
          event.preventDefault();
          if (window.Helpers && window.Helpers.toggleCollapsed) {
            window.Helpers.toggleCollapsed();
          }
        });
      });
    } catch (error) {
      console.error('Error initializing menu:', error);
    }
  }
}

// Create global instance
window.ComponentLoader = new ComponentLoader();

// Components are now embedded directly in index.html to avoid CORS issues
// This auto-loader is kept for backward compatibility but won't be used
// Initialize menu directly since components are already in DOM
(function() {
  function initializeMenuDirectly() {
    if (window.location.pathname.includes('login.html')) {
      return;
    }
    
    // Wait for Menu class and DOM
    if (!window.Menu || !document.querySelector('#layout-menu')) {
      setTimeout(initializeMenuDirectly, 100);
      return;
    }
    
    const layoutMenuEl = document.querySelector('#layout-menu');
    if (layoutMenuEl && !layoutMenuEl.menuInstance) {
      try {
        const menu = new Menu(layoutMenuEl, {
          orientation: 'vertical',
          closeChildren: false
        });
        
        if (!window.Helpers) {
          window.Helpers = {};
        }
        window.Helpers.mainMenu = menu;
        
        if (window.Helpers.scrollToActive) {
          window.Helpers.scrollToActive(false);
        }
      } catch (error) {
        console.error('Error initializing menu:', error);
      }
    }
  }
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeMenuDirectly);
  } else {
    setTimeout(initializeMenuDirectly, 200);
  }
})();

