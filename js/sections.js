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
      html += '<a class="next" href="#' + n + '"><small>Next</small><span>' + label(n) + " &rarr;</span></a>";
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
    show(location.hash.slice(1), true);
  });
  show(location.hash.slice(1));
})();
