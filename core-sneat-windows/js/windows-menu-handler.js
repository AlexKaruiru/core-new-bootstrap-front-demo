/**
 * Windows Menu Handler
 * Implements Windows 7-style Start button menu toggle functionality
 */
class WindowsMenuHandler {
  constructor() {
    this.isMenuVisible = false;
    this.startButton = null;
    this.init();
  }

  init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setup());
    } else {
      this.setup();
    }
  }

  setup() {
    // Wait a bit for all elements to be rendered
    setTimeout(() => {
      this.initializeStartButton();
      this.setupOverlay();
      this.loadMenuState();
      this.setupEscapeKey();
      this.setupClickOutside();
      // Ensure menu is ready for interaction
      this.ensureMenuStructure();
    }, 100);
  }

  /**
   * Ensure menu structure is properly set up
   */
  ensureMenuStructure() {
    const menu = document.getElementById('layout-menu');
    if (!menu) return;

    // Ensure menu-inner exists and is properly configured
    let menuInner = menu.querySelector('.menu-inner');
    if (!menuInner) {
      // If menu-inner doesn't exist, create it or find it
      const menuItems = menu.querySelector('ul');
      if (menuItems) {
        menuInner = menuItems;
        menuInner.classList.add('menu-inner');
      }
    }

    if (menuInner) {
      // Ensure it's scrollable
      menuInner.style.overflowY = 'auto';
      menuInner.style.overflowX = 'hidden';
      menuInner.style.flex = '1';
      menuInner.style.minHeight = '0';
    }

    // Ensure all menu links are properly set up
    const menuLinks = menu.querySelectorAll('.menu-link');
    menuLinks.forEach(link => {
      link.style.cursor = 'pointer';
      link.style.pointerEvents = 'auto';
      // Ensure links don't have any blocking styles
      if (link.style.display === 'none') {
        link.style.display = '';
      }
    });
  }

  /**
   * Initialize Start button
   */
  initializeStartButton() {
    this.startButton = document.getElementById('windows-start-button');
    if (!this.startButton) {
      console.warn('Windows Start button not found');
      return;
    }

    this.startButton.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.toggleMenu();
    });

    // Add hover effect
    this.startButton.addEventListener('mouseenter', () => {
      if (!this.isMenuVisible) {
        this.startButton.classList.add('hover');
      }
    });

    this.startButton.addEventListener('mouseleave', () => {
      this.startButton.classList.remove('hover');
    });

    // Also handle navbar toggle button (mobile menu button in navbar)
    const navbarToggle = document.querySelector('.windows-navbar-toggle');
    if (navbarToggle) {
      const toggleLink = navbarToggle.querySelector('a');
      if (toggleLink) {
        toggleLink.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          this.toggleMenu();
        });
      }
    }
  }

  /**
   * Setup overlay click handler (only on mobile)
   */
  setupOverlay() {
    const overlay = document.querySelector('.layout-overlay');
    if (overlay) {
      overlay.addEventListener('click', () => {
        // Only close menu on overlay click if on mobile (where overlay is shown)
        if (this.isSmallScreen()) {
          this.closeMenu();
        }
      });
    }
  }

  /**
   * Check if screen is small (mobile/tablet)
   */
  isSmallScreen() {
    return window.innerWidth < 768; // Very small screens only
  }

  /**
   * Setup Escape key to close menu
   */
  setupEscapeKey() {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isMenuVisible) {
        this.closeMenu();
      }
    });
  }

  /**
   * Setup click outside menu to close (only on mobile where menu overlays)
   */
  setupClickOutside() {
    document.addEventListener('click', (e) => {
      if (!this.isMenuVisible) return;

      // Only auto-close on mobile where menu overlays
      // On desktop, menu is always visible and pushes content, so don't auto-close
      if (!this.isSmallScreen()) {
        return; // Don't auto-close on desktop
      }

      const menu = document.getElementById('layout-menu');
      const clickedInsideMenu = menu && menu.contains(e.target);
      const clickedStartButton = this.startButton && this.startButton.contains(e.target);
      
      // Allow menu link clicks to work - don't close immediately on link click
      const clickedMenuLink = e.target.closest('a.menu-link');
      
      // If clicking a menu link that navigates to a page, close menu after a short delay
      if (clickedMenuLink && clickedMenuLink.dataset.page) {
        // Allow the click event to propagate first, then close menu
        setTimeout(() => {
          this.closeMenu();
        }, 300);
        return;
      }

      // If clicking menu toggle (expand/collapse submenu), don't close
      if (clickedMenuLink && clickedMenuLink.classList.contains('menu-toggle')) {
        return;
      }

      if (!clickedInsideMenu && !clickedStartButton) {
        this.closeMenu();
      }
    });
  }

  /**
   * Toggle menu visibility
   */
  toggleMenu() {
    if (this.isMenuVisible) {
      this.closeMenu();
    } else {
      this.openMenu();
    }
  }

  /**
   * Open menu
   */
  openMenu() {
    this.isMenuVisible = true;
    document.documentElement.classList.remove('windows-menu-hidden');
    document.documentElement.classList.add('windows-menu-visible');
    
    if (this.startButton) {
      this.startButton.classList.add('active');
    }

    // Only prevent body scrolling on mobile when menu overlays
    // On desktop, menu pushes content so body can scroll normally
    if (this.isSmallScreen()) {
      this.preventBodyScroll(true);
      this.setupMenuScrollPrevention();
    }

    // Wait for menu to be visible before setting up
    setTimeout(() => {
      // Ensure native scrollbar is properly configured (no Perfect Scrollbar)
      this.initializeScrollbar(document.querySelector('.layout-menu .menu-inner'));
      this.ensureMenuClickable();
      if (!this.isSmallScreen()) {
        // On desktop, still prevent menu scroll from affecting body
        this.setupMenuScrollPrevention();
      }
    }, 100);

    // Save state
    this.saveMenuState(true);
  }

  /**
   * Close menu
   */
  closeMenu() {
    this.isMenuVisible = false;
    document.documentElement.classList.remove('windows-menu-visible');
    document.documentElement.classList.add('windows-menu-hidden');
    
    if (this.startButton) {
      this.startButton.classList.remove('active');
    }

    // Re-enable body scrolling when menu is closed
    this.preventBodyScroll(false);

    // Save state
    this.saveMenuState(false);
  }

  /**
   * Update scrollbar (now just ensures native scrollbar is properly configured)
   */
  updateScrollbar() {
    const menuInner = document.querySelector('.layout-menu .menu-inner');
    if (!menuInner) {
      // Try to find menu inner with a delay
      setTimeout(() => {
        const retryMenuInner = document.querySelector('.layout-menu .menu-inner');
        if (retryMenuInner) {
          this.initializeScrollbar(retryMenuInner);
        }
      }, 200);
      return;
    }

    this.initializeScrollbar(menuInner);
  }

  /**
   * Initialize scrollbar for menu inner
   */
  initializeScrollbar(menuInner) {
    // Ensure menu inner is visible and has dimensions
    if (!menuInner.offsetParent && menuInner.offsetHeight === 0) {
      // Menu might not be visible yet, try again
      setTimeout(() => {
        this.initializeScrollbar(menuInner);
      }, 100);
      return;
    }

    // Destroy any existing Perfect Scrollbar instances - we're using native scrollbar
    if (menuInner.psScrollbar) {
      try {
        menuInner.psScrollbar.destroy();
        menuInner.psScrollbar = null;
      } catch (e) {
        // Ignore errors
      }
    }

    // Remove Perfect Scrollbar observer if it exists
    if (menuInner.psObserver) {
      try {
        menuInner.psObserver.disconnect();
        menuInner.psObserver = null;
      } catch (e) {
        // Ignore errors
      }
    }

    // Ensure native scrollbar is visible and styled
    menuInner.style.overflowY = 'auto';
    menuInner.style.overflowX = 'hidden';
    menuInner.style.webkitOverflowScrolling = 'touch';
    menuInner.style.scrollbarWidth = 'thin'; // Firefox - use thin scrollbar
    menuInner.style.scrollbarColor = '#b8b8b8 #e8e8e8'; // Firefox - thumb and track

    // Prevent scroll events from bubbling to body (native scrollbar)
    menuInner.addEventListener('wheel', (e) => {
      e.stopPropagation();
    }, { passive: false });
  }

  /**
   * Ensure menu items are clickable
   */
  ensureMenuClickable() {
    const menu = document.getElementById('layout-menu');
    if (!menu) return;

    // Ensure menu and all links are clickable
    menu.style.pointerEvents = 'auto';
    
    const menuLinks = menu.querySelectorAll('.menu-link');
    menuLinks.forEach(link => {
      link.style.pointerEvents = 'auto';
      link.style.cursor = 'pointer';
    });

    // Ensure menu-inner is scrollable
    const menuInner = menu.querySelector('.menu-inner');
    if (menuInner) {
      menuInner.style.pointerEvents = 'auto';
      menuInner.style.overflowY = 'auto';
    }
  }

  /**
   * Save menu state to localStorage
   */
  saveMenuState(visible) {
    try {
      localStorage.setItem('windowsMenuVisible', visible.toString());
    } catch (e) {
      // Ignore localStorage errors
    }
  }

  /**
   * Load menu state from localStorage
   */
  loadMenuState() {
    try {
      const savedState = localStorage.getItem('windowsMenuVisible');
      // Default: menu is hidden
      if (savedState === 'true') {
        this.openMenu();
      } else {
        this.closeMenu();
      }
    } catch (e) {
      // Default: menu is hidden
      this.closeMenu();
    }
  }

  /**
   * Handle window resize
   */
  handleResize() {
    // Ensure native scrollbar is properly configured on resize
    if (this.isMenuVisible) {
      setTimeout(() => {
        const menuInner = document.querySelector('.layout-menu .menu-inner');
        if (menuInner) {
          this.initializeScrollbar(menuInner);
        }
      }, 100);
    }
  }

  /**
   * Prevent or allow body scrolling
   */
  preventBodyScroll(prevent) {
    if (prevent) {
      // Save current scroll position
      this.savedScrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      
      // Prevent scrolling on body
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.height = '100%';
      document.body.style.top = `-${this.savedScrollPosition}px`;
      
      // Also prevent on html element
      document.documentElement.style.overflow = 'hidden';
      document.documentElement.style.height = '100%';
      
      // Prevent scrolling on layout page
      const layoutPage = document.querySelector('.layout-page');
      if (layoutPage) {
        layoutPage.style.overflow = 'hidden';
      }
      
      // Prevent scrolling on content wrapper
      const contentWrapper = document.querySelector('.content-wrapper');
      if (contentWrapper) {
        contentWrapper.style.overflow = 'hidden';
      }
    } else {
      // Restore body scrolling
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.height = '';
      document.body.style.top = '';
      document.documentElement.style.overflow = '';
      document.documentElement.style.height = '';
      
      // Restore layout page scrolling
      const layoutPage = document.querySelector('.layout-page');
      if (layoutPage) {
        layoutPage.style.overflow = '';
      }
      
      // Restore content wrapper scrolling
      const contentWrapper = document.querySelector('.content-wrapper');
      if (contentWrapper) {
        contentWrapper.style.overflow = '';
      }
      
      // Restore scroll position with a small delay to ensure styles are applied
      if (this.savedScrollPosition !== undefined) {
        setTimeout(() => {
          window.scrollTo(0, this.savedScrollPosition);
          this.savedScrollPosition = undefined;
        }, 10);
      }
    }
  }

  /**
   * Setup scroll event prevention for menu
   */
  setupMenuScrollPrevention() {
    const menu = document.getElementById('layout-menu');
    const menuInner = menu ? menu.querySelector('.menu-inner') : null;
    
    if (!menuInner) return;

    // Stop scroll events from propagating to body
    menuInner.addEventListener('wheel', (e) => {
      // Check if we're at the scroll boundaries
      const isScrollingUp = e.deltaY < 0;
      const isScrollingDown = e.deltaY > 0;
      const isAtTop = menuInner.scrollTop <= 0;
      const isAtBottom = menuInner.scrollTop >= (menuInner.scrollHeight - menuInner.clientHeight);

      // If at boundary and trying to scroll further, prevent default
      if ((isAtTop && isScrollingUp) || (isAtBottom && isScrollingDown)) {
        // Allow scrolling to continue but prevent body scroll
        e.stopPropagation();
      } else {
        // Normal scroll - stop propagation to prevent body scrolling
        e.stopPropagation();
      }
    }, { passive: false });

    // Prevent touch scroll from propagating
    let touchStartY = 0;
    menuInner.addEventListener('touchstart', (e) => {
      touchStartY = e.touches[0].clientY;
    }, { passive: true });

    menuInner.addEventListener('touchmove', (e) => {
      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY - touchY;
      
      const isScrollingUp = deltaY < 0;
      const isScrollingDown = deltaY > 0;
      const isAtTop = menuInner.scrollTop <= 0;
      const isAtBottom = menuInner.scrollTop >= (menuInner.scrollHeight - menuInner.clientHeight);

      // If at boundary, prevent default to stop body scroll
      if ((isAtTop && isScrollingUp) || (isAtBottom && isScrollingDown)) {
        e.preventDefault();
      } else {
        // Stop propagation to prevent body scroll
        e.stopPropagation();
      }
    }, { passive: false });

    // Prevent scroll events on the menu container itself
    menu.addEventListener('wheel', (e) => {
      e.stopPropagation();
    }, { passive: false });

    menu.addEventListener('touchmove', (e) => {
      e.stopPropagation();
    }, { passive: false });
  }
}

// Create global instance
window.WindowsMenuHandler = new WindowsMenuHandler();

// Handle window resize
let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    if (window.WindowsMenuHandler) {
      window.WindowsMenuHandler.handleResize();
    }
  }, 100);
});

