/* Project page polish: scroll reveals, image lightbox, and a slow
   cursor parallax on the cover. Styles live in idly.css. */
(function () {
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Reveal blocks as they enter the viewport, staggered among siblings
  var REVEAL = [
    ".x-p", ".x-sub", ".x-label", ".x-question", ".x-quote", ".x-side-note",
    ".x-box", ".x-card", ".x-point", ".x-artist", ".x-iter-row", ".x-callouts li",
    ".x-views figure", ".x-mats figure", ".x-tester", ".x-pager",
    ".project-section img:not(.x-hero img):not(.x-tester img)"
  ].join(",");

  // Hidden sections report the authored track list, e.g. "minmax(0, 1fr)" or "repeat(3, 1fr)"
  function columnCount(tracks) {
    var rep = /repeat\(\s*(\d+|auto-fill|auto-fit)/.exec(tracks);
    if (rep) return rep[1] === "1" ? 1 : 2;
    var depth = 0, count = 1;
    for (var i = 0; i < tracks.length; i++) {
      var ch = tracks[i];
      if (ch === "(") depth++;
      else if (ch === ")") depth--;
      else if (/\s/.test(ch) && depth === 0 && /\S/.test(tracks[i + 1] || "")) count++;
    }
    return count;
  }

  // Nearest ancestor laid out as side-by-side columns, so text and the image
  // beside it reveal together instead of each on its own trigger
  function rowOf(el, section) {
    for (var p = el.parentElement; p && p !== section; p = p.parentElement) {
      var cs = getComputedStyle(p);
      if (p.children.length < 2) continue;
      if (cs.display.indexOf("grid") > -1 && columnCount(cs.gridTemplateColumns.trim()) > 1) return p;
      if (cs.display.indexOf("flex") > -1 && cs.flexDirection.indexOf("row") === 0 && cs.flexWrap === "nowrap") return p;
    }
    return null;
  }

  if (!reduced && "IntersectionObserver" in window) {
    var groups = new Map();
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          (groups.get(e.target) || [e.target]).forEach(function (m) { m.classList.add("in"); });
          io.unobserve(e.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px" });

    document.querySelectorAll(".project-section").forEach(function (section) {
      var seen = new Set();
      var perColumn = new Map();
      section.querySelectorAll(REVEAL).forEach(function (el) {
        // Skip children of something that already reveals as a unit
        for (var p = el.parentElement; p && p !== section; p = p.parentElement) {
          if (seen.has(p)) return;
        }
        seen.add(el);
        el.classList.add("rv");

        var row = rowOf(el, section);
        if (!row) {
          var i = Array.prototype.indexOf.call(el.parentElement.children, el);
          el.style.setProperty("--rv-delay", Math.min(i, 5) * 70 + "ms");
          io.observe(el);
          return;
        }
        // Left column first, the column beside it just after; items stacked
        // within a column follow each other closely
        var col = row.firstElementChild, c = 0;
        while (col && !col.contains(el)) { col = col.nextElementSibling; c++; }
        var n = perColumn.get(col) || 0;
        perColumn.set(col, n + 1);
        el.style.setProperty("--rv-delay", Math.min(c, 4) * 90 + Math.min(n, 4) * 60 + "ms");
        if (!groups.has(row)) {
          groups.set(row, []);
          io.observe(row);
        }
        groups.get(row).push(el);
      });
    });
  }

  // Lightbox for diagrams and photos
  var box = document.createElement("div");
  box.className = "x-lightbox";
  box.setAttribute("role", "dialog");
  box.setAttribute("aria-modal", "true");
  box.innerHTML = '<img alt="" /><p></p>';
  document.body.appendChild(box);
  var boxImg = box.querySelector("img");
  var boxCap = box.querySelector("p");

  function close() { box.classList.remove("open"); }
  box.addEventListener("click", close);
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") close();
  });

  document.querySelectorAll(".project-section img").forEach(function (img) {
    if (img.closest(".x-hero, .x-tester") || !img.alt) return;
    img.classList.add("x-zoomable");
    img.addEventListener("click", function () {
      boxImg.src = img.currentSrc || img.src;
      boxImg.alt = img.alt;
      boxCap.textContent = img.alt;
      box.classList.add("open");
    });
  });

  // Hover / focus tooltips for chart marks that carry data-tip
  var tips = document.querySelectorAll("[data-tip]");
  if (tips.length) {
    var tip = document.createElement("div");
    tip.className = "em-tip";
    document.body.appendChild(tip);
    tips.forEach(function (el) {
      function show(x, y) {
        tip.textContent = el.getAttribute("data-tip");
        tip.classList.add("on");
        var left = Math.min(x + 14, window.innerWidth - tip.offsetWidth - 8);
        tip.style.transform = "translate(" + left + "px," + (y - tip.offsetHeight - 12) + "px)";
      }
      el.addEventListener("pointermove", function (e) { show(e.clientX, e.clientY); });
      el.addEventListener("focus", function () {
        var r = el.getBoundingClientRect();
        show(r.left + r.width / 2, r.top);
      });
      el.addEventListener("pointerleave", function () { tip.classList.remove("on"); });
      el.addEventListener("blur", function () { tip.classList.remove("on"); });
    });
  }

  // Annotated photos: a pin and its legend row highlight together
  document.querySelectorAll(".em-pin").forEach(function (pin) {
    var row = document.getElementById(pin.getAttribute("data-for"));
    if (!row) return;
    function on() { pin.classList.add("on"); row.classList.add("on"); }
    function off() { pin.classList.remove("on"); row.classList.remove("on"); }
    [pin, row].forEach(function (n) {
      n.addEventListener("pointerenter", on);
      n.addEventListener("pointerleave", off);
    });
    pin.addEventListener("focus", on);
    pin.addEventListener("blur", off);
  });

  // Cover parallax: title and face drift apart as the cursor moves
  var hero = document.querySelector(".x-hero");
  if (hero && !reduced && window.matchMedia("(hover: hover)").matches) {
    hero.addEventListener("pointermove", function (e) {
      var r = hero.getBoundingClientRect();
      hero.style.setProperty("--px", ((e.clientX - r.left) / r.width - 0.5).toFixed(3));
      hero.style.setProperty("--py", ((e.clientY - r.top) / r.height - 0.5).toFixed(3));
    });
    hero.addEventListener("pointerleave", function () {
      hero.style.setProperty("--px", 0);
      hero.style.setProperty("--py", 0);
    });
  }
})();
