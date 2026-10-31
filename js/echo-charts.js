/* Echo Maze research charts, drawn as SVG from the values in the printed
   spreads. Each gets a hover tooltip and a visually hidden data table. */
(function () {
  var NS = "http://www.w3.org/2000/svg";
  // Validated against a dark surface (dataviz validator, --mode dark)
  var HUMAN = "#2a8fd4", AI = "#b08a2a", ONE = "#2a8fd4", ETHIC = "#8f6ad6";

  var tip = document.createElement("div");
  tip.className = "em-tip";
  document.body.appendChild(tip);
  function showTip(e, html) {
    tip.innerHTML = html;
    tip.classList.add("on");
    var x = Math.min(e.clientX + 14, window.innerWidth - tip.offsetWidth - 8);
    tip.style.transform = "translate(" + x + "px," + (e.clientY - tip.offsetHeight - 12) + "px)";
  }
  function hideTip() { tip.classList.remove("on"); }

  function el(name, attrs, parent) {
    var n = document.createElementNS(NS, name);
    for (var k in attrs) n.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(n);
    return n;
  }
  function text(parent, x, y, str, cls, anchor) {
    var t = el("text", { x: x, y: y, class: cls || "", "text-anchor": anchor || "start" }, parent);
    t.textContent = str;
    return t;
  }
  function frame(fig, w, h) {
    var cap = document.createElement("figcaption");
    cap.textContent = fig.getAttribute("data-title");
    fig.appendChild(cap);
    return el("svg", { viewBox: "0 0 " + w + " " + h, role: "img", "aria-label": fig.getAttribute("data-title") }, fig);
  }
  function table(fig, head, rows) {
    var t = document.createElement("table");
    t.className = "sr-only";
    t.innerHTML = "<tr>" + head.map(function (h) { return "<th>" + h + "</th>"; }).join("") + "</tr>" +
      rows.map(function (r) { return "<tr>" + r.map(function (c) { return "<td>" + c + "</td>"; }).join("") + "</tr>"; }).join("");
    fig.appendChild(t);
  }
  // Bar path with 4px rounded top, square at the baseline
  function barPath(x, y, w, h, r) {
    r = Math.min(r, w / 2, h);
    return "M" + x + "," + (y + h) + "V" + (y + r) + "Q" + x + "," + y + " " + (x + r) + "," + y +
      "H" + (x + w - r) + "Q" + (x + w) + "," + y + " " + (x + w) + "," + (y + r) + "V" + (y + h) + "Z";
  }

  // 1. Perceived emotional safety (1–5), single series
  var safety = document.getElementById("chart-safety");
  if (safety) {
    var d1 = [["Human", 3.8], ["Traditional AI", 3.2], ["Emotionally-expressive AI", 4.5]];
    var W = 420, H = 274, L = 34, B = 40, T = 30, ph = H - B - T, pw = W - L - 8;
    var s1 = frame(safety, W, H);
    for (var g = 0; g <= 5; g++) {
      var gy = T + ph - (g / 5) * ph;
      el("line", { x1: L, x2: W - 8, y1: gy, y2: gy, class: "grid" }, s1);
      text(s1, L - 8, gy + 4, g, "tick", "end");
    }
    var slot = pw / d1.length, bw = slot * 0.46;
    d1.forEach(function (d, i) {
      var h = (d[1] / 5) * ph, x = L + slot * i + (slot - bw) / 2, y = T + ph - h;
      var bar = el("path", { d: barPath(x, y, bw, h, 4), fill: ONE, class: "mark" }, s1);
      text(s1, x + bw / 2, y - 7, d[1].toFixed(1), "val", "middle");
      text(s1, x + bw / 2, H - B + 18, d[0], "tick", "middle");
      var hit = el("rect", { x: L + slot * i, y: T, width: slot, height: ph, class: "hit" }, s1);
      hit.addEventListener("pointermove", function (e) {
        bar.classList.add("hover");
        showTip(e, "<b>" + d[0] + "</b>Perceived safety " + d[1].toFixed(1) + " / 5");
      });
      hit.addEventListener("pointerleave", function () { bar.classList.remove("hover"); hideTip(); });
    });
    text(s1, 0, 10, "Score (1–5)", "axis");
    table(safety, ["Interaction type", "Perceived emotional safety (1–5)"], d1);
  }

  // 2. Comfort in disclosure, human vs AI targets (two series)
  var comfort = document.getElementById("chart-comfort");
  if (comfort) {
    var cats = ["Friend", "Therapist", "AI Chatbot", "Stranger"];
    var series = [
      { name: "Human targets", color: HUMAN, v: [85, 90, 60, 30] },
      { name: "AI targets", color: AI, v: [65, 70, 80, 50] }
    ];
    var W2 = 420, H2 = 274, L2 = 34, R2 = 74, B2 = 40, T2 = 30;
    var ph2 = H2 - B2 - T2, pw2 = W2 - L2 - R2, min = 20, max = 100;
    function X(i) { return L2 + (i / (cats.length - 1)) * pw2; }
    function Y(v) { return T2 + ph2 - ((v - min) / (max - min)) * ph2; }
    var s2 = frame(comfort, W2, H2);
    for (var v = 20; v <= 100; v += 20) {
      el("line", { x1: L2, x2: L2 + pw2, y1: Y(v), y2: Y(v), class: "grid" }, s2);
      text(s2, L2 - 8, Y(v) + 4, v, "tick", "end");
    }
    cats.forEach(function (c, i) { text(s2, X(i), H2 - B2 + 18, c, "tick", "middle"); });
    var dots = [];
    series.forEach(function (s) {
      el("polyline", { points: s.v.map(function (v, i) { return X(i) + "," + Y(v); }).join(" "), stroke: s.color, class: "line" }, s2);
      dots.push(s.v.map(function (v, i) {
        return el("circle", { cx: X(i), cy: Y(v), r: 4, fill: s.color, class: "dot" }, s2);
      }));
      // Direct label at the line end
      text(s2, L2 + pw2 + 10, Y(s.v[3]) + 4, s.name, "lbl");
    });
    var cross = el("line", { x1: 0, x2: 0, y1: T2, y2: T2 + ph2, class: "cross" }, s2);
    var hit2 = el("rect", { x: L2 - 20, y: T2, width: pw2 + 40, height: ph2, class: "hit" }, s2);
    hit2.addEventListener("pointermove", function (e) {
      var r = s2.getBoundingClientRect();
      var px = (e.clientX - r.left) * (W2 / r.width);
      var i = Math.max(0, Math.min(cats.length - 1, Math.round(((px - L2) / pw2) * (cats.length - 1))));
      cross.setAttribute("x1", X(i)); cross.setAttribute("x2", X(i));
      cross.classList.add("on");
      dots.forEach(function (row) { row.forEach(function (c, j) { c.setAttribute("r", j === i ? 6 : 4); }); });
      showTip(e, "<b>" + cats[i] + "</b>" + series.map(function (s) {
        return '<span><i style="background:' + s.color + '"></i>' + s.name + " " + s.v[i] + "</span>";
      }).join(""));
    });
    hit2.addEventListener("pointerleave", function () {
      cross.classList.remove("on");
      dots.forEach(function (row) { row.forEach(function (c) { c.setAttribute("r", 4); }); });
      hideTip();
    });
    text(s2, 0, 10, "Comfort score", "axis");
    var legend = document.createElement("div");
    legend.className = "em-legend-row";
    legend.innerHTML = series.map(function (s) {
      return '<span><i style="background:' + s.color + '"></i>' + s.name + "</span>";
    }).join("");
    comfort.insertBefore(legend, s2);
    table(comfort, ["Recipient"].concat(series.map(function (s) { return s.name; })),
      cats.map(function (c, i) { return [c, series[0].v[i], series[1].v[i]]; }));
  }

  // 3. Ethical concerns, share of total — ranked horizontal bars
  var ethics = document.getElementById("chart-ethics");
  if (ethics) {
    var d3 = [["Emotional illusion", 35], ["Lack of human resonance", 30], ["Inequality in interaction", 20], ["Mechanization & commodification", 15]];
    var W3 = 440, rowH = 52, H3 = d3.length * rowH + 8, L3 = 0, max3 = 40;
    var s3 = frame(ethics, W3, H3);
    d3.forEach(function (d, i) {
      var y = i * rowH + 4, bw3 = (d[1] / max3) * (W3 - 60);
      text(s3, 0, y + 14, d[0], "tick");
      var bar = el("rect", { x: L3, y: y + 22, width: bw3, height: 14, rx: 4, fill: ETHIC, class: "mark" }, s3);
      text(s3, bw3 + 10, y + 34, d[1] + "%", "val");
      var hit = el("rect", { x: 0, y: y, width: W3, height: rowH, class: "hit" }, s3);
      hit.addEventListener("pointermove", function (e) {
        bar.classList.add("hover");
        showTip(e, "<b>" + d[0] + "</b>" + d[1] + "% of ethical concerns");
      });
      hit.addEventListener("pointerleave", function () { bar.classList.remove("hover"); hideTip(); });
    });
    table(ethics, ["Concern", "Share (%)"], d3);
  }
})();
