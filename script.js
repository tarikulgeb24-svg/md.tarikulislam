/* =============================================
   MD. TARIKUL ISLAM — PORTFOLIO JAVASCRIPT
   DNA Canvas · Cursor · Scroll Reveal · Nav
   ============================================= */

// ─── CUSTOM CURSOR ───────────────────────────
const cursor = document.getElementById('cursor');
const trail  = document.getElementById('cursor-trail');

let mx = 0, my = 0, tx = 0, ty = 0;

document.addEventListener('mousemove', (e) => {
  mx = e.clientX; my = e.clientY;
  if (cursor) {
    cursor.style.left = mx + 'px';
    cursor.style.top  = my + 'px';
  }
});

function animateTrail() {
  tx += (mx - tx) * 0.14;
  ty += (my - ty) * 0.14;
  if (trail) {
    trail.style.left = tx + 'px';
    trail.style.top  = ty + 'px';
  }
  requestAnimationFrame(animateTrail);
}
animateTrail();

// Hover effects on links/buttons
document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => {
    if (cursor) cursor.style.transform = 'translate(-50%,-50%) scale(2.5)';
    if (trail)  { trail.style.width = '50px'; trail.style.height = '50px'; trail.style.borderColor = 'rgba(74,240,200,0.8)'; }
  });
  el.addEventListener('mouseleave', () => {
    if (cursor) cursor.style.transform = 'translate(-50%,-50%) scale(1)';
    if (trail)  { trail.style.width = '28px'; trail.style.height = '28px'; trail.style.borderColor = 'rgba(74,240,200,0.4)'; }
  });
});

// ─── NAV SCROLL EFFECT ────────────────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

// ─── MOBILE MENU ─────────────────────────────
const hamburger   = document.getElementById('hamburger');
const mobileMenu  = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');

hamburger?.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});
mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
  });
});

// ─── DNA HELIX CANVAS ANIMATION ───────────────
const canvas = document.getElementById('dna-canvas-el');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let W, H, animId;

  function resizeCanvas() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  const NUM_STRANDS = 3;
  const PAIRS       = 18;
  const SPEED       = 0.008;
  let t = 0;

  // Color theme: teal & cyan
  const colors = ['#4af0c8', '#1ab8ff', '#7aecd6'];

  function drawDNA(offsetX, offsetY, phase, colorA, colorB, scale = 1) {
    const amplitude = 70 * scale;
    const period    = H / 4;
    const spacing   = H / PAIRS;

    ctx.lineWidth = 1.5 * scale;

    // Backbone strand A
    ctx.beginPath();
    ctx.strokeStyle = colorA;
    ctx.globalAlpha = 0.7;
    for (let y = 0; y <= H; y += 4) {
      const x = offsetX + amplitude * Math.sin((y / period) * Math.PI * 2 + phase + t);
      y === 0 ? ctx.moveTo(x, y + offsetY) : ctx.lineTo(x, y + offsetY);
    }
    ctx.stroke();

    // Backbone strand B
    ctx.beginPath();
    ctx.strokeStyle = colorB;
    for (let y = 0; y <= H; y += 4) {
      const x = offsetX + amplitude * Math.sin((y / period) * Math.PI * 2 + phase + t + Math.PI);
      y === 0 ? ctx.moveTo(x, y + offsetY) : ctx.lineTo(x, y + offsetY);
    }
    ctx.stroke();

    // Base pairs (rungs)
    ctx.globalAlpha = 0.35;
    for (let i = 0; i <= PAIRS; i++) {
      const y  = (i * spacing + offsetY) % (H + spacing) - spacing / 2;
      const x1 = offsetX + amplitude * Math.sin((y / period) * Math.PI * 2 + phase + t);
      const x2 = offsetX + amplitude * Math.sin((y / period) * Math.PI * 2 + phase + t + Math.PI);

      // Gradient rung
      const grad = ctx.createLinearGradient(x1, y, x2, y);
      grad.addColorStop(0, colorA);
      grad.addColorStop(1, colorB);
      ctx.strokeStyle = grad;
      ctx.lineWidth   = 1 * scale;
      ctx.beginPath();
      ctx.moveTo(x1, y);
      ctx.lineTo(x2, y);
      ctx.stroke();

      // Nucleotide dots
      ctx.globalAlpha = 0.5;
      ctx.fillStyle = colorA;
      ctx.beginPath(); ctx.arc(x1, y, 2.5 * scale, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = colorB;
      ctx.beginPath(); ctx.arc(x2, y, 2.5 * scale, 0, Math.PI * 2); ctx.fill();
      ctx.globalAlpha = 0.35;
    }

    ctx.globalAlpha = 1;
  }

  // Particle system (floating molecules)
  const particles = Array.from({ length: 40 }, () => ({
    x: Math.random() * 1000,
    y: Math.random() * 1000,
    r: Math.random() * 2 + 1,
    vx: (Math.random() - 0.5) * 0.3,
    vy: (Math.random() - 0.5) * 0.3,
    alpha: Math.random() * 0.5 + 0.1,
    color: colors[Math.floor(Math.random() * colors.length)]
  }));

  function drawParticles() {
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.globalAlpha = 1;
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    // Draw 3 interleaved helices across width
    const positions = [
      { x: W * 0.18, phase: 0,            ca: '#4af0c8', cb: '#1ab8ff', s: 0.85 },
      { x: W * 0.5,  phase: Math.PI / 3,  ca: '#1ab8ff', cb: '#4af0c8', s: 1.0  },
      { x: W * 0.82, phase: Math.PI * 0.7, ca: '#4af0c8', cb: '#7aecd6', s: 0.85 },
    ];

    positions.forEach(p => drawDNA(p.x, 0, p.phase, p.ca, p.cb, p.s));
    drawParticles();

    t += SPEED;
    animId = requestAnimationFrame(draw);
  }

  draw();
}

