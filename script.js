const root = document.documentElement;
const toggle = document.querySelector('#themeToggle');
const savedTheme = localStorage.getItem('theme');
if (savedTheme) root.dataset.theme = savedTheme;
toggle.querySelector('span').textContent = root.dataset.theme === 'light' ? '◐' : '☼';
toggle.addEventListener('click', () => {
  const next = root.dataset.theme === 'light' ? 'dark' : 'light';
  root.dataset.theme = next;
  localStorage.setItem('theme', next);
  toggle.querySelector('span').textContent = next === 'light' ? '◐' : '☼';
});

const timeEl = document.querySelector('#localTime');
function updateTime() {
  const time = new Intl.DateTimeFormat('zh-CN', { timeZone: 'Asia/Shanghai', hour: '2-digit', minute: '2-digit', hour12: false }).format(new Date());
  timeEl.textContent = `UTC+8 ${time}`;
}
updateTime(); setInterval(updateTime, 30000);

const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
}), { threshold: .12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

document.querySelectorAll('.filter').forEach(button => button.addEventListener('click', () => {
  document.querySelector('.filter.active').classList.remove('active');
  button.classList.add('active');
  const filter = button.dataset.filter;
  document.querySelectorAll('.article-card').forEach(card => card.classList.toggle('hidden', filter !== 'all' && card.dataset.category !== filter));
}));

const canvas = document.querySelector('#starfield');
const ctx = canvas.getContext('2d');
let stars = [], pointer = { x: -1000, y: -1000 };
function resize() {
  canvas.width = innerWidth * devicePixelRatio; canvas.height = innerHeight * devicePixelRatio;
  ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
  stars = Array.from({ length: Math.min(100, Math.floor(innerWidth / 12)) }, () => ({ x: Math.random() * innerWidth, y: Math.random() * innerHeight, r: Math.random() * 1.2 + .2, a: Math.random() * .45 + .08 }));
}
function draw() {
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  const light = root.dataset.theme === 'light';
  stars.forEach(s => { const dx = pointer.x - s.x, dy = pointer.y - s.y, d = Math.hypot(dx, dy); if (d < 130) { s.x -= dx * .002; s.y -= dy * .002; } ctx.beginPath(); ctx.fillStyle = light ? `rgba(40,60,90,${s.a})` : `rgba(190,220,255,${s.a})`; ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2); ctx.fill(); });
  requestAnimationFrame(draw);
}
addEventListener('resize', resize); addEventListener('pointermove', e => pointer = { x: e.clientX, y: e.clientY });
resize(); draw();
