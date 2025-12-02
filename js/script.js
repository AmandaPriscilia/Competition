function getCssVariable(variable) {
  const style = getComputedStyle(document.body);
  return style.getPropertyValue(variable).trim();
}
// UTAMA: Document Ready State
document.addEventListener('DOMContentLoaded', function () {
  const primaryColor = getCssVariable('--primary');
  const blueAccent = getCssVariable('--blue-accent');
  const accentColor = getCssVariable('--accent');
  const greenSecondary = getCssVariable('--green-secondary');
  const redDanger = getCssVariable('--red-danger');
  const darkColor = getCssVariable('--dark-grey');
  const whiteColor = getCssVariable('--bg-light');
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-menu a');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const icon = menuToggle.querySelector('i');
      if (navMenu.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
      } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    });
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        if (window.innerWidth < 1024) {
          navMenu.classList.remove('active');
          const icon = menuToggle.querySelector('i');
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }
      });
    });
  }

  // NavBar active
  let currentPage = window.location.pathname.split('/').pop() || 'index.html';

  const links = document.querySelectorAll('.nav-link');

  links.forEach((link) => {
    let target = link.getAttribute('href');

    let targetPage = target.split('/').pop();

    targetPage = targetPage.split('?')[0].split('#')[0];

    if (targetPage === currentPage) {
      link.classList.add('active');
    }
  });

  // Header transparan
  document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('header');
    const navLinks = document.querySelectorAll('.nav-link');
    const hero = document.querySelector('.hero-bg'); // hero section

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Header berada di atas hero → teks putih
          header.classList.remove('bg-white/80');
          header.classList.add('bg-white/10', 'backdrop-blur-xl');

          navLinks.forEach((el) => {
            el.classList.remove('text-gray-800');
            el.classList.add('text-white');
          });
        } else {
          // Header sudah melewati hero → teks hitam
          header.classList.remove('bg-white/10');
          header.classList.add('bg-white/80', 'backdrop-blur-xl');

          navLinks.forEach((el) => {
            el.classList.remove('text-white');
            el.classList.add('text-gray-800');
          });
        }
      },
      {
        threshold: 0.1, // 10% hero masih terlihat = dianggap "di atas hero"
      },
    );

    observer.observe(hero);
  });

  // Logika Rotasi Teks Hero (Mobile)
  const rotatingText1 = document.getElementById('rotating-text-1');
  const rotatingText2 = document.getElementById('rotating-text-2');

  function rotateTextMobile() {
    if (!rotatingText1 || !rotatingText2 || window.innerWidth >= 640) return;

    let activeText = 1;
    setInterval(() => {
      if (activeText === 1) {
        rotatingText1.classList.replace('opacity-100', 'opacity-0');
        rotatingText2.classList.replace('opacity-0', 'opacity-100');
        activeText = 2;
      } else {
        rotatingText2.classList.replace('opacity-100', 'opacity-0');
        rotatingText1.classList.replace('opacity-0', 'opacity-100');
        activeText = 1;
      }
    }, 2000);
  }

  rotateTextMobile();

  // Logika Dashboard Chart (Chart.js)
  const trendMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Ags', 'Sep', 'Okt', 'Nov'];
  const trendCases = [2, 3, 1, 10, 3, 2, 6, 9, 15, 10, 3];
  const trendVictims = [11, 176, 42, 954, 429, 26, 455, 1157, 2502, 722, 48];

  const provinces = [
    'Jawa Barat',
    'DIY',
    'Jawa Tengah',
    'NTT',
    'Jawa Timur',
    'Sumatera Utara',
    'Bengkulu',
    'Sulteng',
    'Sumsel',
    'Lainnya',
  ];
  const provinceVictims = [3018, 2625, 1776, 926, 835, 594, 539, 516, 344, 1782];

  const schoolLevels = ['SD/MI', 'SMP/MTs', 'SLTA', 'TK/PAUD', 'Pesantren/Lainnya'];
  const schoolVictims = [4945, 2571, 2386, 590, 428];

  const trendCtx = document.getElementById('trendChart')?.getContext('2d');
  const provinceCtx = document.getElementById('provinceChart')?.getContext('2d');
  const schoolCtx = document.getElementById('schoolChart')?.getContext('2d');

  // Trend Chart (Bar and Line)
  if (trendCtx) {
    new Chart(trendCtx, {
      type: 'bar',
      data: {
        labels: trendMonths,
        datasets: [
          {
            label: 'Jumlah Kasus',
            data: trendCases,
            backgroundColor: `${primaryColor}B3`,
            borderColor: primaryColor,
            borderWidth: 1,
            order: 2,
          },
          {
            label: 'Total Korban',
            data: trendVictims,
            backgroundColor: `${blueAccent}B3`,
            borderColor: blueAccent,
            borderWidth: 2,
            type: 'line',
            yAxisID: 'y1',
            tension: 0.3,
            pointRadius: 5,
            pointHoverRadius: 7,
            order: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: 'index',
          intersect: false,
        },
        plugins: {
          tooltip: {
            callbacks: {
              title: (context) => context[0].label,
              label: (context) => {
                return `${context.dataset.label}: ${context.raw}`;
              },
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            title: { display: true, text: 'Jumlah Kasus' },
            grid: { color: 'rgba(0, 0, 0, 0.05)' },
          },
          y1: {
            beginAtZero: true,
            position: 'right',
            title: { display: true, text: 'Total Korban' },
            grid: { drawOnChartArea: false, color: 'rgba(0, 0, 0, 0.05)' },
            suggestedMax: Math.max(...trendVictims) * 1.1,
          },
          x: { grid: { display: false } },
        },
      },
    });
  }

  // Province Chart (Doughnut)
  if (provinceCtx) {
    new Chart(provinceCtx, {
      type: 'doughnut',
      data: {
        labels: provinces,
        datasets: [
          {
            data: provinceVictims,
            backgroundColor: [
              primaryColor,
              blueAccent,
              accentColor,
              greenSecondary,
              redDanger,
              darkColor,
              '#a0aec0',
              '#5a67d8',
              '#38a169',
              '#805ad5',
            ].map((color) => `${color}B3`),
            borderColor: `${whiteColor}CC`,
            borderWidth: 2,
            hoverOffset: 15,
            borderRadius: 5,
            spacing: 2,
          },
        ],
      },
      plugins: [
        {
          beforeDraw: function (chart) {
            if (chart.config._config.data.labels.length === 0) {
              var ctx = chart.ctx;
              var width = chart.width;
              var height = chart.height;
              ctx.textAlign = 'center';
              ctx.textBaseline = 'middle';
              ctx.font = '16px Inter';
              ctx.fillText('No data available', width / 2, height / 2);
              ctx.restore();
            }
          },
        },
      ],
      options: {
        responsive: true,
        maintainAspectRatio: false,
        onHover: (event, chartElement) => {
          event.native.target.style.cursor = chartElement.length ? 'pointer' : 'default';
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: function (context) {
                const label = context.label || '';
                const value = context.raw || '';
                return `${label}: ${value} korban`;
              },
              afterLabel: function (context) {
                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                const value = context.raw || 0;
                const percentage = Math.round((value / total) * 100);
                return `Persentase: ${percentage}%`;
              },
            },
          },
          legend: {
            position: 'right',
            labels: { boxWidth: 12, padding: 20, usePointStyle: true, pointStyle: 'circle' },
          },
        },
      },
    });
  }
  if (schoolCtx) {
    new Chart(schoolCtx, {
      type: 'doughnut',
      data: {
        labels: schoolLevels,
        datasets: [
          {
            data: schoolVictims,
            backgroundColor: [primaryColor, blueAccent, accentColor, greenSecondary, redDanger].map(
              (color) => `${color}B3`,
            ),
            borderColor: `${whiteColor}CC`,
            borderWidth: 2,
            hoverOffset: 15,
            borderRadius: 5,
            spacing: 2,
          },
        ],
      },
      plugins: [
        {
          beforeDraw: function (chart) {
            if (chart.config._config.data.labels.length === 0) {
              var ctx = chart.ctx;
              var width = chart.width;
              var height = chart.height;
              ctx.textAlign = 'center';
              ctx.textBaseline = 'middle';
              ctx.font = '16px Inter';
              ctx.fillText('No data available', width / 2, height / 2);
              ctx.restore();
            }
          },
        },
      ],
      options: {
        responsive: true,
        maintainAspectRatio: false,
        onHover: (event, chartElement) => {
          event.native.target.style.cursor = chartElement.length ? 'pointer' : 'default';
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: function (context) {
                return `${context.label} (${context.raw} korban)`;
              },
            },
          },
          legend: {
            position: 'right',
            labels: { boxWidth: 12, padding: 20, usePointStyle: true, pointStyle: 'circle' },
          },
        },
      },
    });
  }

  // Button Event Listeners for Chart Toggle
  function resetAllButtons() {
    const buttons = document.querySelectorAll('.chart-toggle-btn');
    buttons.forEach((btn) => {
      btn.classList.remove('active');
    });
  }

  const trendBtn = document.getElementById('trendBtn');
  const provinceBtn = document.getElementById('provinceBtn');
  const schoolBtn = document.getElementById('schoolBtn');
  const trendView = document.getElementById('trendView');
  const provinceView = document.getElementById('provinceView');
  const schoolView = document.getElementById('schoolView');

  if (trendBtn && trendView && provinceView && schoolView) {
    trendBtn.addEventListener('click', function () {
      resetAllButtons();
      this.classList.add('active');
      trendView.classList.remove('hidden');
      provinceView.classList.add('hidden');
      schoolView.classList.add('hidden');
    });

    provinceBtn.addEventListener('click', function () {
      resetAllButtons();
      this.classList.add('active');
      trendView.classList.add('hidden');
      provinceView.classList.remove('hidden');
      schoolView.classList.add('hidden');
    });

    schoolBtn.addEventListener('click', function () {
      resetAllButtons();
      this.classList.add('active');
      trendView.classList.add('hidden');
      provinceView.classList.add('hidden');
      schoolView.classList.remove('hidden');
    });
    trendBtn.classList.add('active');
    provinceView.classList.add('hidden');
    schoolView.classList.add('hidden');
  }

  //Logika Audit Bahan Makanan (Pencarian & Filter)

  const searchInput = document.getElementById('search-bahan');
  const statusFilter = document.getElementById('filter-status');
  const tableBody = document.getElementById('audit-table-body');
  const tableRows = tableBody ? document.querySelectorAll('#audit-table-body .data-row') : [];
  function applyStatusStyling() {
    tableRows.forEach((row) => {
      const statusSpan = row.querySelector('.status');
      if (statusSpan) {
        statusSpan.className = 'status font-bold px-2 py-1 rounded';
        if (row.classList.contains('status-aman')) {
          statusSpan.classList.add('text-green-600', 'bg-green-100');
        } else if (row.classList.contains('status-perlu-perhatian')) {
          statusSpan.classList.add('text-yellow-600', 'bg-yellow-100');
        } else if (row.classList.contains('status-berisiko')) {
          statusSpan.classList.add('text-red-600', 'bg-red-100');
        }
      }
    });
  }
  function filterAuditTable() {
    if (tableRows.length === 0) return;

    const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
    const statusTerm = statusFilter ? statusFilter.value : 'semua';

    tableRows.forEach((row) => {
      const rowData = row.children[0].textContent.toLowerCase();
      const matchesSearch = rowData.includes(searchTerm);
      const matchesStatus =
        statusTerm === 'semua' || row.classList.contains(`status-${statusTerm}`);

      if (matchesSearch && matchesStatus) {
        row.classList.remove('hidden');
      } else {
        row.classList.add('hidden');
      }
    });
  }

  if (searchInput && statusFilter) {
    applyStatusStyling();
    searchInput.addEventListener('input', filterAuditTable);
    statusFilter.addEventListener('change', filterAuditTable);
  }

  // Logika Form Laporan
  const reportForm = document.getElementById('reportForm');
  const locationInput = document.getElementById('locationInput');
  const reportListContainer = document.getElementById('reportListContainer');

  const initialReports = [
    {
      id: 1,
      title: 'Roti Bungkus Sisa Kemarin',
      status: 'DIPROSES',
      date: '24 Nov 2025',
      location: 'SMP NEGERI 1 JAKARTA PUSAT',
      desc: 'Ditemukan roti yang sudah berjamur...',
      type: 'KEDALUWARSA',
      typeClass: 'bg-red-500',
      typeIcon: 'fa-clock',
      statusClass: 'text-green-600 bg-green-100',
      statusLabel: 'SELESAI',
      statusIcon: 'fa-check-circle',
    },
    {
      id: 2,
      title: 'Paket Makanan Terlambat',
      status: 'SELESAI',
      date: '23 Nov 2025',
      location: 'SD NEGERI 5 BANDUNG',
      desc: 'Makanan baru tiba pukul 11:00...',
      type: 'DISTRIBUSI',
      typeClass: 'bg-blue-500',
      typeIcon: 'fa-truck',
      statusClass: 'text-sky-500 bg-sky-100',
      statusLabel: 'DIPROSES',
      statusIcon: 'fa-sync-alt',
    },
    {
      id: 3,
      title: 'Rambut di Nasi Kotak',
      status: 'DITOLAK',
      date: '22 Nov 2025',
      location: 'SMK NEGERI 3 SURABAYA',
      desc: 'Ditemukan benda asing...',
      type: 'KONTAMINASI',
      typeClass: 'bg-yellow-500',
      typeIcon: 'fa-bug',
      statusClass: 'text-gray-500 bg-gray-200',
      statusLabel: 'DITOLAK',
      statusIcon: 'fa-times-circle',
    },
  ];

  function createReportItem(report) {
    const typeLabel = report.type || 'LAPORAN BARU';
    const typeClass = report.typeClass || 'bg-purple-600';
    const typeIcon = report.typeIcon || 'fa-file-alt';
    const statusLabel = report.statusLabel || 'MENUNGGU VERIFIKASI';
    const statusClass = report.statusClass || 'text-yellow-600 bg-yellow-100';
    const statusIcon = report.statusIcon || 'fa-hourglass-half';
    const location = report.location || 'Lokasi tidak tersedia';

    const item = document.createElement('div');
    item.className =
      'card-interactive bg-white rounded-2xl shadow-sm overflow-hidden group cursor-pointer';

    item.innerHTML = `
      <div class="h-48 overflow-hidden relative bg-gray-200">
        <img src="../assets/3.jpg" alt="Ilustrasi" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        <span class="absolute top-4 right-4 ${typeClass} text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-md"> 
          <i class="fas ${typeIcon} mr-1"></i> ${typeLabel} 
        </span>
      </div>
      <div class="p-6">
        <span class="inline-block ${statusClass} text-[10px] font-bold px-3 py-1 mb-3 rounded-full shadow-md"> 
          <i class="fas ${statusIcon} mr-1"></i> ${statusLabel} 
        </span>
        <div class="flex justify-between items-start mb-3">
          <h3 class="text-lg font-bold text-[var(--dark)]">${report.title}</h3>
          <span class="text-[10px] text-gray-400">Baru saja</span>
        </div>
        <div class="flex items-center text-xs text-gray-600 mb-2">
          <i class="fas fa-map-marker-alt w-4 text-[var(--primary)]"></i>
          <span class="font-medium ml-1">${location}</span>
        </div>
        <p class="text-xs text-gray-500 leading-relaxed border-t pt-3 border-gray-100">${
          report.desc || 'Laporan sedang dalam antrean tinjauan sistem.'
        }</p>
      </div>
    `;
    return item;
  }

  function updateReportList() {
    if (reportListContainer) {
      reportListContainer.innerHTML = '';
      initialReports.forEach((report) => {
        reportListContainer.appendChild(createReportItem(report));
      });
    }
  }

  updateReportList();

  if (locationInput) {
    locationInput.setAttribute('placeholder', 'SMA NEGERI 2 AMBON');
  }

  if (reportForm) {
    const requiredInputs = reportForm.querySelectorAll('[required]');
    const errorClasses = ['border-red-500', 'ring-red-500', 'ring-1'];

    function clearErrorStyling(input) {
      input.classList.remove(...errorClasses);
    }

    requiredInputs.forEach((input) => {
      input.addEventListener('input', () => clearErrorStyling(input));
      input.addEventListener('change', () => clearErrorStyling(input));
    });

    reportForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let isFormValid = true;
      const invalidFields = [];

      requiredInputs.forEach((input) => {
        const value = input.value.trim();
        let isInputEmpty = false;

        if (input.tagName === 'SELECT' && value === '') {
          isInputEmpty = true;
        } else if (input.type === 'file' && input.files.length === 0) {
          isInputEmpty = true;
        } else if (value === '') {
          isInputEmpty = true;
        }

        if (isInputEmpty) {
          isFormValid = false;
          input.classList.add(...errorClasses);
          const label = input.closest('div').querySelector('label')?.textContent || 'Field';
          invalidFields.push(label);
        } else {
          input.classList.remove(...errorClasses);
        }
      });

      if (isFormValid) {
        const jenisLaporan = reportForm.querySelector('select').value;
        const lokasi = document.getElementById('locationInput').value;
        const deskripsi = reportForm.querySelector('textarea').value;
        const newId = initialReports.length + 1;

        const newReport = {
          id: newId,
          title: jenisLaporan,
          location: lokasi,
          desc: deskripsi,
          type: 'BARU',
          typeClass: 'bg-purple-600',
          typeIcon: 'fa-star',
          statusLabel: 'MENUNGGU VERIFIKASI',
          statusClass: 'text-yellow-600 bg-yellow-100',
          statusIcon: 'fa-hourglass-half',
        };

        initialReports.unshift(newReport);

        reportForm.reset();
        updateReportList();

        if (reportListContainer) {
          reportListContainer.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }

        Swal.fire({
          title: 'Laporan Terkirim!',
          text: 'Terima kasih, laporan Anda telah masuk ke sistem kami dan akan segera ditindaklanjuti.',
          icon: 'success',
          confirmButtonText: 'Selesai',
          confirmButtonColor: '#587e57',
          timer: 5000,
          timerProgressBar: true,
        });
      } else {
        let msg = 'Mohon lengkapi semua kolom yang bertanda wajib.';
        if (invalidFields.length > 0) {
          msg = `Mohon lengkapi: <b>${invalidFields[0]}</b> dan data lainnya.`;
        }

        Swal.fire({
          title: 'Data Belum Lengkap',
          html: msg,
          icon: 'error',
          confirmButtonText: 'Perbaiki',
          confirmButtonColor: '#d33',
        });

        const firstInvalid = reportForm.querySelector('.border-red-500');
        if (firstInvalid) {
          firstInvalid.focus();
        }
      }
    });
  }
});