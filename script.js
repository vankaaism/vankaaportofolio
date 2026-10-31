(() => {
  const D = window.PORTFOLIO;
  const $ = (s) => document.querySelector(s);
  const esc = (s = "") =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  const ICONS = {
    code: '<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>',
    layout: '<rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>',
    mobile: '<rect x="6" y="2" width="12" height="20" rx="2"/><line x1="11" y1="18" x2="13" y2="18"/>',
    data: '<line x1="4" y1="20" x2="4" y2="10"/><line x1="10" y1="20" x2="10" y2="4"/><line x1="16" y1="20" x2="16" y2="13"/><line x1="22" y1="20" x2="2" y2="20"/>',
    design: '<path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><circle cx="11" cy="11" r="2"/>',
    book: '<path d="M2 4h6a4 4 0 0 1 4 4v13a3 3 0 0 0-3-3H2z"/><path d="M22 4h-6a4 4 0 0 0-4 4v13a3 3 0 0 1 3-3h7z"/>',
    server: '<rect x="2" y="3" width="20" height="7" rx="1"/><rect x="2" y="14" width="20" height="7" rx="1"/><line x1="6" y1="6.5" x2="6.01" y2="6.5"/><line x1="6" y1="17.5" x2="6.01" y2="17.5"/>',
  };
  const icon = (n) =>
    `<svg class="exp-card__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[n] || ICONS.code}</svg>`;
  const media = (src, alt) =>
    src ? `<img src="${esc(src)}" alt="${esc(alt)}" loading="lazy" />` : `<div class="placeholder">add image</div>`;
  const initials = (s = "") => s.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0].toUpperCase()).join("");
  const host = (u = "") => u.replace(/^https?:\/\//, "").replace(/\/$/, "");

  document.title = `${D.name} — Portfolio`;
  // ── Hero ──
  const H = D.hero || {};
  const initial = (D.name || "?")[0].toUpperCase();
  const lines = (t = "") => esc(t).replace(/\n/g, " <br />");
  const cardPill = (t) => `<span class="pill">${esc(t)}</span>`;

  const expItems = (D.volunteering || [])
    .map((x) => `<li><strong>${esc(x.role)}${x.org ? ` at ${esc(x.org)}` : ""}</strong><span>${esc([x.period, x.cause].filter(Boolean).join(" · "))}</span></li>`)
    .join("");

  const steps = D.howIWork || [];

  $("[data-hero]").innerHTML = `
    <div class="hi">
      <h1 class="hi__title">
        <span class="hi__line">Hi, I'm <span class="hi__avatar">${H.avatar ? `<img src="${esc(H.avatar)}" alt="" />` : `<span>${esc(initial)}</span>`}</span> ${esc(D.name)}!</span>
        <span class="hi__line"><span class="hi__soft">${esc(H.lead ?? "I'm a")}</span> ${esc(H.role)} <span class="hi__soft">${esc(H.link ?? "at")}</span></span>
        <span class="hi__line hi__line--last"><span class="hi__accent">${esc(H.org)}</span>${H.status ? `<span class="hi__status"><i></i>${esc(H.status)}</span>` : ""}</span>
      </h1>
      <p class="sr-only">${esc(D.fullName || "")}. ${esc(D.tagline || "")}</p>
      <div class="hi__cta">
        <a class="hi__btn" href="${esc(H.ctaHref || "#contact")}">${esc(H.ctaLabel || "Get in touch")}</a>
        <p>${lines(H.ctaText)}</p>
      </div>
    </div>

    <div class="bento">
      <article class="card card--exp">
        ${cardPill("Volunteering")}
        <div class="tl"><ul class="tl__list">${expItems}${expItems.replace(/<li>/g, '<li aria-hidden="true">')}</ul></div>
      </article>

      <article class="card card--how">
        ${cardPill("How I work")}
        <div class="how__body">
          ${steps.map((st, i) => `<div class="how__panel" data-step="${i}" ${i ? "hidden" : ""}><h3><span class="how__num">${String(i + 1).padStart(2, "0")}</span> ${esc(st.title)}</h3><p>${esc(st.text)}</p></div>`).join("")}
        </div>
        <div class="how__tabs" role="tablist">
          ${steps.map((st, i) => `<button role="tab" data-step="${i}" aria-selected="${i === 0}">${esc(steps[i].label || `Step ${String(i + 1).padStart(2, "0")}`)}</button>`).join("")}
        </div>
      </article>
    </div>`;

  // On phones, shrink the teal line ("philosophy, psychology and AI.") so it always fits on one line.
  const fitAccent = () => {
    const el = $(".hi__accent");
    if (!el) return;
    el.style.fontSize = "";
    if (innerWidth >= 600) return;
    const avail = el.closest(".hi__title").clientWidth; // the headline box (its grid track can stretch past it)
    const full = el.scrollWidth;
    if (full > avail) el.style.fontSize = `${(parseFloat(getComputedStyle(el).fontSize) * avail) / full * 0.98}px`;
  };
  fitAccent();
  document.fonts?.ready.then(fitAccent);
  addEventListener("resize", fitAccent, { passive: true });

  $(".how__tabs")?.addEventListener("click", (e) => {
    const b = e.target.closest("button");
    if (!b) return;
    document.querySelectorAll(".how__tabs button").forEach((x) => x.setAttribute("aria-selected", x === b));
    document.querySelectorAll(".how__panel").forEach((p) => (p.hidden = p.dataset.step !== b.dataset.step));
  });

  // ── Expertise ──

  $("[data-expertise]").innerHTML = D.expertise
    .map(
      (e, i) => `
      <article class="exp-card reveal">
        <div class="exp-card__head">
          ${icon(e.icon)}
          <h3 class="exp-card__title"><span>${esc(e.title)}</span>${e.sub ? `<span>${esc(e.sub)}</span>` : ""}</h3>
        </div>
        <div class="exp-card__tag">&lt;h3&gt;</div>
        <p class="exp-card__body">${esc(e.body)}</p>
        <div class="exp-card__tag">&lt;/h3&gt;</div>
      </article>`
    )
    .join("");

  // ── Work ──
  $("[data-work-intro]").textContent = D.workIntro;
  const f = D.featured;
  $("[data-featured]").innerHTML = `
    <div class="featured__stage">
    <div class="phone" aria-hidden="true">
      <div class="phone__body">
        <div class="phone__screen">${media(f.image, f.title)}</div>
        <div class="phone__notch"></div>
      </div>
    </div>
    <svg class="featured__arrow" viewBox="0 0 140 130" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M14 124 C 0 70, 40 30, 118 22" />
      <path d="M20 122 C 10 74, 46 38, 112 30" stroke-width="2" opacity=".7" />
      <path d="M96 8 L 124 22 L 100 42 Z" />
    </svg>
    </div>
    <div class="featured__text">
      <p class="featured__label">${esc(f.label)}</p>
      <p class="featured__title">${esc(f.title)}</p>
      ${f.description ? `<p class="featured__desc">${esc(f.description)}</p>` : ""}
      ${f.url ? `<a class="btn" href="${esc(f.url)}" target="_blank" rel="noopener">View Project</a>` : ""}
    </div>`;

  // ── Selected Works (two-pane explorer: list on the left, detail on the right) ──
  const P = D.projects || [];
  const cats = D.categories || [...new Set(P.map((p) => p.category))];
  const catClass = (c) => `cat-${cats.indexOf(c) % 4}`;
  const useYears = P.length && P.every((p) => p.year);
  const groupOf = (p) => (useYears ? String(p.year) : p.status === "in progress" ? "Ongoing" : p.status === "published" ? "Published" : "Completed");
  const groupOrder = useYears
    ? [...new Set(P.map(groupOf))].sort((a, b) => b.localeCompare(a))
    : ["Ongoing", "Completed", "Published"].filter((g) => P.some((p) => groupOf(p) === g));
  const pad = (n) => String(n).padStart(2, "0");
  const linkLabel = (u) => (/github\.com/.test(u) ? "View on GitHub" : /medium\.com/.test(u) ? "Read on Medium" : "View project");

  const thumb = (p) =>
    p.image ? `<img src="${esc(p.image)}" alt="" loading="lazy" />` : `<span class="${catClass(p.category)}">${esc((p.title.match(/[A-Za-z0-9]/) || ["•"])[0].toUpperCase())}</span>`;

  $("[data-works]").innerHTML = `
    <div class="works__panel">
      <h3 class="works__tab">Selected Works</h3>
      <div class="works__chips" role="group" aria-label="Filter by category">
        ${cats.map((c) => `<button class="chip ${catClass(c)}" data-cat="${esc(c)}" aria-pressed="true"><i></i>${esc(c)}</button>`).join("")}
      </div>
      <div class="works__list" role="listbox" aria-label="Projects">
        ${groupOrder
          .map(
            (g) => `
          <div class="works__group" data-group="${esc(g)}">
            <p class="works__year">${esc(g)}</p>
            ${P.map((p, i) => [p, i])
              .filter(([p]) => groupOf(p) === g)
              .map(
                ([p, i]) => `
              <button class="wk ${catClass(p.category)}" role="option" data-i="${i}" data-cat="${esc(p.category)}" aria-selected="false">
                <span class="wk__ctx">${esc(p.context || p.category)}</span>
                <span class="wk__title">${esc(p.title)}</span>
                <span class="wk__desc">${esc(p.description || "")}</span>
                <span class="wk__thumb" aria-hidden="true">${thumb(p)}</span>
              </button>`
              )
              .join("")}
          </div>`
          )
          .join("")}
      </div>
    </div>
    <div class="works__detail" data-detail aria-live="polite"></div>`;

  const showWork = (i, { scroll = false } = {}) => {
    const p = P[i];
    if (!p) return;
    document.querySelectorAll(".wk").forEach((w) => w.setAttribute("aria-selected", w.dataset.i === String(i)));
    const code = `${(p.category || "").slice(0, 3).toUpperCase()}-${pad(i + 1)}${(p.status || "").replace(/\W/g, "").slice(0, 2).toUpperCase()}`;
    $("[data-detail]").innerHTML = `
      <div class="detail__screen ${catClass(p.category)}">
        <div class="detail__media">${p.image ? `<img src="${esc(p.image)}" alt="${esc(p.title)}" />` : `<span class="detail__mark">${esc((p.title.match(/[A-Za-z0-9]/) || ["•"])[0].toUpperCase())}</span>`}</div>
        <span class="detail__fig">FIG. ${pad(i + 1)} / ${pad(P.length)}</span>
        <span class="detail__code">${esc(code)}</span>
        <button class="detail__nav detail__nav--prev" data-step="-1" aria-label="Previous project">‹</button>
        <button class="detail__nav detail__nav--next" data-step="1" aria-label="Next project">›</button>
      </div>
      <h3 class="detail__title">${esc(p.title)}</h3>
      <p class="detail__meta">
        ${p.context ? `<span><b>Type</b> ${esc(p.context)}</span>` : ""}
        ${p.status ? `<span><b>Status</b> ${esc(p.status)}</span>` : ""}
        ${p.year ? `<span><b>Year</b> ${esc(p.year)}</span>` : ""}
      </p>
      <span class="detail__tag">${esc(p.category)}</span>
      <hr class="detail__rule" />
      ${p.description ? `<p class="detail__desc">${esc(p.description)}</p>` : ""}
      ${p.url ? `<a class="detail__link" href="${esc(p.url)}" target="_blank" rel="noopener">${linkLabel(p.url)} ↗</a>` : `<p class="detail__soon">Link coming soon.</p>`}`;
    $("[data-detail]").classList.remove("swap");
    void $("[data-detail]").offsetWidth;
    $("[data-detail]").classList.add("swap");
    if (scroll && matchMedia("(max-width: 900px)").matches) $("[data-detail]").scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const visible = () => [...document.querySelectorAll(".wk:not([hidden])")].map((w) => +w.dataset.i);
  let current = visible()[0] ?? 0;
  showWork(current);

  $(".works__list").addEventListener("click", (e) => {
    const w = e.target.closest(".wk");
    if (w) showWork((current = +w.dataset.i), { scroll: true });
  });
  $(".works__list").addEventListener("keydown", (e) => {
    if (!["ArrowDown", "ArrowUp"].includes(e.key)) return;
    e.preventDefault();
    const v = visible(), k = v.indexOf(current);
    current = v[(k + (e.key === "ArrowDown" ? 1 : -1) + v.length) % v.length];
    showWork(current);
    document.querySelector(`.wk[data-i="${current}"]`).focus();
  });
  $("[data-detail]").addEventListener("click", (e) => {
    const b = e.target.closest(".detail__nav");
    if (!b) return;
    const v = visible(), k = v.indexOf(current);
    current = v[(k + +b.dataset.step + v.length) % v.length];
    showWork(current);
    document.querySelector(`.wk[data-i="${current}"]`).scrollIntoView({ block: "nearest", behavior: "smooth" });
  });
  $(".works__chips").addEventListener("click", (e) => {
    const c = e.target.closest(".chip");
    if (!c) return;
    c.setAttribute("aria-pressed", c.getAttribute("aria-pressed") !== "true");
    let on = [...document.querySelectorAll('.chip[aria-pressed="true"]')].map((x) => x.dataset.cat);
    if (!on.length) {
      document.querySelectorAll(".chip").forEach((x) => x.setAttribute("aria-pressed", "true"));
      on = cats;
    }
    document.querySelectorAll(".wk").forEach((w) => (w.hidden = !on.includes(w.dataset.cat)));
    document.querySelectorAll(".works__group").forEach((g) => (g.hidden = !g.querySelector(".wk:not([hidden])")));
    const v = visible();
    if (v.length && !v.includes(current)) showWork((current = v[0]));
  });

  // ── Experience (accordion; native <details name> = only one open at a time) ──
  if (D.experienceTitle) $("[data-experience-title]").textContent = D.experienceTitle;
  const BRIEF = '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M10 3h4a2 2 0 0 1 2 2v1h4a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4V5a2 2 0 0 1 2-2zm0 3h4V5h-4v1z"/></svg>';
  const TROPHY = '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M7 3h10v2h3v3a4 4 0 0 1-4 4h-.3A5 5 0 0 1 13 14.9V18h3v3H8v-3h3v-3.1A5 5 0 0 1 8.3 12H8a4 4 0 0 1-4-4V5h3V3zm0 4H6v1a2 2 0 0 0 1 1.7V7zm10 0v2.7A2 2 0 0 0 18 8V7h-1z"/></svg>';
  const PIN = '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z"/></svg>';
  const LINK = '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm4 4v2h4.6L7 15.6 8.4 17 15 10.4V15h2V7H9z"/></svg>';
  $("[data-experience]").innerHTML = (D.experience || [])
    .map(
      (x, i) => `
      <details class="exp reveal" name="experience" ${i === 0 ? "open" : ""}>
        <summary class="exp__head">
          <span class="exp__role">${esc(x.role)}${x.company ? ` @ ${esc(x.company)}` : ""}</span>
          <span class="exp__period">${esc(x.period)}</span>
          <span class="exp__toggle" aria-hidden="true"></span>
        </summary>
        <div class="exp__body">
          <div class="exp__main">
            <div class="exp__meta">
              ${x.location ? `<span>${PIN}${esc(x.location)}</span>` : ""}
              ${x.type ? `<span>${BRIEF}${esc(x.type)}</span>` : ""}
              ${x.website ? `<a href="https://${esc(host(x.website))}" target="_blank" rel="noopener">${LINK}${esc(host(x.website))}</a>` : ""}
            </div>
            ${x.description ? `<p class="exp__desc">${esc(x.description)}</p>` : ""}
            ${x.award ? `<div class="exp__award">${TROPHY}<div><strong>${esc(x.award.title)}</strong>${x.award.text ? `<p>${esc(x.award.text)}</p>` : ""}</div></div>` : ""}
            <ul class="exp__tags">${(x.tags || []).map((t) => `<li>${esc(t)}</li>`).join("")}</ul>
          </div>
          <div class="exp__logo${x.logoFit === "contain" ? " exp__logo--contain" : ""}">${x.logo ? `<img src="${esc(x.logo)}" alt="${esc(x.company)} logo" />` : `<span>${esc(x.initials || initials(x.company || x.role))}</span>`}</div>
        </div>
      </details>`
    )
    .join("");

  // ── Contact ──
  const C = D.contact || {};
  $("[data-contact]").innerHTML = `
    ${C.status ? `<p class="contact__status"><span class="contact__dot"></span>${esc(C.status)}</p>` : ""}
    <h2 class="contact__heading">${esc(C.heading)}</h2>
    <p class="contact__text">${esc(C.text).replace(/\n/g, "<br />")}</p>
    <div class="contact__reach">
      ${C.email ? `<a class="contact__email" href="mailto:${esc(C.email)}">${esc(C.email)}</a>` : ""}
      <ul class="contact__links">${(C.links || [])
        .filter((l) => l.url)
        .map((l) => `<li><a href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label)}</a></li>`)
        .join("")}</ul>
    </div>`;

  // ── Recommendations ──
  const T = (D.testimonials || []).slice(0, 3);
  $("[data-testimonials]").classList.add(`testimonials--${T.length}`);
  $("[data-testimonials]").innerHTML = T
    .map(
      (t, i) => `
      <figure class="tcard tcard--${i + 1}">
        <div class="tcard__top">
          <svg class="tcard__quote" viewBox="0 0 64 44" aria-hidden="true"><path fill="currentColor" d="M14 0C6 0 0 6 0 13.5S5.6 27 13 27c1.4 0 2.6-.2 3.6-.6C14.8 34 9.6 39 3 41l1.5 3C18 40.6 28 30 28 15.5 28 6.5 22 0 14 0zm36 0c-8 0-14 6-14 13.5S41.6 27 49 27c1.4 0 2.6-.2 3.6-.6C50.8 34 45.6 39 39 41l1.5 3C54 40.6 64 30 64 15.5 64 6.5 58 0 50 0z"/></svg>
          <div class="tcard__photo">${t.photo ? `<img src="${esc(t.photo)}" alt="${esc(t.name)}" loading="lazy" />` : `<span>${esc(t.initials || initials(t.name))}</span>`}</div>
        </div>
        <blockquote class="tcard__text">${esc(t.quote)}</blockquote>
        <figcaption>
          <strong>- ${esc(t.name)}</strong>
          ${t.title ? `<span>${esc(t.title)}</span>` : ""}
        </figcaption>
      </figure>`
    )
    .join("");

  // ── Scroll effects ──
  const io = new IntersectionObserver(
    (entries) => entries.forEach((en) => en.isIntersecting && (en.target.classList.add("in"), io.unobserve(en.target))),
    { threshold: 0.15 }
  );
  document.querySelectorAll(".reveal").forEach((el, i) => {
    el.style.transitionDelay = `${(i % 3) * 80}ms`;
    io.observe(el);
  });

  const top = $(".to-top");
  addEventListener("scroll", () => top.classList.toggle("show", scrollY > 600), { passive: true });
})();
