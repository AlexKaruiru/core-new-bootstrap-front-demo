/**
 * Banking Tab System
 * Manages the tabbed interface for multiple open screens
 */
class BankingTabs {
  constructor() {
    this.tabs = new Map(); // Map of tabId -> {title, page, element}
    this.activeTabId = null;
    this.tabCounter = 0;
    this.tabBar = document.getElementById('tab-bar');
    this.tabContentArea = document.getElementById('tab-content-area');
    
    this.init();
  }

  async init() {
    // Wait for DashboardContent to be available
    let retries = 0;
    while (!window.DashboardContent && retries < 20) {
      await new Promise(resolve => setTimeout(resolve, 100));
      retries++;
    }
    
    // Create default home tab with async content loading
    const homeContent = await this.getDefaultHomeContent();
    this.createTab('home', 'Home', homeContent);
    this.setActiveTab('home');
    
    // Initialize dashboard charts after content is loaded
    setTimeout(() => {
      this.initializeDashboardCharts();
    }, 500);
  }
  
  /**
   * Initialize dashboard charts and analytics
   * Uses Sneat's dashboard-analytics.js pattern
   */
  initializeDashboardCharts() {
    // Check if ApexCharts and config are available
    if (typeof ApexCharts === 'undefined') {
      console.warn('ApexCharts not loaded');
      return;
    }
    
    if (typeof config === 'undefined') {
      console.warn('Config not loaded');
      return;
    }
    
    // Wait a bit for DOM to be ready, then initialize charts
    setTimeout(() => {
      // Re-run dashboard-analytics.js initialization
      if (window.dashboardAnalyticsInitialized) {
        return; // Already initialized
      }
      
      // Charts will be initialized by dashboard-analytics.js
      // Just ensure it runs
      window.dashboardAnalyticsInitialized = true;
    }, 500);
  }
  
  /**
   * Initialize transaction volume chart
   */
  initTransactionChart() {
    const totalRevenueChartEl = document.querySelector('#totalRevenueChart');
    if (!totalRevenueChartEl) return;
    
    const totalRevenueChartOptions = {
      series: [
        {
          name: '2024',
          data: [18, 7, 15, 29, 18, 12, 9]
        },
        {
          name: '2023',
          data: [-13, -18, -9, -14, -5, -17, -15]
        }
      ],
      chart: {
        height: 300,
        stacked: true,
        type: 'bar',
        toolbar: { show: false }
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '33%',
          borderRadius: 12,
          startingShape: 'rounded',
          endingShape: 'rounded'
        }
      },
      colors: [config.colors.primary, config.colors.info],
      dataLabels: { enabled: false },
      stroke: {
        curve: 'smooth',
        width: 6,
        lineCap: 'round',
        colors: [config.colors.white]
      },
      legend: {
        show: true,
        horizontalAlign: 'left',
        position: 'top',
        markers: {
          height: 8,
          width: 8,
          radius: 12,
          offsetX: -3
        },
        labels: { colors: config.colors.axisColor },
        itemMargin: { horizontal: 10 }
      },
      grid: {
        borderColor: config.colors.borderColor,
        padding: { top: 0, bottom: -8, left: 20, right: 20 }
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        labels: { style: { fontSize: '13px', colors: config.colors.axisColor } },
        axisTicks: { show: false },
        axisBorder: { show: false }
      },
      yaxis: {
        labels: { style: { fontSize: '13px', colors: config.colors.axisColor } }
      }
    };
    
