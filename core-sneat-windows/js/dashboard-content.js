/**
 * Dashboard Content
 * Embedded dashboard HTML to avoid CORS issues
 */
// Ensure DashboardContent is available globally
if (typeof window === 'undefined') {
  var window = {};
}
window.DashboardContent = `<!-- Home Content - Matching Sneat Dashboard Structure with Banking Content -->
<div class="row">
  <!-- Welcome Card - Single Card -->
  <div class="col-12 col-xl-7 col-lg-6 mb-4 order-0">
    <div class="card">
      <div class="d-flex align-items-end row">
        <div class="col-sm-7">
          <div class="card-body">
            <h5 class="card-title text-primary">Welcome to Bankers Realm! 🎉</h5>
            <p class="mb-4">
              <span class="fw-bold">All systems operational.</span>
            </p>
            <a href="javascript:void(0);" class="btn btn-sm btn-outline-primary">View</a>
          </div>
        </div>
        <div class="col-sm-5 text-center text-sm-left">
          <div class="card-body pb-0 px-0 px-md-4">
            <img
              src="assets/img/illustrations/man-with-laptop-light.png"
              height="140"
              alt="Banking System"
              data-app-dark-img="illustrations/man-with-laptop-dark.png"
              data-app-light-img="illustrations/man-with-laptop-light.png"
              onerror="this.style.display='none'"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Stats Cards - Matching Sneat Style Exactly -->
  <div class="col-12 col-xl-5 col-lg-6 order-1">
    <div class="row">
      <div class="col-lg-6 col-md-12 col-6 mb-4">
        <div class="card">
          <div class="card-body">
            <div class="card-title d-flex align-items-start justify-content-between">
              <div class="avatar flex-shrink-0">
                <img
                  src="assets/img/icons/unicons/chart-success.png"
                  alt="chart success"
                  class="rounded"
                  onerror="this.style.display='none'; this.nextElementSibling.style.display='block';"
                />
                <span class="avatar-initial rounded bg-label-success" style="display:none;">
                  <i class="bx bx-money bx-sm"></i>
                </span>
              </div>
              <div class="dropdown">
                <button
                  class="btn p-0"
                  type="button"
                  id="cardOpt3"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i class="bx bx-dots-vertical-rounded"></i>
                </button>
                <div class="dropdown-menu dropdown-menu-end" aria-labelledby="cardOpt3">
                  <a class="dropdown-item" href="javascript:void(0);">View More</a>
                  <a class="dropdown-item" href="javascript:void(0);">Delete</a>
                </div>
              </div>
            </div>
            <span class="fw-semibold d-block mb-1">Total Deposits</span>
            <h3 class="card-title mb-2">$12,628</h3>
            <small class="text-success fw-semibold"><i class="bx bx-up-arrow-alt"></i> +72.80%</small>
          </div>
        </div>
      </div>
      <div class="col-lg-6 col-md-12 col-6 mb-4">
        <div class="card">
          <div class="card-body">
            <div class="card-title d-flex align-items-start justify-content-between">
              <div class="avatar flex-shrink-0">
                <img
                  src="assets/img/icons/unicons/wallet-info.png"
                  alt="Credit Card"
                  class="rounded"
                  onerror="this.style.display='none'; this.nextElementSibling.style.display='block';"
                />
                <span class="avatar-initial rounded bg-label-primary" style="display:none;">
                  <i class="bx bx-credit-card bx-sm"></i>
                </span>
              </div>
              <div class="dropdown">
                <button
                  class="btn p-0"
                  type="button"
                  id="cardOpt6"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i class="bx bx-dots-vertical-rounded"></i>
                </button>
                <div class="dropdown-menu dropdown-menu-end" aria-labelledby="cardOpt6">
                  <a class="dropdown-item" href="javascript:void(0);">View More</a>
                  <a class="dropdown-item" href="javascript:void(0);">Delete</a>
                </div>
              </div>
            </div>
            <span>Total Loans</span>
            <h3 class="card-title text-nowrap mb-1">$4,679</h3>
            <small class="text-success fw-semibold"><i class="bx bx-up-arrow-alt"></i> +28.42%</small>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Total Revenue Chart - Transaction Volume -->
  <div class="col-12 col-xl-7 col-lg-6 order-2 order-md-3 order-lg-2 mb-4">
    <div class="card">
      <div class="row row-bordered g-0">
        <div class="col-md-8">
          <h5 class="card-header m-0 me-2 pb-3">Transaction Volume</h5>
          <div id="totalRevenueChart" class="px-2"></div>
        </div>
        <div class="col-md-4">
          <div class="card-body">
            <div class="text-center">
              <div class="dropdown">
                <button
                  class="btn btn-sm btn-outline-primary dropdown-toggle"
                  type="button"
                  id="growthReportId"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  2024
                </button>
                <div class="dropdown-menu dropdown-menu-end" aria-labelledby="growthReportId">
                  <a class="dropdown-item" href="javascript:void(0);">2023</a>
                  <a class="dropdown-item" href="javascript:void(0);">2022</a>
                  <a class="dropdown-item" href="javascript:void(0);">2021</a>
                </div>
              </div>
            </div>
          </div>
          <div id="growthChart"></div>
          <div class="text-center fw-semibold pt-3 mb-2">62% Growth Rate</div>

          <div class="d-flex px-xxl-4 px-lg-2 p-4 gap-xxl-3 gap-lg-1 gap-3 justify-content-between">
            <div class="d-flex">
              <div class="me-2">
                <span class="badge bg-label-primary p-2"><i class="bx bx-dollar text-primary"></i></span>
              </div>
              <div class="d-flex flex-column">
                <small>2024</small>
                <h6 class="mb-0">$32.5k</h6>
              </div>
            </div>
            <div class="d-flex">
              <div class="me-2">
                <span class="badge bg-label-info p-2"><i class="bx bx-wallet text-info"></i></span>
              </div>
              <div class="d-flex flex-column">
                <small>2023</small>
                <h6 class="mb-0">$41.2k</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!--/ Total Revenue -->
  <div class="col-12 col-xl-5 col-lg-6 order-3 order-md-2">
    <div class="row">
      <div class="col-6 mb-4">
        <div class="card">
          <div class="card-body">
            <div class="card-title d-flex align-items-start justify-content-between">
              <div class="avatar flex-shrink-0">
                <img
                  src="assets/img/icons/unicons/paypal.png"
                  alt="Credit Card"
                  class="rounded"
                  onerror="this.style.display='none'; this.nextElementSibling.style.display='block';"
                />
                <span class="avatar-initial rounded bg-label-warning" style="display:none;">
                  <i class="bx bx-transfer bx-sm"></i>
                </span>
              </div>
              <div class="dropdown">
                <button
                  class="btn p-0"
                  type="button"
                  id="cardOpt4"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i class="bx bx-dots-vertical-rounded"></i>
                </button>
                <div class="dropdown-menu dropdown-menu-end" aria-labelledby="cardOpt4">
                  <a class="dropdown-item" href="javascript:void(0);">View More</a>
                  <a class="dropdown-item" href="javascript:void(0);">Delete</a>
                </div>
              </div>
            </div>
            <span class="d-block mb-1">Daily Transactions</span>
            <h3 class="card-title text-nowrap mb-2">24,567</h3>
            <small class="text-success fw-semibold"><i class="bx bx-up-arrow-alt"></i> +18.2%</small>
          </div>
        </div>
      </div>
      <div class="col-6 mb-4">
        <div class="card">
          <div class="card-body">
            <div class="card-title d-flex align-items-start justify-content-between">
              <div class="avatar flex-shrink-0">
                <img
                  src="assets/img/icons/unicons/cc-primary.png"
                  alt="Credit Card"
                  class="rounded"
                  onerror="this.style.display='none'; this.nextElementSibling.style.display='block';"
                />
                <span class="avatar-initial rounded bg-label-info" style="display:none;">
                  <i class="bx bx-wallet bx-sm"></i>
                </span>
              </div>
              <div class="dropdown">
                <button
                  class="btn p-0"
                  type="button"
                  id="cardOpt1"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i class="bx bx-dots-vertical-rounded"></i>
                </button>
                <div class="dropdown-menu" aria-labelledby="cardOpt1">
                  <a class="dropdown-item" href="javascript:void(0);">View More</a>
                  <a class="dropdown-item" href="javascript:void(0);">Delete</a>
                </div>
              </div>
            </div>
            <span class="fw-semibold d-block mb-1">Active Accounts</span>
            <h3 class="card-title mb-2">89,432</h3>
            <small class="text-success fw-semibold"><i class="bx bx-up-arrow-alt"></i> +8.4%</small>
          </div>
        </div>
      </div>
      <!-- Additional Banking Stats Card -->
      <div class="col-12 mb-4">
        <div class="card">
          <div class="card-body">
            <div class="d-flex justify-content-between flex-sm-row flex-column gap-3">
              <div class="d-flex flex-sm-column flex-row align-items-start justify-content-between">
                <div class="card-title">
                  <h5 class="text-nowrap mb-2">System Status</h5>
                  <span class="badge bg-label-success rounded-pill">All Operational</span>
                </div>
                <div class="mt-sm-auto">
                  <small class="text-success text-nowrap fw-semibold">
                    <i class="bx bx-chevron-up"></i> 100%
                  </small>
                  <h3 class="mb-0">18/18</h3>
                </div>
              </div>
              <div id="profileReportChart"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- Order Statistics -->
<div class="row">
  <div class="col-md-6 col-lg-4 col-xl-4 order-0 mb-4">
    <div class="card h-100">
      <div class="card-header d-flex align-items-center justify-content-between pb-0">
        <div class="card-title mb-0">
          <h5 class="m-0 me-2">User Activity</h5>
          <small class="text-muted">24h Overview</small>
        </div>
      </div>
      <div class="card-body">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <div class="d-flex flex-column align-items-center gap-1">
            <h2 class="mb-2" id="dailyUsers">1,247</h2>
            <span>Active Today</span>
          </div>
          <div id="orderStatisticsChart"></div>
        </div>
        <ul class="p-0 m-0">
          <li class="d-flex mb-4 pb-1">
            <div class="avatar flex-shrink-0 me-3">
              <span class="avatar-initial rounded bg-label-primary">
                <i class="bx bx-user"></i>
              </span>
            </div>
            <div class="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
              <div class="me-2">
                <h6 class="mb-0">New Users</h6>
                <small class="text-muted">Banking Staff</small>
              </div>
              <div class="user-progress d-flex align-items-center gap-1">
                <h6 class="mb-0">23</h6>
                <i class="bx bx-chevron-up text-success"></i>
              </div>
            </div>
          </li>
          <li class="d-flex mb-4 pb-1">
            <div class="avatar flex-shrink-0 me-3">
              <span class="avatar-initial rounded bg-label-info">
                <i class="bx bx-group"></i>
              </span>
            </div>
            <div class="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
              <div class="me-2">
                <h6 class="mb-0">Active Sessions</h6>
                <small class="text-muted">Currently Online</small>
              </div>
              <div class="user-progress d-flex align-items-center gap-1">
                <h6 class="mb-0">892</h6>
                <i class="bx bx-chevron-up text-success"></i>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <div class="col-md-6 col-lg-4 order-1 mb-4">
    <div class="card h-100">
      <div class="card-header">
        <ul class="nav nav-pills" role="tablist">
          <li class="nav-item">
            <button type="button" class="nav-link active" role="tab" data-bs-toggle="tab" data-bs-target="#navs-tabs-line-card-income" aria-controls="navs-tabs-line-card-income" aria-selected="true">Income</button>
          </li>
          <li class="nav-item">
            <button type="button" class="nav-link" role="tab">Expenses</button>
          </li>
        </ul>
      </div>
      <div class="card-body px-2">
        <div class="tab-content p-0">
          <div class="tab-pane fade show active" id="navs-tabs-line-card-income" role="tabpanel">
            <div class="d-flex justify-content-between pt-4" role="tabpanel">
              <div>
                <p class="mb-2">Total Income</p>
                <h4 class="mb-2">$24,895</h4>
                <p class="mb-0"><span class="fw-semibold">97%</span> of target</p>
              </div>
              <div class="avatar flex-shrink-0">
                <img src="assets/img/icons/unicons/wallet.png" alt="Credit Card" class="rounded" onerror="this.style.display='none'; this.parentElement.innerHTML='<span class=\'avatar-initial rounded bg-label-success\'><i class=\'bx bx-wallet\'></i></span>';" />
              </div>
            </div>
            <div id="incomeChart"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="col-md-6 col-lg-4 order-2 mb-4">
    <div class="card h-100">
      <div class="card-header d-flex align-items-center justify-content-between">
        <div>
          <h5 class="card-title m-0 me-2">Transactions Summary</h5>
          <small class="text-muted">Last 7 days</small>
        </div>
        <div class="dropdown">
          <button
            class="btn p-0"
            type="button"
            id="transactionID"
            data-bs-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <i class="bx bx-dots-vertical-rounded"></i>
          </button>
          <div class="dropdown-menu dropdown-menu-end" aria-labelledby="transactionID">
            <a class="dropdown-item" href="javascript:void(0);">Last 28 Days</a>
            <a class="dropdown-item" href="javascript:void(0);">Last Month</a>
            <a class="dropdown-item" href="javascript:void(0);">Last Year</a>
          </div>
        </div>
      </div>
      <div class="card-body">
        <div class="row g-3">
          <div class="col-md-3 col-6">
            <div class="d-flex align-items-center">
              <div class="avatar">
                <div class="avatar-initial bg-label-primary rounded">
                  <i class="bx bx-trending-up"></i>
                </div>
              </div>
              <div class="ms-3">
                <div class="small mb-1">Deposits</div>
                <h5 class="mb-0">$12.4k</h5>
              </div>
            </div>
          </div>
          <div class="col-md-3 col-6">
            <div class="d-flex align-items-center">
              <div class="avatar">
                <div class="avatar-initial bg-label-info rounded">
                  <i class="bx bx-trending-down"></i>
                </div>
              </div>
              <div class="ms-3">
                <div class="small mb-1">Withdrawals</div>
                <h5 class="mb-0">$8.9k</h5>
              </div>
            </div>
          </div>
          <div class="col-md-3 col-6">
            <div class="d-flex align-items-center">
              <div class="avatar">
                <div class="avatar-initial bg-label-success rounded">
                  <i class="bx bx-transfer"></i>
                </div>
              </div>
              <div class="ms-3">
                <div class="small mb-1">Transfers</div>
                <h5 class="mb-0">$3.2k</h5>
              </div>
            </div>
          </div>
          <div class="col-md-3 col-6">
            <div class="d-flex align-items-center">
              <div class="avatar">
                <div class="avatar-initial bg-label-warning rounded">
                  <i class="bx bx-credit-card"></i>
                </div>
              </div>
              <div class="ms-3">
                <div class="small mb-1">Payments</div>
                <h5 class="mb-0">$1.5k</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>`;

// Debug: Log when dashboard content is loaded
console.log('Dashboard content loaded:', window.DashboardContent ? 'Yes' : 'No', window.DashboardContent ? window.DashboardContent.substring(0, 100) + '...' : '');

