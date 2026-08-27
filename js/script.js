// =========================================================
// Techniqus Infosec — Shared site behavior (v2)
// =========================================================

document.addEventListener('DOMContentLoaded', function () {

  // ---- Mobile nav toggle ----
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var isOpen = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      toggle.classList.toggle('active', isOpen);
    });
    links.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ---- Sticky header shadow + scroll progress bar ----
  var header = document.querySelector('.site-header');
  var progressBar = document.querySelector('.scroll-progress');
  window.addEventListener('scroll', function () {
    var scrollTop = window.scrollY || document.documentElement.scrollTop;

    if (header) {
      header.classList.toggle('scrolled', scrollTop > 12);
    }
    if (progressBar) {
      var docHeight = document.documentElement.scrollHeight - window.innerHeight;
      var pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progressBar.style.width = pct + '%';
    }

    var backBtn = document.querySelector('.back-to-top');
    if (backBtn) { backBtn.classList.toggle('visible', scrollTop > 480); }
  }, { passive: true });

  // ---- Back to top ----
  var backBtn = document.querySelector('.back-to-top');
  if (backBtn) {
    backBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ---- Scroll-reveal animations ----
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in-view'); });
  }

  // ---- Animated stat counters ----
  var counters = document.querySelectorAll('[data-count]');
  if ('IntersectionObserver' in window && counters.length) {
    var counterObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var target = parseFloat(el.getAttribute('data-count'));
        var suffix = el.getAttribute('data-suffix') || '';
        var duration = 1400;
        var start = null;

        function step(ts) {
          if (!start) start = ts;
          var progress = Math.min((ts - start) / duration, 1);
          var eased = 1 - Math.pow(1 - progress, 3);
          var value = Math.round(target * eased);
          el.textContent = value + suffix;
          if (progress < 1) { requestAnimationFrame(step); }
          else { el.textContent = target + suffix; }
        }
        requestAnimationFrame(step);
        counterObserver.unobserve(el);
      });
    }, { threshold: 0.6 });
    counters.forEach(function (el) { counterObserver.observe(el); });
  }

  // ---- Hero illustration mouse-parallax ----
  var heroScene = document.getElementById('heroScene');
  if (heroScene) {
    var layers = [
      { el: document.getElementById('parLayer1'), depth: 4 },
      { el: document.getElementById('parLayer2'), depth: 9 },
      { el: document.getElementById('parLayer3'), depth: 16 }
    ].filter(function (l) { return l.el; });

    heroScene.addEventListener('mousemove', function (e) {
      var rect = heroScene.getBoundingClientRect();
      var x = (e.clientX - rect.left) / rect.width - 0.5;
      var y = (e.clientY - rect.top) / rect.height - 0.5;
      layers.forEach(function (l) {
        l.el.style.transform = 'translate(' + (x * l.depth) + 'px,' + (y * l.depth) + 'px)';
      });
    });

    heroScene.addEventListener('mouseleave', function () {
      layers.forEach(function (l) { l.el.style.transform = 'translate(0,0)'; });
    });
  }

  // ---- Footer year ----
  var yearEl = document.getElementById('year');
  if (yearEl) { yearEl.textContent = new Date().getFullYear(); }

  // ---- Contact form: validate, then submit to Formspree (works on static hosting) ----
  var form = document.getElementById('contact-form');
  if (form) {
    var status = document.getElementById('form-status');
    var submitBtn = form.querySelector('button[type="submit"]');

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var name = form.querySelector('#name').value.trim();
      var email = form.querySelector('#email').value.trim();
      var message = form.querySelector('#message').value.trim();
      var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!name || !email || !message) {
        showStatus('Please fill in your name, email, and message.', 'error');
        return;
      }
      if (!emailPattern.test(email)) {
        showStatus('Please enter a valid email address.', 'error');
        return;
      }

      var actionUrl = form.getAttribute('action') || '';
      if (!actionUrl || actionUrl.indexOf('YOUR_FORM_ID') !== -1) {
        showStatus('Form endpoint not yet configured — replace YOUR_FORM_ID in contact.html with your Formspree form ID to start receiving messages.', 'error');
        return;
      }

      if (submitBtn) { submitBtn.disabled = true; submitBtn.style.opacity = '0.7'; }
      showStatus('Sending...', 'success');

      fetch(actionUrl, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: new FormData(form)
      }).then(function (response) {
        if (response.ok) {
          showStatus('Thanks, ' + name.split(' ')[0] + '. Your message has been sent — we will get back to you shortly.', 'success');
          form.reset();
        } else {
          response.json().then(function (data) {
            var msg = (data && data.errors && data.errors.length) ? data.errors.map(function (er) { return er.message; }).join(', ') : 'Something went wrong sending your message. Please try again or email us directly.';
            showStatus(msg, 'error');
          }).catch(function () {
            showStatus('Something went wrong sending your message. Please try again or email us directly.', 'error');
          });
        }
      }).catch(function () {
        showStatus('Network error — please check your connection and try again, or email us directly.', 'error');
      }).finally(function () {
        if (submitBtn) { submitBtn.disabled = false; submitBtn.style.opacity = '1'; }
      });
    });

    function showStatus(text, type) {
      status.textContent = text;
      status.className = 'form-status ' + type;
    }
  }

});
