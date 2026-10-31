/* Project page polish: scroll reveals, image lightbox, and a slow
   cursor parallax on the cover. Styles live in idly.css. */
(function () {
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Reveal blocks as they enter the viewport, staggered among siblings
  var REVEAL = [
    ".x-h", ".x-p", ".x-sub", ".x-label", ".x-question", ".x-quote", ".x-side-note",
    ".x-box", ".x-card", ".x-point", ".x-artist", ".x-iter-row", ".x-callouts li",
    ".x-views figure", ".x-mats figure", ".x-tester", ".x-pager",
    ".project-section img:not(.x-hero img):not(.x-tester img)"
  ].join(",");

  if (!reduced && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px" });

    document.querySelectorAll(".project-section").forEach(function (section) {
      var seen = new Set();
      section.querySelectorAll(REVEAL).forEach(function (el) {
        // Skip children of something that already reveals as a unit
        for (var p = el.parentElement; p && p !== section; p = p.parentElement) {
          if (seen.has(p)) return;
        }
        seen.add(el);
        var i = Array.prototype.indexOf.call(el.parentElement.children, el);
        el.style.setProperty("--rv-delay", Math.min(i, 5) * 70 + "ms");
        el.classList.add("rv");
        io.observe(el);
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
