/**
 * Menu Collapse Handler
 * Implements Sneat-style menu collapse functionality
 */
class MenuCollapseHandler {
  constructor() {
    this.isCollapsed = false;
    this.isProcessing = false; // Flag to prevent infinite loops
    this.init();
  }

  init() {
    // Wait for DOM and components to load
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setup());
    } else {
      this.setup();
    }
  }

  setup() {
    // For Windows 7 style, skip the collapse handler
    // The Windows menu handler manages menu visibility
    if (window.WindowsMenuHandler) {
      return; // Windows menu handler takes precedence
    }

    // Wait for sidebar to load
    setTimeout(() => {
      this.initializeMenuToggle();
      this.loadCollapsedState();
    }, 500);
  }

  /**
   * Initialize menu toggle buttons
   */
  initializeMenuToggle() {
    const menuTogglers = document.querySelectorAll('.layout-menu-toggle');
    
    menuTogglers.forEach(toggler => {
      toggler.addEventListener('click', (e) => {
        e.preventDefault();
        this.toggleCollapsed();
      });
    });

    // Handle menu hover on desktop (expand collapsed menu on hover)
    const layoutMenu = document.getElementById('layout-menu');
    if (layoutMenu) {
      layoutMenu.addEventListener('mouseenter', () => {
        if (this.isCollapsed && !this.isSmallScreen()) {
          document.documentElement.classList.add('layout-menu-hover');
        }
      });

      layoutMenu.addEventListener('mouseleave', () => {
        document.documentElement.classList.remove('layout-menu-hover');
      });
    }
  }

  /**
   * Toggle menu collapsed state
   */
  toggleCollapsed(animate = true) {
    this.setCollapsed(!this.isCollapsed, animate);
  }

  /**
   * Set menu collapsed state
   */
  setCollapsed(collapsed, animate = true, skipResize = false) {
    // Prevent infinite loops
    if (this.isProcessing) {
      return;
    }
    
    this.isProcessing = true;
    this.isCollapsed = collapsed;
    
    if (animate) {
      document.documentElement.classList.add('layout-transitioning');
    }

    if (collapsed) {
      document.documentElement.classList.add('layout-menu-collapsed');
      document.documentElement.classList.remove('layout-menu-expanded');
    } else {
      document.documentElement.classList.remove('layout-menu-collapsed');
      if (this.isSmallScreen()) {
        document.documentElement.classList.add('layout-menu-expanded');
      }
    }

    // Save state to localStorage
    localStorage.setItem('menuCollapsed', collapsed.toString());

    // Remove transition class after animation
    if (animate) {
      setTimeout(() => {
        document.documentElement.classList.remove('layout-transitioning');
        this.isProcessing = false;
        // Only trigger resize if not skipping
        if (!skipResize) {
          window.dispatchEvent(new Event('resize'));
        }
      }, 300);
    } else {
      this.isProcessing = false;
      // Only trigger resize if not skipping
      if (!skipResize) {
        window.dispatchEvent(new Event('resize'));
      }
    }
  }

  /**
   * Load collapsed state from localStorage
   */
  loadCollapsedState() {
    // Don't collapse on small screens
    if (this.isSmallScreen()) {
      return;
    }

    const savedState = localStorage.getItem('menuCollapsed');
    if (savedState !== null) {
      const collapsed = savedState === 'true';
      // Skip resize event to prevent infinite loop
      this.setCollapsed(collapsed, false, true);
    } else {
      // Default: not collapsed
      // Skip resize event to prevent infinite loop
      this.setCollapsed(false, false, true);
    }
  }

  /**
   * Check if screen is small
   */
  isSmallScreen() {
    return window.innerWidth < 1200;
  }

  /**
   * Handle window resize
   */
  handleResize() {
    // Prevent infinite loops
    if (this.isProcessing) {
      return;
    }
    
    if (this.isSmallScreen()) {
      // On small screens, menu is always hidden (overlay mode)
      document.documentElement.classList.remove('layout-menu-collapsed');
      this.isCollapsed = false;
    } else {
      // On larger screens, just ensure classes are correct based on current state
      // Don't reload from localStorage here to avoid loops
      if (this.isCollapsed) {
        document.documentElement.classList.add('layout-menu-collapsed');
        document.documentElement.classList.remove('layout-menu-expanded');
      } else {
        document.documentElement.classList.remove('layout-menu-collapsed');
      }
    }
  }
}

// Create global instance
window.MenuCollapseHandler = new MenuCollapseHandler();

// Handle window resize with debouncing to prevent excessive calls
let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    if (window.MenuCollapseHandler) {
      window.MenuCollapseHandler.handleResize();
    }
  }, 100);
});

