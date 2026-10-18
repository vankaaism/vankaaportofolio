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
    server: '<rect x="2" y="3" width="20" height="7" rx="1"/><rect x="2" y="14" width="20" height="7" rx="1"/><line x1="6" y1="6.5" x2="6.01" y2="6.5"/><line x1="6" y1="17.5" x2="6.01" y2="17.5"/>',
  };
  const icon = (n) =>
    `<svg class="exp-card__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[n] || ICONS.code}</svg>`;
  const media = (src, alt) =>
    src ? `<img src="${esc(src)}" alt="${esc(alt)}" loading="lazy" />` : `<div class="placeholder">add image</div>`;

  document.title = `${D.name} — Portfolio`;
  $("[data-name]").textContent = D.name;

  // ── Expertise ──
  const accents = ["#fcb3bf", "#66d9ed", "#9b37ff", "#f6a04d"];
  $("[data-expertise]").innerHTML = D.expertise
    .map(
      (e, i) => `
      <article class="exp-card reveal" style="--accent:${accents[i % accents.length]}">
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
    <div class="featured__text">
      <p class="featured__label">${esc(f.label)}</p>
      <p class="featured__title">${esc(f.title)}</p>
      <a class="btn" href="${esc(f.url)}" target="_blank" rel="noopener">View Project</a>
    </div>`;

  const cats = [...new Set(D.projects.map((p) => p.category))];
  const count = (c) => String(c === "All" ? D.projects.length : D.projects.filter((p) => p.category === c).length).padStart(2, "0");
  $("[data-filters]").innerHTML =
    `<span class="filters__label">Filter by</span>` +
    ["All", ...cats]
      .map(
        (c, i, a) =>
          `<button class="filter" role="tab" data-cat="${esc(c)}" aria-selected="${c === "All"}">${esc(c)}<sup>${count(c)}</sup></button>${
            i < a.length - 1 ? '<span class="filter-sep">/</span>' : ""
          }`
      )
      .join("");

  $("[data-projects]").innerHTML = D.projects
    .map(
      (p) => `
      <a class="project reveal" data-cat="${esc(p.category)}" href="${esc(p.url)}" target="_blank" rel="noopener">
        <div class="project__media">${media(p.image, p.title)}</div>
        <div class="project__info">
          <h3 class="project__title">${esc(p.title)}</h3>
          <p class="project__cat">${esc(p.category)}</p>
        </div>
      </a>`
    )
    .join("");

  $("[data-filters]").addEventListener("click", (e) => {
    const btn = e.target.closest(".filter");
    if (!btn) return;
    const cat = btn.dataset.cat;
    document.querySelectorAll(".filter").forEach((b) => b.setAttribute("aria-selected", b === btn));
    document.querySelectorAll(".project").forEach((p) => {
      p.classList.toggle("is-hidden", cat !== "All" && p.dataset.cat !== cat);
    });
  });

  // ── Experience (accordion; native <details name> = only one open at a time) ──
  const initials = (s = "") => s.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0].toUpperCase()).join("");
  const PIN = '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z"/></svg>';
  const LINK = '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm4 4v2h4.6L7 15.6 8.4 17 15 10.4V15h2V7H9z"/></svg>';
  $("[data-experience]").innerHTML = (D.experience || [])
    .map(
      (x, i) => `
      <details class="exp reveal" name="experience" ${i === 0 ? "open" : ""}>
        <summary class="exp__head">
          <span class="exp__role">${esc(x.role)} @ ${esc(x.company)}</span>
          <span class="exp__period">${esc(x.period)}</span>
          <span class="exp__toggle" aria-hidden="true"></span>
        </summary>
        <div class="exp__body">
          <div class="exp__main">
            <div class="exp__meta">
              ${x.location ? `<span>${PIN}${esc(x.location)}</span>` : ""}
              ${x.website ? `<a href="https://${esc(x.website.replace(/^https?:\/\//, ""))}" target="_blank" rel="noopener">${LINK}${esc(x.website.replace(/^https?:\/\//, ""))}</a>` : ""}
            </div>
            <p class="exp__desc">${esc(x.description)}</p>
            <ul class="exp__tags">${(x.tags || []).map((t) => `<li>${esc(t)}</li>`).join("")}</ul>
          </div>
          <div class="exp__logo">${x.logo ? `<img src="${esc(x.logo)}" alt="${esc(x.company)} logo" />` : `<span>${esc(initials(x.company))}</span>`}</div>
        </div>
      </details>`
    )
    .join("");

  // ── Contact ──
  const C = D.contact || {};
  $("[data-contact]").innerHTML = `
    <h2 class="contact__heading">${esc(C.heading)}</h2>
    <p class="contact__text">${esc(C.text).replace(/\n/g, "<br />")}</p>
    <div class="contact__reach">
      <a class="contact__email" href="mailto:${esc(C.email)}">${esc(C.email)}</a>
      <ul class="contact__links">${(C.links || [])
        .map((l) => `<li><a href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label)}</a></li>`)
        .join("")}</ul>
    </div>`;

  // ── Recommendations ──
  $("[data-testimonials]").innerHTML = (D.testimonials || [])
    .slice(0, 3)
    .map(
      (t, i) => `
      <figure class="tcard tcard--${i + 1}">
        <div class="tcard__top">
          <svg class="tcard__quote" viewBox="0 0 64 44" aria-hidden="true"><path fill="currentColor" d="M14 0C6 0 0 6 0 13.5S5.6 27 13 27c1.4 0 2.6-.2 3.6-.6C14.8 34 9.6 39 3 41l1.5 3C18 40.6 28 30 28 15.5 28 6.5 22 0 14 0zm36 0c-8 0-14 6-14 13.5S41.6 27 49 27c1.4 0 2.6-.2 3.6-.6C50.8 34 45.6 39 39 41l1.5 3C54 40.6 64 30 64 15.5 64 6.5 58 0 50 0z"/></svg>
          <div class="tcard__photo">${t.photo ? `<img src="${esc(t.photo)}" alt="${esc(t.name)}" loading="lazy" />` : `<span>${esc(initials(t.name))}</span>`}</div>
        </div>
        <blockquote class="tcard__text">${esc(t.quote)}</blockquote>
        <figcaption>
          <strong>- ${esc(t.name)}</strong>
          <span>${esc(t.title)}</span>
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
