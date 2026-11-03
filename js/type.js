/* Display headings rise word by word out of a mask as they enter view.
   Styles live in style.css (.split). */
(function () {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if (!("IntersectionObserver" in window)) return;

  // Wrap each word in a mask span, keeping inline markup such as <span class="g">
  function split(el) {
    var n = 0;
    var walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    var nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(function (node) {
      var frag = document.createDocumentFragment();
      node.nodeValue.split(/(\s+)/).forEach(function (part) {
        if (!part) return;
        if (/^\s+$/.test(part)) {
          frag.appendChild(document.createTextNode(part));
          return;
        }
        var w = document.createElement("span");
        w.className = "w";
        var inner = document.createElement("span");
        inner.textContent = part;
        inner.style.setProperty("--wi", n++);
        w.appendChild(inner);
        frag.appendChild(w);
      });
      node.parentNode.replaceChild(frag, node);
    });
    el.classList.add("split");
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add("is-in");
        io.unobserve(e.target);
      }
    });
  }, { rootMargin: "0px 0px -6% 0px" });

  document.querySelectorAll(".x-h, .page-heading").forEach(function (el) {
    split(el);
    io.observe(el);
  });
})();
