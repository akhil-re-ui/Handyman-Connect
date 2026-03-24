/* ============================================================
   HandyMan Connect — Main JavaScript
   Description: Navigation, search, filters, form handling
   ============================================================ */

/* ── Navbar scroll effect ── */
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar-main');
  if (navbar) {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  }
});

/* ── Active nav link ── */
function setActiveNav() {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar-main .nav-link').forEach(link => {
    link.classList.remove('active');
    const href = link.getAttribute('href');
    if (href === page || (page === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}
document.addEventListener('DOMContentLoaded', setActiveNav);

/* ── Search functionality ── */
function initSearch() {
  const input = document.getElementById('mainSearch');
  const btn   = document.getElementById('searchBtn');
  if (!input) return;

  function doSearch() {
    const query = input.value.trim().toLowerCase();
    if (!query) return;
    window.location.href = `pages/workers.html?service=${encodeURIComponent(query)}`;
  }
  btn && btn.addEventListener('click', doSearch);
  input.addEventListener('keydown', e => { if (e.key === 'Enter') doSearch(); });

  // Tag clicks
  document.querySelectorAll('.search-tag').forEach(tag => {
    tag.addEventListener('click', () => {
      input.value = tag.textContent.trim();
      doSearch();
    });
  });
}

/* ── Worker listing filter ── */
function initWorkerFilters() {
  const filterSkill    = document.getElementById('filterSkill');
  const filterLocation = document.getElementById('filterLocation');
  const filterAvail    = document.getElementById('filterAvail');
  const filterRating   = document.getElementById('filterRating');
  if (!filterSkill) return;

  function applyFilters() {
    const skill    = filterSkill.value.toLowerCase();
    const location = filterLocation.value.toLowerCase();
    const avail    = filterAvail.value;
    const rating   = parseFloat(filterRating.value) || 0;

    document.querySelectorAll('.worker-card-wrap').forEach(wrap => {
      const card = wrap.querySelector('.worker-card');
      const cardSkill    = (card.dataset.skill    || '').toLowerCase();
      const cardLocation = (card.dataset.location || '').toLowerCase();
      const cardAvail    = card.dataset.avail;
      const cardRating   = parseFloat(card.dataset.rating) || 0;

      const skillMatch    = !skill    || cardSkill.includes(skill);
      const locationMatch = !location || cardLocation.includes(location);
      const availMatch    = !avail    || cardAvail === avail;
      const ratingMatch   = cardRating >= rating;

      wrap.style.display = (skillMatch && locationMatch && availMatch && ratingMatch) ? '' : 'none';
    });
    updateWorkerCount();
  }

  [filterSkill, filterLocation, filterAvail, filterRating].forEach(el => {
    el && el.addEventListener('change', applyFilters);
  });

  // Handle URL params
  const params = new URLSearchParams(window.location.search);
  const svc = params.get('service');
  if (svc && filterSkill) {
    const opt = [...filterSkill.options].find(o => o.value.toLowerCase().includes(svc));
    if (opt) { filterSkill.value = opt.value; applyFilters(); }
  }
}

function updateWorkerCount() {
  const countEl = document.getElementById('workerCount');
  if (!countEl) return;
  const visible = document.querySelectorAll('.worker-card-wrap:not([style*="none"])').length;
  countEl.textContent = visible;
}

/* ── Form submit ── */
function initForms() {
  document.querySelectorAll('.handyman-form').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const toast = form.querySelector('.success-toast') || form.parentElement.querySelector('.success-toast');
      if (toast) {
        toast.style.display = 'flex';
        toast.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setTimeout(() => { toast.style.display = 'none'; }, 5000);
      }
      form.reset();
    });
  });
}

/* ── Contact form ── */
function initContact() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const toast = document.getElementById('contactToast');
    if (toast) {
      toast.style.display = 'flex';
      setTimeout(() => { toast.style.display = 'none'; }, 5000);
    }
    form.reset();
  });
}

/* ── Smooth reveal on scroll ── */
function initReveal() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
  });
}

/* ── Init all ── */
document.addEventListener('DOMContentLoaded', () => {
  initSearch();
  initWorkerFilters();
  initForms();
  initContact();
  initReveal();
  updateWorkerCount();
});
