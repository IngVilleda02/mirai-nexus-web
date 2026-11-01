/* Comportamiento de la vista previa estática (equivalente ligero de los componentes React). */
(function () {
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Header: fondo al hacer scroll + barra flotante con apartado activo */
  var header = document.querySelector("[data-header]");
  var currentTab = "servicios";
  function spy() {
    var on = window.scrollY > 24;
    header.classList.toggle("border-transparent", !on);
    ["border-line", "bg-ink-950/80", "backdrop-blur-md"].forEach(function (c) { header.classList.toggle(c, on); });
    var vh = window.innerHeight * 0.4, cur = "";
    ["nosotros", "soluciones", "contacto"].forEach(function (id) {
      var el = document.getElementById(id); if (el && el.getBoundingClientRect().top < vh) cur = id;
    });
    if (cur === "soluciones") {
      var ind = document.getElementById("industrias");
      cur = currentTab === "servicios" && ind && ind.getBoundingClientRect().top < vh ? "industrias" : currentTab;
    }
    document.querySelectorAll("[data-nav]").forEach(function (a) {
      var act = a.getAttribute("data-nav") === "#" + cur;
      a.classList.toggle("text-paper", act); a.classList.toggle("text-steel-300", !act);
      var bar = a.querySelector("[data-nav-bar]"); bar.classList.toggle("scale-x-100", act); bar.classList.toggle("scale-x-0", !act);
      var mb = a.closest("[data-mobile-bar]");
      if (act && mb && spy.last !== cur) mb.scrollTo({ left: a.offsetLeft - (mb.clientWidth - a.offsetWidth) / 2, behavior: "smooth" });
    });
    spy.last = cur;
  }
  window.addEventListener("scroll", spy, { passive: true });
  window.addEventListener("mirai:tab", function (e) { currentTab = e.detail; spy(); });
  spy();

  /* Estado del horario de atención */
  var st = document.getElementById("pv-open-status");
  if (st) {
    var parts = new Intl.DateTimeFormat("en-US", { timeZone: "America/Mexico_City", weekday: "short", hour: "numeric", hour12: false }).formatToParts(new Date());
    var wd = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].indexOf(parts.find(function (p) { return p.type === "weekday"; }).value);
    var hr = Number(parts.find(function (p) { return p.type === "hour"; }).value) % 24;
    var open = wd >= 1 && wd <= 6 && hr >= 10 && hr < 19;
    st.outerHTML = '<span class="inline-flex items-center gap-2 border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] ' +
      (open ? 'border-nexus-500/40 text-paper"><span class="h-1.5 w-1.5 rounded-full bg-nexus-500"></span>Abierto ahora' : 'border-line-strong text-steel-500"><span class="h-1.5 w-1.5 rounded-full bg-steel-700"></span>Fuera de horario') + '</span>';
  }

  /* Aparición suave solo para lo que está fuera de pantalla al cargar */
  if (!reduced && "IntersectionObserver" in window) {
    var targets = document.querySelectorAll("main section article, main section li, main section blockquote");
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("is-visible"); io.unobserve(e.target); } });
    }, { rootMargin: "0px 0px -8% 0px" });
    targets.forEach(function (el) {
      if (el.getBoundingClientRect().top > window.innerHeight) { el.classList.add("reveal"); io.observe(el); }
    });
  }

  /* Título con efecto máquina de escribir (misma lógica que TypewriterHeadline.tsx) */
  var tw = document.querySelector("[data-typewriter]");
  if (tw) {
    var phrases = JSON.parse(tw.getAttribute("data-typewriter"));
    var tEl = tw.querySelector("[data-tw-text]"), dEl = tw.querySelector("[data-tw-dot]");
    var idx = 0, txt = phrases[0];
    function render() {
      var dot = txt.slice(-1) === ".";
      tEl.textContent = dot ? txt.slice(0, -1) : txt;
      dEl.classList.toggle("hidden", !dot);
    }
    function hold() { setTimeout(del, 2800); }
    function del() {
      if (!txt.length) { idx = (idx + 1) % phrases.length; return setTimeout(type, 200); }
      txt = txt.slice(0, -1); render(); setTimeout(del, 28);
    }
    function type() {
      var cur = phrases[idx];
      if (txt === cur) return hold();
      txt = cur.slice(0, txt.length + 1); render(); setTimeout(type, 55);
    }
    if (reduced) setInterval(function () { idx = (idx + 1) % phrases.length; txt = phrases[idx]; render(); }, 4300);
    else hold();
  }

  /* Pestañas de Soluciones (misma lógica que SolutionsTabs.tsx) */
  var tabs = Array.prototype.slice.call(document.querySelectorAll("[data-tab]"));
  if (tabs.length) {
    var aliases = { industrias: "servicios" };
    function activate(id, focus) {
      tabs.forEach(function (b) {
        var on = b.getAttribute("data-tab") === id;
        b.setAttribute("aria-selected", String(on)); b.tabIndex = on ? 0 : -1;
        ["bg-ink-900", "text-paper"].forEach(function (c) { b.classList.toggle(c, on); });
        ["text-steel-500", "hover:bg-ink-900/60", "hover:text-paper"].forEach(function (c) { b.classList.toggle(c, !on); });
        var bar = b.lastElementChild; bar.classList.toggle("scale-x-100", on); bar.classList.toggle("scale-x-0", !on);
        if (on && focus) b.focus();
      });
      document.querySelectorAll("[data-panel]").forEach(function (p) { p.hidden = p.getAttribute("data-panel") !== id; });
      window.dispatchEvent(new CustomEvent("mirai:tab", { detail: id }));
    }
    tabs.forEach(function (b, i) {
      b.addEventListener("click", function () { activate(b.getAttribute("data-tab")); });
      b.addEventListener("keydown", function (e) {
        var n = { ArrowRight: (i + 1) % tabs.length, ArrowLeft: (i - 1 + tabs.length) % tabs.length, Home: 0, End: tabs.length - 1 }[e.key];
        if (n === undefined) return; e.preventDefault(); activate(tabs[n].getAttribute("data-tab"), true);
      });
    });
    document.addEventListener("click", function (e) {
      var a = e.target.closest && e.target.closest('a[href^="#"]'); if (!a) return;
      var key = a.getAttribute("href").slice(1);
      var tabId = tabs.some(function (b) { return b.getAttribute("data-tab") === key; }) ? key : aliases[key];
      if (!tabId) return;
      e.preventDefault(); activate(tabId);
      requestAnimationFrame(function () {
        var t = document.getElementById(key === tabId ? "soluciones" : key);
        if (t) t.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
      });
    });
  }

  /* Red de nodos del hero */
  var canvas = document.querySelector("#inicio canvas");
  if (canvas && canvas.getContext) {
    var ctx = canvas.getContext("2d"), dpr = Math.min(window.devicePixelRatio || 1, 2), w = 0, h = 0, nodes = [], LINK = 150;
    function resize() {
      var r = canvas.getBoundingClientRect(); w = r.width; h = r.height;
      canvas.width = w * dpr; canvas.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var n = Math.round(Math.min(70, Math.max(26, (w * h) / 16000)));
      nodes = [];
      for (var i = 0; i < n; i++) nodes.push({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - .5) * .18, vy: (Math.random() - .5) * .18, red: i % 11 === 0 });
    }
    function draw() {
      ctx.clearRect(0, 0, w, h);
      for (var i = 0; i < nodes.length; i++) for (var j = i + 1; j < nodes.length; j++) {
        var a = nodes[i], b = nodes[j], d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < LINK) { var al = (1 - d / LINK) * .22; ctx.strokeStyle = a.red || b.red ? "rgba(227,23,43," + al * 1.6 + ")" : "rgba(243,244,246," + al + ")"; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); }
      }
      nodes.forEach(function (n) { var s = n.red ? 3 : 2; ctx.fillStyle = n.red ? "rgba(227,23,43,.95)" : "rgba(243,244,246,.55)"; ctx.fillRect(n.x - s / 2, n.y - s / 2, s, s); });
    }
    function step() {
      nodes.forEach(function (n) { n.x += n.vx; n.y += n.vy; if (n.x < 0 || n.x > w) n.vx *= -1; if (n.y < 0 || n.y > h) n.vy *= -1; });
      draw(); requestAnimationFrame(step);
    }
    resize(); window.addEventListener("resize", resize);
    if (reduced) draw(); else requestAnimationFrame(step);
  }

  /* Formulario: validación real; el envío aún no está conectado (igual que el sitio sin backend) */
  var form = document.querySelector('form[aria-label="Formulario de contacto"]');
  if (form) {
    var msgs = {
      name: "Escribe tu nombre.", company: "Escribe el nombre de tu empresa.", email: "Escribe un correo válido.",
      service: "Selecciona un tipo de servicio.", message: "Cuéntanos un poco más sobre tu proyecto (mín. 10 caracteres).",
      consent: "Necesitamos tu autorización para responderte."
    };
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      form.querySelectorAll(".pv-err").forEach(function (n) { n.remove(); });
      var f = form.elements, errs = [];
      if ((f.name.value || "").trim().length < 2) errs.push("name");
      if ((f.company.value || "").trim().length < 2) errs.push("company");
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.value.trim())) errs.push("email");
      if (!f.service.value) errs.push("service");
      if (f.message.value.trim().length < 10) errs.push("message");
      if (!f.consent.checked) errs.push("consent");
      ["name", "company", "email", "service", "message", "consent"].forEach(function (k) { f[k].setAttribute("aria-invalid", String(errs.indexOf(k) > -1)); });
      errs.forEach(function (k) {
        var p = document.createElement("p"); p.className = "pv-err mt-2 text-xs text-nexus-400"; p.textContent = msgs[k];
        var host = k === "consent" ? f[k].closest("label") : (k === "service" ? f[k].parentElement : f[k]);
        host.insertAdjacentElement("afterend", p);
      });
      var live = form.querySelector('[aria-live="polite"]');
      if (errs.length) { f[errs[0]].focus(); live.innerHTML = ""; return; }
      live.innerHTML = '<div class="mt-6 border border-line-strong bg-ink-950 p-5 text-sm leading-relaxed text-steel-300"><p class="font-medium text-paper">El envío en línea aún no está activo.</p><p class="mt-1">Tu solicitud <strong class="text-paper">no se ha enviado</strong>. Mientras activamos este canal, escríbenos a <span class="text-paper">contacto@mirainexus.com</span>.</p></div>';
    });
  }
})();
