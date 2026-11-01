/* Comportamiento de la vista previa estática (equivalente ligero de los componentes React). */
(function () {
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Header: fondo al hacer scroll + menú móvil */
  var header = document.querySelector("header");
  var toggle = document.querySelector('[aria-controls="menu-movil"]');
  var menu = document.getElementById("menu-movil");
  var bars = toggle ? toggle.querySelectorAll("span") : [];
  var open = false;
  function paint() {
    var on = window.scrollY > 24 || open;
    header.classList.toggle("border-transparent", !on);
    ["border-line", "bg-ink-950/85", "backdrop-blur-md"].forEach(function (c) { header.classList.toggle(c, on); });
  }
  function setOpen(v) {
    open = v;
    menu.hidden = !v;
    toggle.setAttribute("aria-expanded", String(v));
    toggle.setAttribute("aria-label", v ? "Cerrar menú" : "Abrir menú");
    if (bars[0]) { bars[0].classList.toggle("rotate-45", v); bars[0].classList.toggle("-translate-y-1", !v); }
    if (bars[1]) { bars[1].classList.toggle("-rotate-45", v); bars[1].classList.toggle("translate-y-1", !v); }
    document.body.style.overflow = v ? "hidden" : "";
    paint();
  }
  if (toggle && menu) {
    toggle.addEventListener("click", function () { setOpen(!open); });
    menu.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", function () { setOpen(false); }); });
  }
  window.addEventListener("scroll", paint, { passive: true });
  paint();

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
