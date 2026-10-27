const $ = (id) => document.getElementById(id);
const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

/* icons: data-icon="github" etc. */
const ICONS = {
  github: '<path d="M9 19c-4 1.5-4-2-6-2.5M15 21v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12 12 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21"/>',
  linkedin: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7"/>',
  x: '<path d="M4 4l16 16M20 4L4 20"/>',
  code: '<path d="M8 8l-4 4 4 4M16 8l4 4-4 4M14 5l-4 14"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
  trophy: '<path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4zM7 6H4a3 3 0 0 0 3 4M17 6h3a3 3 0 0 1-3 4"/>',
  star: '<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/>',
  badge: '<circle cx="12" cy="9" r="6"/><path d="M8.5 14l-1.5 7 5-3 5 3-1.5-7"/>',
  users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18 14a6 6 0 0 1 3.5 6"/>'
};
const svg = (name) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${ICONS[name] || ICONS.globe}</svg>`;
document.querySelectorAll("[data-icon]").forEach((el) => {
  if (el.tagName === "SPAN") el.outerHTML = svg(el.dataset.icon);   // inside a link
  else el.innerHTML = svg(el.dataset.icon);                          // an icon box
});

/* menu: one link per section that has data-menu */
const sections = [...document.querySelectorAll("main section[data-menu]")];
$("menu").innerHTML = sections.map((s) => `<a href="#${s.id}" data-s="${s.id}">${esc(s.dataset.menu)}</a>`).join("");
$("menuBtn").addEventListener("click", () => {
  const open = $("menu").classList.toggle("open");
  $("menuBtn").setAttribute("aria-expanded", open);
});
$("menu").addEventListener("click", (e) => {
  if (e.target.closest("a")) { $("menu").classList.remove("open"); $("menuBtn").setAttribute("aria-expanded", "false"); }
});

/* highlight the section in view */
const links = [...document.querySelectorAll("#menu a")];
const obs = new IntersectionObserver((entries) => {
  entries.forEach((e) => { if (e.isIntersecting) links.forEach((a) => a.classList.toggle("on", a.dataset.s === e.target.id)); });
}, { rootMargin: "-45% 0px -50% 0px" });
sections.forEach((s) => obs.observe(s));

/* theme: follows the system, the button switches and remembers */
function currentDark() {
  const t = document.documentElement.dataset.theme;
  if (t) return t === "dark";
  return !matchMedia("(prefers-color-scheme: light)").matches;
}
try { const saved = localStorage.getItem("theme"); if (saved) document.documentElement.dataset.theme = saved; } catch (e) {}
$("themeBtn").addEventListener("click", () => {
  const next = currentDark() ? "light" : "dark";
  document.documentElement.dataset.theme = next;
  try { localStorage.setItem("theme", next); } catch (e) {}
});

/* hero: the terminal types data-line, then prints data-reply */
(function boot() {
  const el = $("term");
  if (!el) return;
  const first = el.dataset.line || "";
  const reply = `<span class="ok">✓</span> ${esc(el.dataset.reply || "")}`;
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
    el.innerHTML = esc(first) + "<br>" + reply + ' <span class="cur"></span>';
    return;
  }
  let i = 0;
  el.innerHTML = '<span class="cur"></span>';
  const tick = () => {
    i++;
    el.innerHTML = esc(first.slice(0, i)) + '<span class="cur"></span>';
    if (i < first.length) setTimeout(tick, 70);
    else setTimeout(() => { el.innerHTML = esc(first) + "<br>" + reply + ' <span class="cur"></span>'; }, 220);
  };
  setTimeout(tick, 150);
})();

/* coding practice: bar lengths from "solved/total" */
const BAR_COLOURS = ["var(--ok)", "var(--accent)", "var(--warn)"];
document.querySelectorAll(".bar").forEach((bar, i) => {
  const [s, t] = (bar.querySelector(".v")?.textContent || "0/1").split("/").map((n) => parseFloat(n.replace(/,/g, "")) || 0);
  const fill = bar.querySelector(".fill");
  if (fill) {
    fill.style.width = `${Math.min(100, t ? (s / t) * 100 : 0).toFixed(1)}%`;
    fill.style.background = BAR_COLOURS[i % BAR_COLOURS.length];
  }
});

/* activity squares: a steady made-up pattern until you connect real data */
if ($("heat")) {
  let seed = 7;
  const rnd = () => (seed = (seed * 9301 + 49297) % 233280) / 233280;
  $("heat").innerHTML = Array.from({ length: 26 * 7 }, () => {
    const r = rnd();
    const l = r < 0.35 ? 0 : r < 0.6 ? 1 : r < 0.8 ? 2 : r < 0.93 ? 3 : 4;
    return `<i data-l="${l}"></i>`;
  }).join("");
}

/* github: language bar from the legend, live numbers from GitHub */
const PALETTE = ["var(--accent)", "var(--ok)", "#6aa6e8", "var(--warn)", "var(--muted)"];
const langs = [...document.querySelectorAll("#langLegend [data-pct]")];
const total = langs.reduce((a, l) => a + (parseFloat(l.dataset.pct) || 0), 0) || 1;
langs.forEach((l, i) => { const dot = l.querySelector("i"); if (dot) dot.style.background = PALETTE[i % PALETTE.length]; });
if ($("langBar")) {
  $("langBar").innerHTML = langs.map((l, i) =>
    `<span style="width:${((parseFloat(l.dataset.pct) || 0) / total) * 100}%;background:${PALETTE[i % PALETTE.length]}"></span>`).join("");
}
const gh = $("github");
const ghUser = gh?.dataset.user;
if (ghUser && ghUser !== "yourname") {
  const put = (k, v) => { const el = gh.querySelector(`[data-gh="${k}"]`); if (el) el.textContent = v; };
  fetch(`https://api.github.com/users/${encodeURIComponent(ghUser)}`)
    .then((r) => (r.ok ? r.json() : Promise.reject()))
    .then(async (u) => {
      put("repos", u.public_repos);
      put("followers", u.followers);
      put("years", Math.max(1, new Date().getFullYear() - new Date(u.created_at).getFullYear()));
      try {
        const repos = await fetch(`https://api.github.com/users/${encodeURIComponent(ghUser)}/repos?per_page=100`).then((r) => r.json());
        if (Array.isArray(repos)) put("stars", repos.reduce((a, r) => a + (r.stargazers_count || 0), 0));
      } catch (e) {}
      if ($("ghNote")) $("ghNote").textContent = `Live from github.com/${ghUser}`;
    })
    .catch(() => {});
}

/* contact: copy email */
function toast(msg) {
  const t = $("toast");
  t.textContent = msg; t.hidden = false;
  clearTimeout(toast.t); toast.t = setTimeout(() => (t.hidden = true), 1800);
}
$("copyEmail")?.addEventListener("click", () => {
  const email = $("email").textContent.trim();
  const done = () => toast("Email copied");
  const fallback = () => {
    const r = document.createRange(); r.selectNodeContents($("email"));
    const s = getSelection(); s.removeAllRanges(); s.addRange(r);
    toast("Selected, press Ctrl+C to copy");
  };
  try { navigator.clipboard.writeText(email).then(done, fallback); } catch (e) { fallback(); }
});

/* footer year */
if ($("year")) $("year").textContent = new Date().getFullYear();
