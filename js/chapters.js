/* Chapters within a project section: a numbered index at the section's top
   and, on wide screens, a fixed scroll rail (SCROLL label, a line that fills
   with progress, chapter numbers that jump and light up as you read).
   Chapters are the blocks that carry a .lay-num. Load after sections.js. */
(function () {
  var sections = Array.prototype.slice.call(document.querySelectorAll(".project-section"));
  if (!sections.length) return;
  var smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function chaptersOf(section) {
    return Array.prototype.slice.call(section.querySelectorAll(".lay-num")).map(function (num) {
      var block = num.closest(".lay, .x-block") || num.parentElement;
      var holder = num.closest(".lay-text, .lay-cap, .lay-chapter > div, .em-anatomy > div") || num.parentElement;
      var label = holder.querySelector(".x-label");
      var text = label ? label.textContent.split("·")[0].trim() : "";
      return { num: num.textContent.trim(), text: text, el: block };
    });
  }

  function go(ch, e) {
    e.preventDefault();
    var top = ch.el.getBoundingClientRect().top + window.scrollY - (window.innerWidth <= 1024 ? 96 : 32);
    window.scrollTo({ top: top, behavior: smooth ? "smooth" : "auto" });
  }

  // Numbered index at the top of each section with two or more chapters
  var indexes = {};
  sections.forEach(function (s) {
    var chs = chaptersOf(s);
    if (chs.length < 2) return;
    var ol = document.createElement("ol");
    ol.className = "lay-index";
    chs.forEach(function (ch) {
      var li = document.createElement("li");
      var a = document.createElement("a");
      a.href = "#" + s.id;
      a.innerHTML = "<b></b><span></span>";
      a.querySelector("b").textContent = ch.num;
      a.querySelector("span").textContent = ch.text;
      a.addEventListener("click", function (e) { go(ch, e); });
      li.appendChild(a);
      ol.appendChild(li);
    });
    s.insertBefore(ol, s.firstElementChild);
    indexes[s.id] = { chs: chs, links: Array.prototype.slice.call(ol.querySelectorAll("a")) };
  });

  // Scroll rail
  var rail = document.createElement("nav");
  rail.className = "x-rail";
  rail.setAttribute("aria-label", "Chapters");
  rail.innerHTML = '<span class="x-rail-label">Scroll</span><span class="x-rail-line"><i></i></span><ol></ol>';
  document.body.appendChild(rail);
  var fill = rail.querySelector(".x-rail-line i");
  var list = rail.querySelector("ol");
  var current = null;

  function build() {
    var s = sections.filter(function (x) { return !x.hidden; })[0];
    list.innerHTML = "";
    current = s && indexes[s.id] ? { chs: indexes[s.id].chs, links: indexes[s.id].links.slice(), rail: [] } : null;
    if (!current) return;
    current.chs.forEach(function (ch) {
      var li = document.createElement("li");
      var a = document.createElement("a");
      a.href = "#" + s.id;
      a.innerHTML = "<span></span>";
      a.insertBefore(document.createTextNode(ch.num), a.firstChild);
      a.querySelector("span").textContent = ch.text;
      a.addEventListener("click", function (e) { go(ch, e); });
      li.appendChild(a);
      list.appendChild(li);
      current.rail.push(a);
    });
    update();
  }

  function update() {
    var max = document.documentElement.scrollHeight - window.innerHeight;
    fill.style.setProperty("--p", max > 0 ? Math.min(1, window.scrollY / max) : 0);
    if (!current) return;
    var on = -1, line = window.innerHeight * 0.4;
    current.chs.forEach(function (ch, i) {
      if (ch.el.getBoundingClientRect().top < line) on = i;
    });
    current.links.concat(current.rail).forEach(function (a, i) {
      a.classList.toggle("on", i % current.chs.length === on);
    });
  }

  var ticking = false;
  window.addEventListener("scroll", function () {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () { ticking = false; update(); });
  }, { passive: true });
  window.addEventListener("resize", update);
  window.addEventListener("hashchange", function () { setTimeout(build, 0); });
  build();
})();
