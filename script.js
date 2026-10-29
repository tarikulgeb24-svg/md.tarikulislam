/* =============================================
   MD. TARIKUL ISLAM — PORTFOLIO JAVASCRIPT
   ============================================= */

// ─── NAV SCROLL EFFECT ────────────────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

// ─── MOBILE MENU ─────────────────────────────
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

hamburger?.addEventListener('click', () => {
  const open = mobileMenu?.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', String(!!open));
});
document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu?.classList.remove('open');
    hamburger?.setAttribute('aria-expanded', 'false');
  });
});

// ─── DNA HELIX CANVAS ANIMATION ───────────────
const canvas = document.getElementById('dna-canvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let W, H;

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const PAIRS = 16;
  const SPEED = 0.007;
  let t = 0;

  // Light-theme: soft blue/teal colors
  function drawHelix(cx, phase, colorA, colorB, scale) {
    const amp     = 65 * scale;
    const period  = H / 3.5;
    const spacing = H / PAIRS;

    ctx.lineWidth = 1.8 * scale;

    // Strand A
    ctx.beginPath();
    ctx.strokeStyle = colorA;
    ctx.globalAlpha = 0.6;
    for (let y = 0; y <= H; y += 3) {
      const x = cx + amp * Math.sin((y / period) * Math.PI * 2 + phase + t);
      y === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Strand B
    ctx.beginPath();
    ctx.strokeStyle = colorB;
    for (let y = 0; y <= H; y += 3) {
      const x = cx + amp * Math.sin((y / period) * Math.PI * 2 + phase + t + Math.PI);
      y === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Rungs
    ctx.globalAlpha = 0.25;
    for (let i = 0; i <= PAIRS; i++) {
      const y  = (i * spacing) % (H + spacing);
      const x1 = cx + amp * Math.sin((y / period) * Math.PI * 2 + phase + t);
      const x2 = cx + amp * Math.sin((y / period) * Math.PI * 2 + phase + t + Math.PI);
      const g  = ctx.createLinearGradient(x1, y, x2, y);
      g.addColorStop(0, colorA);
      g.addColorStop(1, colorB);
      ctx.strokeStyle = g;
      ctx.lineWidth = 1 * scale;
      ctx.beginPath(); ctx.moveTo(x1, y); ctx.lineTo(x2, y); ctx.stroke();

      // Nucleotide dots
      ctx.globalAlpha = 0.4;
      ctx.fillStyle = colorA;
      ctx.beginPath(); ctx.arc(x1, y, 2.5 * scale, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = colorB;
      ctx.beginPath(); ctx.arc(x2, y, 2.5 * scale, 0, Math.PI * 2); ctx.fill();
      ctx.globalAlpha = 0.25;
    }
    ctx.globalAlpha = 1;
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    drawHelix(W * 0.18, 0,             '#1a56db', '#0e9f6e', 0.85);
    drawHelix(W * 0.50, Math.PI / 3,   '#0e9f6e', '#1a56db', 1.0);
    drawHelix(W * 0.82, Math.PI * 0.7, '#1a56db', '#6366f1', 0.85);

    t += SPEED;
    requestAnimationFrame(draw);
  }
  draw();
}

// ─── SCROLL REVEAL ────────────────────────────
const revealTargets = document.querySelectorAll(
  '.section-label, .section-heading, .about-grid, .timeline-item, ' +
  '.research-card, .ongoing-work, .skill-block, .pub-item, ' +
  '.training-item, .award-item, .extra-card, .referee-card, ' +
  '.contact-left, .contact-right, .ow-card, .training-col'
);

revealTargets.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), 50);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

revealTargets.forEach(el => observer.observe(el));

// Stagger children inside grid parents
document.querySelectorAll('.skills-grid, .extra-grid, .referees-grid, .awards-list, .pub-list, .gallery-grid').forEach(parent => {
  Array.from(parent.children).forEach((child, i) => {
    child.classList.add('reveal');
    child.style.transitionDelay = `${i * 70}ms`;
    observer.observe(child);   // fix: these children were hidden but never revealed
  });
});

// ─── ACTIVE NAV HIGHLIGHT ─────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === `#${id}`) link.style.color = 'var(--accent)';
      });
    }
  });
}, { threshold: 0.45 }).observe ? sections.forEach(s =>
  new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.style.color = '';
          if (link.getAttribute('href') === `#${id}`) link.style.color = 'var(--accent)';
        });
      }
    });
  }, { threshold: 0.45 }).observe(s)
) : null;

