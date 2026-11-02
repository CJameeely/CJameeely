/* Single-page project: show one section at a time, driven by the URL hash
   so sub-nav links, the back button, and shared links all agree. */
(function () {
  var sections = Array.prototype.slice.call(document.querySelectorAll(".project-section"));
  var links = Array.prototype.slice.call(document.querySelectorAll('.nav-sub a[href^="#"]'));
  if (!sections.length) return;

  // Previous / next links at the foot of each section, labelled from the sub-nav
  function label(id) {
    var a = links.filter(function (l) { return l.getAttribute("href") === "#" + id; })[0];
    return a ? a.textContent : id;
  }
  sections.forEach(function (s, i) {
    var nav = document.createElement("nav");
    nav.className = "x-pager";
    var html = "";
    if (i > 0) {
      var p = sections[i - 1].id;
      html += '<a class="prev" href="#' + p + '"><small>Previous</small><span>&larr; ' + label(p) + "</span></a>";
    }
    if (i < sections.length - 1) {
      var n = sections[i + 1].id;
      html += '<a class="next" href="#' + n + '"><small>Next &middot; keep scrolling</small><span>' + label(n) +
        ' &rarr;</span><i class="x-pull" aria-hidden="true"></i></a>';
    }
    nav.innerHTML = html;
    s.appendChild(nav);
  });

  function show(id, fromNav) {
    var target = sections.filter(function (s) { return s.id === id; })[0] || sections[0];
    sections.forEach(function (s) { s.hidden = s !== target; });
    links.forEach(function (a) {
      a.classList.toggle("active", a.getAttribute("href") === "#" + target.id);
    });
    // On narrow screens the sub-nav sits above the content, so jump to it
    if (fromNav && window.matchMedia("(max-width: 800px)").matches) {
      target.scrollIntoView();
    } else {
      window.scrollTo(0, 0);
    }
  }

  window.addEventListener("hashchange", function () {
    lockUntil = Date.now() + 1100;
    setPull(0);
    show(location.hash.slice(1), true);
  });

  // Overscroll past the end of a section to continue into the next one.
  // The pull has to build past a threshold, so a stray flick never jumps.
  var THRESHOLD = 360, pull = 0, lockUntil = 0, decay = 0, touchY = null;

  function current() { return sections.filter(function (s) { return !s.hidden; })[0]; }
  function atBottom() {
    return window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
  }
  function setPull(v) {
    pull = Math.max(0, v);
    var s = current(), next = s && s.querySelector(".x-pager .next");
    if (next) next.style.setProperty("--pull", Math.min(1, pull / THRESHOLD));
  }
  function advance() {
    var i = sections.indexOf(current());
    if (i < sections.length - 1) location.hash = sections[i + 1].id;
  }
  function push(amount) {
    if (Date.now() < lockUntil || !atBottom()) return setPull(0);
    var i = sections.indexOf(current());
    if (i >= sections.length - 1) return;
    setPull(pull + amount);
    clearTimeout(decay);
    decay = setTimeout(function () { setPull(0); }, 700);
    if (pull >= THRESHOLD) advance();
  }

  window.addEventListener("wheel", function (e) {
    if (e.deltaY > 0) push(e.deltaMode === 1 ? e.deltaY * 30 : e.deltaY);
    else if (e.deltaY < 0) setPull(0);
  }, { passive: true });

  window.addEventListener("touchstart", function (e) { touchY = e.touches[0].clientY; }, { passive: true });
  window.addEventListener("touchmove", function (e) {
    if (touchY === null) return;
    var y = e.touches[0].clientY;
    push((touchY - y) * 1.6);
    touchY = y;
  }, { passive: true });
  window.addEventListener("touchend", function () { touchY = null; });

  document.addEventListener("keydown", function (e) {
    if (["PageDown", "ArrowDown", " "].indexOf(e.key) === -1 || e.target.closest("input, textarea, button, iframe")) return;
    push(THRESHOLD / 2);
  });

  show(location.hash.slice(1));

  // A deep link's native anchor jump would clip the section heading; start at the top
  if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  window.addEventListener("load", function () {
    if (location.hash && !window.matchMedia("(max-width: 800px)").matches) window.scrollTo(0, 0);
  });
})();
