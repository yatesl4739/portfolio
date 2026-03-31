// ── Typed title animation ────────────────────────────────────
const titles = [
  'CS Student',
  'Software Engineer',
  'Full-Stack Developer'
];

let titleIdx = 0, charIdx = 0, deleting = false;
const el = document.getElementById('typed-title');

function typeTitle() {
  const current = titles[titleIdx];
  if (!deleting) {
    el.textContent = current.slice(0, ++charIdx);
    if (charIdx === current.length) {
      deleting = true;
      setTimeout(typeTitle, 1800);
      return;
    }
    setTimeout(typeTitle, 70);
  } else {
    el.textContent = current.slice(0, --charIdx);
    if (charIdx === 0) {
      deleting = false;
      titleIdx = (titleIdx + 1) % titles.length;
      setTimeout(typeTitle, 300);
      return;
    }
    setTimeout(typeTitle, 35);
  }
}
typeTitle();

// ── Terminal animation ───────────────────────────────────────
const lines = [
  { type: 'cmd',  prompt: '~',    text: 'whoami' },
  { type: 'out',  text: 'Liam Yates — CS student @ <span style="color:var(--yellow)">Purdue</span>' },
  { type: 'cmd',  prompt: '~',    text: 'cat skills.json' },
  { type: 'json', text: '{ <span class="t-key">"languages"</span>: <span class="t-val">["C","Java","Python", "Javascript"]</span>,\n  <span class="t-key">"focus"</span>: <span class="t-val">"backend + machine learning"</span> }' },
 // { type: 'cmd',  prompt: '~',    text: 'git log --oneline -3' },
 // { type: 'out',  text: '<span style="color:var(--yellow)">a1b2c3d</span> feat: ship new feature' },
 // { type: 'out',  text: '<span style="color:var(--yellow)">d4e5f6a</span> fix: resolve edge case' },
 // { type: 'out',  text: '<span style="color:var(--yellow)">789b0cd</span> chore: update deps' },
];

const terminal = document.getElementById('terminal-output');
let lineIdx = 0;

function buildPrompt(path) {
  return `<span class="t-prompt">❯</span> `;
}

async function renderLine(line) {
  const span = document.createElement('span');
  span.className = 't-line';

  if (line.type === 'cmd') {
    span.innerHTML = `<span class="t-prompt">❯</span> <span class="t-cmd"></span>`;
    terminal.appendChild(span);
    const cmdEl = span.querySelector('.t-cmd');
    for (const ch of line.text) {
      cmdEl.textContent += ch;
      await delay(55);
    }
  } else {
    span.innerHTML = `<span class="t-out">${line.text}</span>`;
    terminal.appendChild(span);
  }
  terminal.scrollTop = terminal.scrollHeight;
}

async function runTerminal() {
  await delay(600);
  for (const line of lines) {
    await renderLine(line);
    await delay(line.type === 'cmd' ? 400 : 180);
  }
  // blinking cursor at end
  const cursor = document.createElement('span');
  cursor.className = 't-cursor';
  terminal.appendChild(cursor);
}

function delay(ms) { return new Promise(r => setTimeout(r, ms)); }

runTerminal();

// ── Footer year ──────────────────────────────────────────────
document.getElementById('footer-year').textContent = new Date().getFullYear();

// ── Scroll-in animation for cards ───────────────────────────
const observer = new IntersectionObserver(
  entries => entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateY(0)';
    }
  }),
  { threshold: 0.1 }
);

document.querySelectorAll('.project-card').forEach((card, i) => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(20px)';
  card.style.transition = `opacity .4s ease ${i * 0.1}s, transform .4s ease ${i * 0.1}s, border-color .2s, box-shadow .2s`;
  observer.observe(card);
});
