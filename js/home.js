/* Home page: reveal the works index as it scrolls in, and float a
   project cover after the cursor while hovering a row. */
(function () {
  var works = document.getElementById("works");
  if (works && "IntersectionObserver" in window) {
    new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        works.classList.toggle("in-view", e.isIntersecting);
      });
    }, { threshold: 0.35 }).observe(works);
  } else if (works) {
    works.classList.add("in-view");
  }

  var preview = document.querySelector(".works-preview");
  if (!preview || !window.matchMedia("(hover: hover)").matches) return;

  var target = [0, 0], pos = [0, 0], raf = 0;

  function follow() {
    pos[0] += (target[0] - pos[0]) * 0.12;
    pos[1] += (target[1] - pos[1]) * 0.12;
    preview.style.transform = "translate(" + pos[0] + "px," + pos[1] + "px) translate(-50%, -50%)";
    raf = requestAnimationFrame(follow);
  }

  document.querySelectorAll(".works-list a").forEach(function (link) {
    link.addEventListener("pointerenter", function (e) {
      var src = link.getAttribute("data-preview");
      if (!src) return;
      if (preview.getAttribute("src") !== src) preview.setAttribute("src", src);
      if (!preview.classList.contains("visible")) {
        pos[0] = target[0] = e.clientX;
        pos[1] = target[1] = e.clientY;
      }
      preview.classList.add("visible");
      if (!raf) raf = requestAnimationFrame(follow);
    });
    link.addEventListener("pointerleave", function () {
      preview.classList.remove("visible");
    });
  });

  window.addEventListener("pointermove", function (e) {
    target[0] = e.clientX;
    target[1] = e.clientY;
  });

  preview.addEventListener("transitionend", function () {
    if (!preview.classList.contains("visible") && raf) {
      cancelAnimationFrame(raf);
      raf = 0;
    }
  });
})();
