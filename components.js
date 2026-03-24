/* ============================================================
   HandyMan Connect — Shared Components (navbar + footer)
   Injected dynamically into every page
   ============================================================ */

function getNavbarHTML(basePath = '') {
  return `
  <nav class="navbar navbar-expand-lg navbar-main">
    <div class="container">
      <a class="navbar-brand" href="${basePath}index.html">
        <div class="brand-icon"><i class="fas fa-wrench"></i></div>
        <span class="brand-text">Handy<span>Man</span> Connect</span>
      </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu">
        <i class="fas fa-bars"></i>
      </button>
      <div class="collapse navbar-collapse" id="navMenu">
        <ul class="navbar-nav ms-auto align-items-lg-center gap-lg-1">
          <li class="nav-item"><a class="nav-link" href="${basePath}index.html">Home</a></li>
          <li class="nav-item"><a class="nav-link" href="${basePath}pages/services.html">Services</a></li>
          <li class="nav-item"><a class="nav-link" href="${basePath}pages/workers.html">Find Workers</a></li>
          <li class="nav-item"><a class="nav-link" href="${basePath}pages/request.html">Request Service</a></li>
          <li class="nav-item"><a class="nav-link" href="${basePath}pages/about.html">About</a></li>
          <li class="nav-item"><a class="nav-link" href="${basePath}pages/contact.html">Contact</a></li>
          <li class="nav-item ms-lg-2">
            <a class="nav-link nav-cta" href="${basePath}pages/register.html">
              <i class="fas fa-plus-circle me-1"></i> Join as Worker
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>`;
}

function getFooterHTML(basePath = '') {
  return `
  <footer class="footer">
    <div class="container">
      <div class="row g-5">
        <div class="col-lg-4">
          <div class="brand"><i class="fas fa-wrench me-2" style="color:var(--primary)"></i>Handy<span>Man</span> Connect</div>
          <p class="tagline mt-2">Connecting skilled local workers with homeowners who need reliable help — fast and easy.</p>
          <div class="social-links mt-4">
            <a href="#" class="social-link"><i class="fab fa-facebook-f"></i></a>
            <a href="#" class="social-link"><i class="fab fa-twitter"></i></a>
            <a href="#" class="social-link"><i class="fab fa-instagram"></i></a>
            <a href="#" class="social-link"><i class="fab fa-linkedin-in"></i></a>
            <a href="#" class="social-link"><i class="fab fa-youtube"></i></a>
          </div>
        </div>
        <div class="col-6 col-lg-2">
          <h6>Platform</h6>
          <ul class="footer-links">
            <li><a href="${basePath}index.html">Home</a></li>
            <li><a href="${basePath}pages/services.html">Services</a></li>
            <li><a href="${basePath}pages/workers.html">Find Workers</a></li>
            <li><a href="${basePath}pages/register.html">Register</a></li>
          </ul>
        </div>
        <div class="col-6 col-lg-2">
          <h6>Company</h6>
          <ul class="footer-links">
            <li><a href="${basePath}pages/about.html">About Us</a></li>
            <li><a href="${basePath}pages/contact.html">Contact</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">Careers</a></li>
          </ul>
        </div>
        <div class="col-6 col-lg-2">
          <h6>Services</h6>
          <ul class="footer-links">
            <li><a href="#">Plumbing</a></li>
            <li><a href="#">Electrical</a></li>
            <li><a href="#">Carpentry</a></li>
            <li><a href="#">Cleaning</a></li>
          </ul>
        </div>
        <div class="col-6 col-lg-2">
          <h6>Support</h6>
          <ul class="footer-links">
            <li><a href="#">Help Center</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of Use</a></li>
            <li><a href="#">Safety</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2026 HandyMan Connect.</p>
        <div class="social-links">
          <a href="#" class="social-link"><i class="fab fa-facebook-f"></i></a>
          <a href="#" class="social-link"><i class="fab fa-instagram"></i></a>
          <a href="#" class="social-link"><i class="fab fa-twitter"></i></a>
        </div>
      </div>
    </div>
  </footer>`;
}

/* ── Inject on load ── */
document.addEventListener('DOMContentLoaded', () => {
  const isInPages = window.location.pathname.includes('/pages/');
  const base = isInPages ? '../' : '';

  const navTarget  = document.getElementById('navbar-placeholder');
  const footTarget = document.getElementById('footer-placeholder');
  if (navTarget)  navTarget.outerHTML  = getNavbarHTML(base);
  if (footTarget) footTarget.outerHTML = getFooterHTML(base);

  // Re-run active nav after injection
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar-main .nav-link').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href')?.endsWith(page)) link.classList.add('active');
  });
});
