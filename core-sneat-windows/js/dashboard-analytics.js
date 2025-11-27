/**
 * Dashboard Analytics - Banking System
 * Based on Sneat's dashboards-analytics.js structure
 */

'use strict';

(function () {
  let cardColor, headingColor, axisColor, shadeColor, borderColor;

  cardColor = config.colors.white;
  headingColor = config.colors.headingColor;
  axisColor = config.colors.axisColor;
  borderColor = config.colors.borderColor;

  // Total Revenue Report Chart - Bar Chart (Transaction Volume)
  // --------------------------------------------------------------------
  const totalRevenueChartEl = document.querySelector('#totalRevenueChart');
  if (totalRevenueChartEl) {
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
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth',
        width: 6,
        lineCap: 'round',
        colors: [cardColor]
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
        labels: {
          colors: axisColor
        },
        itemMargin: {
          horizontal: 10
        }
      },
      grid: {
        borderColor: borderColor,
        padding: {
          top: 0,
          bottom: -8,
          left: 20,
          right: 20
        }
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        labels: {
          style: {
            fontSize: '13px',
            colors: axisColor
          }
        },
        axisTicks: {
          show: false
        },
        axisBorder: {
          show: false
        }
      },
      yaxis: {
        labels: {
          style: {
            fontSize: '13px',
            colors: axisColor
          }
        }
      },
      tooltip: {
        theme: 'light'
      }
    };
    const totalRevenueChart = new ApexCharts(totalRevenueChartEl, totalRevenueChartOptions);
    totalRevenueChart.render();
  }

  // Growth Chart - Radial Chart
  // --------------------------------------------------------------------
  const growthChartEl = document.querySelector('#growthChart');
  if (growthChartEl) {
    const growthChartOptions = {
      series: [45],
      labels: ['Growth'],
      chart: {
        height: 240,
        type: 'radialBar'
      },
      plotOptions: {
        radialBar: {
          hollow: {
            size: '70%'
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
          opacityTo: 1,
          stops: [0, 100]
        }
      },
      stroke: {
        lineCap: 'round'
      },
      chart: {
        height: 240,
        type: 'radialBar'
      },
      labels: ['Growth Rate']
    };
    const growthChart = new ApexCharts(growthChartEl, growthChartOptions);
    growthChart.render();
  }

  // Order Statistics Chart - Donut Chart
  // --------------------------------------------------------------------
  const orderStatisticsChartEl = document.querySelector('#orderStatisticsChart');
  if (orderStatisticsChartEl) {
    const orderStatisticsChartOptions = {
      chart: {
        height: 165,
        width: 130,
        type: 'donut'
      },
      labels: ['New Users', 'Active Sessions'],
      series: [65, 35],
      colors: [config.colors.primary, config.colors.secondary],
      stroke: {
        width: 5,
        colors: cardColor
      },
      dataLabels: {
        enabled: false,
        formatter: function (val, opt) {
          return parseInt(val) + '%';
        }
      },
      legend: {
        show: false
      },
      plotOptions: {
        pie: {
          donut: {
            size: '75%',
            labels: {
              show: true,
              name: {
                fontSize: '12px',
                fontWeight: 600
              },
              value: {
                fontSize: '12px',
                fontWeight: 600,
                formatter: function (val) {
                  return val + '%';
                }
              }
            }
          }
        }
      }
    };
    const orderStatisticsChart = new ApexCharts(orderStatisticsChartEl, orderStatisticsChartOptions);
    orderStatisticsChart.render();
  }

  // Income Chart - Area Chart
  // --------------------------------------------------------------------
  const incomeChartEl = document.querySelector('#incomeChart');
  if (incomeChartEl) {
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

  // Profile Report Chart - Line Chart
  // --------------------------------------------------------------------
  const profileReportChartEl = document.querySelector('#profileReportChart');
  if (profileReportChartEl) {
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
          opacity: 0.15,
          color: config.colors.primary
        },
        sparkline: { enabled: true }
      },
      stroke: {
        width: 5,
        curve: 'smooth'
      },
      grid: {
        show: false,
        padding: {
          right: 8
        }
      },
      colors: [config.colors.primary],
      series: [
        {
          data: [110, 270, 145, 245, 175, 185, 230, 250, 200]
        }
      ],
      xaxis: {
        show: false,
        lines: { show: false },
        labels: { show: false }
      },
      yaxis: {
        show: false
      },
      tooltip: {
        enabled: false
      }
    };
    const profileReportChart = new ApexCharts(profileReportChartEl, profileReportChartOptions);
    profileReportChart.render();
  }
})();
