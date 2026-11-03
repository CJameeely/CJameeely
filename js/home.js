/* Home page: reveal the works index as it scrolls in, and retire the
   scroll cue once the page moves. */
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

  // The scroll cue bows out once the page has moved
  function onScroll() {
    document.documentElement.classList.toggle("scrolled", window.scrollY > 40);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
})();