    const totalRevenueChart = new ApexCharts(totalRevenueChartEl, totalRevenueChartOptions);
    totalRevenueChart.render();
  }
  
  /**
   * Initialize growth chart
   */
  initGrowthChart() {
    const growthChartEl = document.querySelector('#growthChart');
    if (!growthChartEl) return;
    
    const growthChartOptions = {
      series: [45],
      labels: ['Growth'],
      chart: {
        height: 240,
        type: 'radialBar',
        toolbar: { show: false }
      },
      plotOptions: {
        radialBar: {
          hollow: { size: '70%' },
          track: { background: config.colors.borderColor },
          dataLabels: {
            name: { show: false },
            value: {
              fontSize: '2rem',
              fontWeight: 600,
              color: config.colors.headingColor,
              offsetY: 15,
              formatter: function(val) {
                return val + '%';
              }
            }
          }
        }
      },
      colors: [config.colors.primary],
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'dark',
          shadeIntensity: 0.5,
          gradientToColors: [config.colors.primary],
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 0.6,
          stops: [30, 70, 100]
        }
      },
      stroke: { dashArray: 5 }
    };
    
    const growthChart = new ApexCharts(growthChartEl, growthChartOptions);
    growthChart.render();
  }
  
  /**
   * Initialize order statistics chart
   */
  initOrderStatisticsChart() {
    const orderStatisticsChartEl = document.querySelector('#orderStatisticsChart');
    if (!orderStatisticsChartEl) return;
    
    const orderStatisticsChartOptions = {
      chart: {
        height: 165,
        width: 130,
        type: 'donut'
      },
      labels: ['Active', 'Inactive'],
      series: [85, 15],
      colors: [config.colors.primary, config.colors.borderColor],
      stroke: { width: 0 },
      dataLabels: { enabled: false },
      legend: { show: false },
      plotOptions: {
        pie: {
          donut: {
            size: '75%',
            labels: {
              show: true,
              name: { show: true, fontSize: '12px', fontWeight: 600 },
              value: { show: true, fontSize: '12px', fontWeight: 600, formatter: function(val) { return val + '%'; } }
            }
          }
        }
      }
    };
    
    const orderStatisticsChart = new ApexCharts(orderStatisticsChartEl, orderStatisticsChartOptions);
    orderStatisticsChart.render();
  }
  
  /**
   * Initialize income chart
   */
  initIncomeChart() {
    const incomeChartEl = document.querySelector('#incomeChart');
    if (!incomeChartEl) return;
    
    const incomeChartOptions = {
      series: [
        {
          data: [24, 21, 30, 22, 42, 26, 35, 29]
        }
      ],
      chart: {
        height: 215,
        parentHeightOffset: 0,
        type: 'area',
        toolbar: { show: false },
        sparkline: { enabled: true }
      },
      dataLabels: { enabled: false },
      stroke: {
        width: 2,
        curve: 'smooth'
      },
      colors: [config.colors.success],
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'light',
          type: 'vertical',
          shadeIntensity: 0.5,
          gradientToColors: [config.colors.success],
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 0.375,
          stops: [25, 100]
        }
      },
      grid: {
        show: false,
        padding: {
          left: 0,
          right: 0,
          top: 0
        }
      },
      xaxis: {
        labels: { show: false },
        axisBorder: { show: false },
        axisTicks: { show: false }
      },
      yaxis: {
        labels: { show: false }
      },
      tooltip: {
        enabled: false
      }
    };
    
    const incomeChart = new ApexCharts(incomeChartEl, incomeChartOptions);
    incomeChart.render();
  }
  
  /**
   * Initialize profile report chart
   */
  initProfileReportChart() {
    const profileReportChartEl = document.querySelector('#profileReportChart');
    if (!profileReportChartEl) return;
    
    const profileReportChartOptions = {
      chart: {
        height: 80,
        type: 'line',
        toolbar: { show: false },
        dropShadow: {
          enabled: true,
          top: 10,
          left: 5,
          blur: 3,
          opacity: 0.14,
          color: config.colors.primary
        },
        sparkline: { enabled: true }
      },
      stroke: {
        width: 5,
        curve: 'smooth'
      },
      series: [
        {
          data: [110, 270, 145, 245, 205, 285]
        }
      ],
      colors: [config.colors.primary],
      grid: {
        show: false,
        padding: {
          left: 0,
          right: 0,
          bottom: 0
        }
      },
      tooltip: {
        enabled: false
      }
    };
    
    const profileReportChart = new ApexCharts(profileReportChartEl, profileReportChartOptions);
    profileReportChart.render();
  }

  /**
   * Create a new tab
   * @param {string} pageId - Unique identifier for the page
   * @param {string} title - Tab title
   * @param {string} content - HTML content for the tab
   */
  createTab(pageId, title, content) {
    // Check if tab already exists
    if (this.tabs.has(pageId)) {
      this.setActiveTab(pageId);
      return pageId;
    }

    const tabId = pageId;
    const tabElement = this.createTabElement(tabId, title);
    const contentElement = this.createContentElement(tabId, content);

    // Store tab data
    this.tabs.set(tabId, {
      title,
      page: pageId,
      element: tabElement,
      contentElement: contentElement
    });

    // Add to DOM
    this.tabBar.appendChild(tabElement);
    this.tabContentArea.appendChild(contentElement);

    // Set as active
    this.setActiveTab(tabId);

    return tabId;
  }

  /**
   * Create tab button element
   */
  createTabElement(tabId, title) {
    const tab = document.createElement('div');
    tab.className = 'tab-item';
    tab.dataset.tabId = tabId;
    tab.innerHTML = `
      <span class="tab-title">${this.truncateTitle(title)}</span>
      <button class="tab-close" data-tab-id="${tabId}" aria-label="Close tab">
        <i class="bx bx-x"></i>
      </button>
    `;

    // Click handler for tab
    tab.addEventListener('click', (e) => {
      if (!e.target.closest('.tab-close')) {
        this.setActiveTab(tabId);
      }
    });

    // Close button handler
    const closeBtn = tab.querySelector('.tab-close');
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.closeTab(tabId);
    });

    return tab;
  }

  /**
   * Create content element for tab
   */
  createContentElement(tabId, content) {
    const contentDiv = document.createElement('div');
    contentDiv.id = `content-${tabId}`;
    contentDiv.className = 'tab-content';
    contentDiv.innerHTML = content;
    return contentDiv;
  }

  /**
   * Set active tab
   */
  setActiveTab(tabId) {
    if (!this.tabs.has(tabId)) return;

    // Remove active class from all tabs and content
    this.tabs.forEach((tabData, id) => {
      tabData.element.classList.remove('active');
      tabData.contentElement.classList.remove('active');
    });

    // Add active class to selected tab
    const tabData = this.tabs.get(tabId);
    tabData.element.classList.add('active');
    tabData.contentElement.classList.add('active');

    this.activeTabId = tabId;

    // Scroll tab into view if needed
    tabData.element.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
  }

  /**
   * Close a tab
   */
  closeTab(tabId) {
    if (!this.tabs.has(tabId)) return;

    const tabData = this.tabs.get(tabId);
    
    // Don't allow closing the last tab
    if (this.tabs.size <= 1) {
      return;
    }

    // Remove from DOM
    tabData.element.remove();
    tabData.contentElement.remove();

    // Remove from map
    this.tabs.delete(tabId);

    // If closed tab was active, activate another tab
    if (this.activeTabId === tabId) {
      const remainingTabs = Array.from(this.tabs.keys());
      if (remainingTabs.length > 0) {
        this.setActiveTab(remainingTabs[remainingTabs.length - 1]);
      }
    }
  }

  /**
   * Load page content into a tab
   */
  async loadPage(pageId, title) {
    try {
      // Try to load from pages directory
      const response = await fetch(`pages/${pageId}.html`);
      
      if (response.ok) {
        const content = await response.text();
        this.createTab(pageId, title, content);
      } else {
        // If page doesn't exist, create with default content
        const defaultContent = this.getDefaultPageContent(pageId, title);
        this.createTab(pageId, title, defaultContent);
      }
    } catch (error) {
      console.error(`Error loading page ${pageId}:`, error);
      // Create tab with error message
      const errorContent = `
        <div class="card">
          <div class="card-body">
            <div class="alert alert-danger">
              <h5>Error Loading Page</h5>
              <p>Unable to load the page: ${title}</p>
              <p class="mb-0"><small>${error.message}</small></p>
            </div>
          </div>
        </div>
      `;
      this.createTab(pageId, title, errorContent);
    }
  }

  /**
   * Get default home content
   * Returns embedded dashboard content to avoid CORS issues
   */
  async getDefaultHomeContent() {
    // Return embedded dashboard content directly from window.DashboardContent
    // This avoids CORS issues with file:// protocol
    console.log('getDefaultHomeContent called, DashboardContent available:', !!window.DashboardContent);
    
    if (window.DashboardContent) {
      console.log('Returning DashboardContent, length:', window.DashboardContent.length);
      return window.DashboardContent;
    }
    
    // Fallback content if DashboardContent not loaded
    console.warn('DashboardContent not available, using fallback');
    return `
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-body text-center py-5">
              <h4 class="mb-3">Welcome to Bankers Realm</h4>
              <p class="text-muted">Select a module from the menu to begin</p>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Get default page content
   */
  getDefaultPageContent(pageId, title) {
    return `
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-header">
              <h5 class="card-title mb-0">${title}</h5>
            </div>
            <div class="card-body">
              <p class="text-muted">Page content for ${title} will be displayed here.</p>
              <p class="text-muted"><small>Page ID: ${pageId}</small></p>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Truncate title if too long
   */
  truncateTitle(title, maxLength = 20) {
    if (title.length <= maxLength) return title;
    return title.substring(0, maxLength - 3) + '...';
  }
}

// Create global instance
window.BankingTabs = new BankingTabs();

