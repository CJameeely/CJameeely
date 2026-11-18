/* Narrow screens (phones, iPad portrait): the sidebar collapses into a sticky
   top bar with a Menu button. On project pages the section tabs (Work /
   Details / Process) are copied into the bar so they stay one tap away.
   Load before sections.js so it picks up the copied tabs. */
(function () {
  var sidebar = document.querySelector(".sidebar");
  if (!sidebar) return;
  var root = document.documentElement;
  var brand = sidebar.querySelector(".sidebar-brand");

  var btn = document.createElement("button");
  btn.className = "nav-toggle";
  btn.type = "button";
  btn.setAttribute("aria-expanded", "false");
  btn.innerHTML = '<span class="open-label">Menu</span><span class="close-label">Close</span>';
  if (brand) brand.after(btn); else sidebar.prepend(btn);

  var sub = sidebar.querySelector(".nav-list .nav-sub");
  if (sub) {
    var tabs = sub.cloneNode(true);
    tabs.className = "nav-sub section-tabs";
    tabs.setAttribute("aria-label", "Sections");
    btn.after(tabs);
  }

  function setOpen(open) {
    root.classList.toggle("nav-open", open);
    btn.setAttribute("aria-expanded", String(open));
  }
  btn.addEventListener("click", function () {
    setOpen(!root.classList.contains("nav-open"));
  });
  sidebar.addEventListener("click", function (e) {
    if (e.target.closest("a") && !e.target.closest(".social-email-wrap")) setOpen(false);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") setOpen(false);
  });
  window.matchMedia("(min-width: 1025px)").addEventListener("change", function (m) {
    if (m.matches) setOpen(false);
  });
})();
