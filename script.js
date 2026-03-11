// NAV scroll
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 50));

// Mobile menu
const hamburger = document.getElementById('hamburger');
const mobMenu   = document.getElementById('mob-menu');
const mobClose  = document.getElementById('mob-close');
hamburger?.addEventListener('click', () => mobMenu.classList.add('open'));
mobClose?.addEventListener('click', () => mobMenu.classList.remove('open'));
document.querySelectorAll('.mob-link').forEach(l => l.addEventListener('click', () => mobMenu.classList.remove('open')));

// DNA Canvas (light version)
const canvas = document.getElementById('dna-canvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let W, H, t = 0;
  function resize() { W = canvas.width = canvas.offsetWidth; H = canvas.height = canvas.offsetHeight; }
  resize();
  window.addEventListener('resize', resize);
  function drawHelix(cx, phase, c1, c2, sc) {
    const amp = 60 * sc, period = H / 3.5, spacing = H / 16;
    ctx.lineWidth = 1.5 * sc;
    ctx.beginPath(); ctx.strokeStyle = c1; ctx.globalAlpha = 0.55;
    for (let y = 0; y <= H; y += 4) { const x = cx + amp * Math.sin((y/period)*Math.PI*2 + phase + t); y===0 ? ctx.moveTo(x,y) : ctx.lineTo(x,y); }
    ctx.stroke();
    ctx.beginPath(); ctx.strokeStyle = c2;
    for (let y = 0; y <= H; y += 4) { const x = cx + amp * Math.sin((y/period)*Math.PI*2 + phase + t + Math.PI); y===0 ? ctx.moveTo(x,y) : ctx.lineTo(x,y); }
    ctx.stroke();
    ctx.globalAlpha = 0.2;
    for (let i = 0; i <= 16; i++) {
      const y = i * spacing; const x1 = cx + amp * Math.sin((y/period)*Math.PI*2 + phase + t); const x2 = cx + amp * Math.sin((y/period)*Math.PI*2 + phase + t + Math.PI);
      ctx.strokeStyle = c1; ctx.lineWidth = 0.8*sc; ctx.beginPath(); ctx.moveTo(x1,y); ctx.lineTo(x2,y); ctx.stroke();
    }
    ctx.globalAlpha = 1;
  }
  function draw() {
    ctx.clearRect(0,0,W,H);
    drawHelix(W*0.18, 0, '#1a56db', '#0e9f6e', 0.85);
    drawHelix(W*0.50, Math.PI/3, '#0e9f6e', '#1a56db', 1.0);
    drawHelix(W*0.82, Math.PI*0.7, '#1a56db', '#6366f1', 0.85);
    t += 0.007;
    requestAnimationFrame(draw);
  }
  draw();
}

// Scroll reveal
document.querySelectorAll('.sec-label,.sec-heading,.about-grid,.tl-item,.res-card,.ms-card,.skill-card,.pub-item,.tr-item,.aw-item,.exp-card,.ref-card,.ct-grid').forEach(el => {
  el.classList.add('reveal');
  new IntersectionObserver(([e]) => { if (e.isIntersecting) { e.target.classList.add('visible'); } }, { threshold: 0.1 }).observe(el);
});

// Stagger grids
document.querySelectorAll('.skills-grid,.exp-grid,.ref-grid,.aw-list,.pub-list').forEach(p => {
  Array.from(p.children).forEach((c,i) => { c.classList.add('reveal'); c.style.transitionDelay = i*60+'ms'; new IntersectionObserver(([e]) => { if(e.isIntersecting) e.target.classList.add('visible'); },{threshold:0.1}).observe(c); });
});

// Contact form
document.getElementById('ct-form')?.addEventListener('submit', e => {
  e.preventDefault();
  const btn = e.target.querySelector('button');
  btn.textContent = '✓ Sent!'; btn.style.backgroundColor = '#0e9f6e'; btn.style.borderColor = '#0e9f6e';
  setTimeout(() => { btn.textContent = 'Send Message'; btn.style.backgroundColor = ''; btn.style.borderColor = ''; e.target.reset(); }, 3000);
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (t) { e.preventDefault(); window.scrollTo({ top: t.getBoundingClientRect().top + scrollY - 70, behavior: 'smooth' }); }
  });
});