// ─── CONTACT FORM ─────────────────────────────
// Messages are delivered straight to your inbox via FormSubmit (free, no account).
// ONE-TIME SETUP: after publishing, send yourself a test message from the live site.
// FormSubmit emails you an "Activate Form" link — click it once, and every message
// after that arrives directly in your inbox.
const CONTACT_EMAIL = 'tarikul.geb24@gmail.com';
const FORM_ENDPOINT = 'https://formsubmit.co/ajax/' + CONTACT_EMAIL;

document.getElementById('contact-form')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = e.target;
  const btn  = form.querySelector('button[type="submit"]');
  const note = document.getElementById('form-note');
  const orig = btn.textContent;
  const data = new FormData(form);

  const name    = (data.get('name') || '').trim();
  const email   = (data.get('email') || '').trim();
  const message = (data.get('message') || '').trim();

  if (data.get('_gotcha')) return; // spam trap
  if (!name || !email || !message || !/^\S+@\S+\.\S+$/.test(email)) {
    note.textContent = 'Please fill in your name, a valid email and a message.';
    return;
  }

  btn.disabled = true;
  btn.textContent = 'Sending…';
  note.textContent = '';
  try {
    const res = await fetch(FORM_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({
        name, email, message,
        _subject: 'New message from your portfolio website — ' + name,
        _template: 'table',
        _captcha: 'false'
      })
    });
    const out = await res.json().catch(() => ({}));
    if (!res.ok || String(out.success) === 'false') throw new Error(out.message || 'Request failed');
    btn.textContent = '✓ Message Sent!';
    note.textContent = 'Thank you! Your message has been sent. I will get back to you soon.';
    form.reset();
  } catch (err) {
    btn.textContent = orig;
    note.textContent = 'Could not send right now. Please email me directly at ' + CONTACT_EMAIL;
  } finally {
    setTimeout(() => { btn.disabled = false; btn.textContent = orig; }, 3000);
  }
});

// ─── SMOOTH SCROLL WITH OFFSET ────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 76, behavior: 'smooth' });
    }
  });
});


// ─── GALLERY + LIGHTBOX ───────────────────────
const galItems = Array.from(document.querySelectorAll('.gal-item'));
galItems.forEach(item => {
  const img = item.querySelector('img');
  // Show a placeholder until the real image exists in assets/gallery/
  const fail = () => item.classList.add('no-img');
  img.addEventListener('error', fail);
  if (img.complete && img.naturalWidth === 0) fail();
});

const lb = document.getElementById('lightbox');
const lbImg = document.getElementById('lb-img');
const lbCap = document.getElementById('lb-cap');
let lbIndex = 0;

function lbShow(i) {
  lbIndex = (i + galItems.length) % galItems.length;
  const img = galItems[lbIndex].querySelector('img');
  lbImg.src = img.src;
  lbImg.alt = img.alt;
  lbCap.textContent = galItems[lbIndex].querySelector('strong').textContent;
}
function lbOpen(i) {
  const list = galItems.filter(g => !g.classList.contains('no-img'));
  if (!list.length || galItems[i].classList.contains('no-img')) return;
  lbShow(i);
  lb.hidden = false;
  document.body.style.overflow = 'hidden';
}
function lbClose() { lb.hidden = true; document.body.style.overflow = ''; }
function lbStep(d) {
  let i = lbIndex;
  do { i = (i + d + galItems.length) % galItems.length; } while (galItems[i].classList.contains('no-img') && i !== lbIndex);
  lbShow(i);
}

galItems.forEach((item, i) => item.querySelector('.gal-btn').addEventListener('click', () => lbOpen(i)));
document.getElementById('lb-close')?.addEventListener('click', lbClose);
document.getElementById('lb-prev')?.addEventListener('click', () => lbStep(-1));
document.getElementById('lb-next')?.addEventListener('click', () => lbStep(1));
lb?.addEventListener('click', e => { if (e.target === lb) lbClose(); });
document.addEventListener('keydown', e => {
  if (!lb || lb.hidden) return;
  if (e.key === 'Escape') lbClose();
  if (e.key === 'ArrowLeft') lbStep(-1);
  if (e.key === 'ArrowRight') lbStep(1);
});