// ─── SCROLL REVEAL ────────────────────────────
const revealEls = document.querySelectorAll(
  '.section-label, .section-heading, .about-grid, .timeline-item, ' +
  '.research-card, .ongoing-work, .skill-block, .pub-item, ' +
  '.training-item, .award-item, .extra-card, .referee-card, ' +
  '.contact-left, .contact-right, .ow-card, .training-col'
);

revealEls.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, 60);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

// ─── STAGGERED CHILDREN REVEAL ────────────────
const staggerParents = document.querySelectorAll('.skills-grid, .extra-grid, .referees-grid, .awards-list, .pub-list');
staggerParents.forEach(parent => {
  const children = parent.children;
  Array.from(children).forEach((child, i) => {
    child.classList.add('reveal');
    child.style.transitionDelay = `${i * 80}ms`;
  });
});

// ─── ACTIVE NAV LINK ON SCROLL ────────────────
const sections  = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === `#${id}`) {
          link.style.color = 'var(--accent)';
        }
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));

// ─── CONTACT FORM ─────────────────────────────
const form = document.getElementById('contact-form');
form?.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = form.querySelector('button[type="submit"]');
  btn.textContent = '✓ Message Sent!';
  btn.style.background = 'var(--accent2)';
  btn.style.borderColor = 'var(--accent2)';
  setTimeout(() => {
    btn.textContent = 'Send Message →';
    btn.style.background = '';
    btn.style.borderColor = '';
    form.reset();
  }, 3000);
});

// ─── SKILL PILL HOVER GLOW ────────────────────
document.querySelectorAll('.skill-pills span').forEach(pill => {
  pill.addEventListener('mouseenter', () => {
    pill.style.boxShadow = '0 0 12px rgba(74,240,200,0.25)';
  });
  pill.addEventListener('mouseleave', () => {
    pill.style.boxShadow = '';
  });
});

// ─── SMOOTH ANCHOR SCROLL WITH OFFSET ─────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top    = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ─── PAGE LOAD ────────────────────────────────
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.6s ease';
  setTimeout(() => { document.body.style.opacity = '1'; }, 50);
});
