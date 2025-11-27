/**
 * Responsive Handler
 * Handles mobile menu toggle and responsive behavior
 */
class ResponsiveHandler {
  constructor() {
    this.isMenuExpanded = false;
    this.init();
  }

  init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setupEventListeners());
    } else {
      this.setupEventListeners();
    }

    // Handle window resize
    window.addEventListener('resize', () => this.handleResize());
    
    // Initial check
    this.handleResize();
  }

  setupEventListeners() {
    // For Windows 7 style, use the Windows menu handler instead
    // Only set up if Windows menu handler is not available
    if (window.WindowsMenuHandler) {
      return; // Windows menu handler will take care of menu toggling
    }

    // Menu toggle buttons (fallback if Windows menu handler not available)
    const menuTogglers = document.querySelectorAll('.layout-menu-toggle');
    menuTogglers.forEach(toggler => {
      toggler.addEventListener('click', (e) => {
        e.preventDefault();
        this.toggleMenu();
      });
    });

    // Close menu when clicking overlay
    const overlay = document.querySelector('.layout-overlay');
    if (overlay) {
      overlay.addEventListener('click', () => {
        this.closeMenu();
      });
    }

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isMenuExpanded) {
        this.closeMenu();
      }
    });

    // Close menu when clicking outside on mobile
    document.addEventListener('click', (e) => {
      if (this.isMenuExpanded && window.innerWidth < 1200) {
        const menu = document.querySelector('#layout-menu');
        const clickedInsideMenu = menu && menu.contains(e.target);
        const clickedToggle = e.target.closest('.layout-menu-toggle');
        
        if (!clickedInsideMenu && !clickedToggle) {
          this.closeMenu();
        }
      }
    });
  }

  toggleMenu() {
    if (this.isMenuExpanded) {
      this.closeMenu();
    } else {
      this.openMenu();
    }
  }

  openMenu() {
    if (window.innerWidth < 1200) {
      document.documentElement.classList.add('layout-menu-expanded');
      document.body.classList.add('layout-menu-expanded');
      this.isMenuExpanded = true;
      
      // Add transition class
      document.documentElement.classList.add('layout-transitioning');
      setTimeout(() => {
        document.documentElement.classList.remove('layout-transitioning');
      }, 300);
    }
  }

  closeMenu() {
    document.documentElement.classList.remove('layout-menu-expanded');
    document.body.classList.remove('layout-menu-expanded');
    this.isMenuExpanded = false;
    
    // Add transition class
    document.documentElement.classList.add('layout-transitioning');
    setTimeout(() => {
      document.documentElement.classList.remove('layout-transitioning');
    }, 300);
  }

  handleResize() {
    // Auto-close menu on resize if screen becomes large
    if (window.innerWidth >= 1200 && this.isMenuExpanded) {
      this.closeMenu();
    }
    
    // Update Perfect Scrollbar on resize
    if (window.Helpers && window.Helpers.menuPsScroll) {
      window.Helpers.menuPsScroll.update();
    }
  }

  isSmallScreen() {
    return window.innerWidth < 1200;
  }

  isMobileDevice() {
    return typeof window.orientation !== 'undefined' || 
           navigator.userAgent.indexOf('IEMobile') !== -1 ||
           /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }
}

// Create global instance
window.ResponsiveHandler = new ResponsiveHandler();




