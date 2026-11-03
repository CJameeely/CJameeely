/* Liquid backdrop. Home page: domain-warped noise in Morandi tones (grey-green,
   sand, dusty rose) on black, seen partly through a large glass sphere.
   <canvas data-palette="green|echo|morandi-flow|ld"> gives project pages their own flow with no sphere.
   Falls back to a CSS gradient without WebGL. */
(function () {
  var canvas = document.getElementById("liquid");
  if (!canvas) return;

  var gl = canvas.getContext("webgl", { antialias: false, alpha: false });
  if (!gl) {
    document.body.classList.add("no-webgl");
    return;
  }

  var vert = [
    "attribute vec2 a;",
    "void main() { gl_Position = vec4(a, 0.0, 1.0); }"
  ].join("\n");

  var frag = [
    "precision highp float;",
    "uniform vec2 uRes;",
    "uniform float uTime;",
    "uniform vec2 uMouse;",
    "uniform float uScroll;",
    "uniform vec3 uC1;",
    "uniform vec3 uC2;",
    "uniform vec3 uC3;",
    "uniform float uSphere;",

    "float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }",
    "float noise(vec2 p) {",
    "  vec2 i = floor(p), f = fract(p);",
    "  vec2 u = f * f * (3.0 - 2.0 * f);",
    "  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),",
    "             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);",
    "}",
    "float fbm(vec2 p) {",
    "  float v = 0.0, a = 0.5;",
    "  mat2 m = mat2(1.6, 1.2, -1.2, 1.6);",
    "  for (int i = 0; i < 4; i++) { v += a * noise(p); p = m * p; a *= 0.5; }",
    "  return v;",
    "}",

    // Liquid field: two levels of domain warping give folded, ribbon-like flow
    "vec3 field(vec2 p, float t) {",
    "  vec2 q = vec2(fbm(p + vec2(0.0, t * 0.5)), fbm(p + vec2(5.2, 1.3) - t * 0.35));",
    "  vec2 r = vec2(fbm(p + 3.5 * q + vec2(1.7, 9.2) + t * 0.25),",
    "                fbm(p + 3.5 * q + vec2(8.3, 2.8) - t * 0.2));",
    "  float f = fbm(p + 3.0 * r + uMouse * 0.6);",
    // Stretch the field, then pick out separate ribbons with black gaps between
    "  float v = clamp((f - 0.28) / 0.44, 0.0, 1.0);",
    "  float wGreen = exp(-pow((v - 0.36) / 0.1, 2.0));",
    "  float wAmber = exp(-pow((v - 0.78) / 0.12, 2.0));",
    "  float wBlood = exp(-pow((v - 0.58) / 0.1, 2.0)) * smoothstep(0.45, 0.65, r.y);",
    "  vec3 col = uC1 * wGreen + uC2 * wAmber + uC3 * wBlood;",
    "  return col;",
    "}",

    "void main() {",
    "  vec2 p = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;",
    "  float t = uTime * 0.06 + uScroll * 0.6;",
    "  vec2 fp = p * 0.85;",
    "  vec3 col = field(fp, t);",

    // Glass sphere: magnify + shift the field inside, thin rim of light
    "  vec2 c = vec2(0.62, 0.42) + uMouse * 0.04 + vec2(-0.55, 0.3) * uScroll;",
    "  float R = 0.95;",
    "  float d = length(p - c);",
    "  if (uSphere > 0.5 && d < R) {",
    "    float k = d / R;",
    "    vec2 lp = c + (p - c) * (0.72 + 0.28 * k * k);",
    "    vec3 inner = field(lp * 0.85 + vec2(0.35, -0.2), t + 3.0);",
    "    inner = inner * 1.15 + vec3(0.015) + vec3(0.5, 0.45, 0.4) * pow(k, 12.0) * 0.12;",
    "    col = mix(col, inner, smoothstep(R, R - 0.012, d));",
    "  }",
    "  float rim = exp(-abs(d - R) * 220.0) * uSphere;",
    "  col += vec3(0.8, 0.78, 0.74) * rim * 0.4;",
    "  col *= 1.0 - 0.35 * smoothstep(R + 0.12, R, d) * step(R, d) * uSphere;",

    // Vignette and fine grain
    "  vec2 uv = gl_FragCoord.xy / uRes;",
    "  col *= smoothstep(1.25, 0.25, length(uv - 0.5) * 1.4);",
    "  col += (hash(gl_FragCoord.xy + fract(uTime)) - 0.5) * 0.025;",
    "  col *= 1.0 - 0.35 * uScroll;",
    "  gl_FragColor = vec4(max(col, 0.0), 1.0);",
    "}"
  ].join("\n");

  function compile(type, src) {
    var s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
      console.warn(gl.getShaderInfoLog(s));
      return null;
    }
    return s;
  }

  var vs = compile(gl.VERTEX_SHADER, vert);
  var fs = compile(gl.FRAGMENT_SHADER, frag);
  var prog = gl.createProgram();
  if (!vs || !fs) {
    document.body.classList.add("no-webgl");
    return;
  }
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);
  gl.useProgram(prog);

  var buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  var loc = gl.getAttribLocation(prog, "a");
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

  var uRes = gl.getUniformLocation(prog, "uRes");
  var uTime = gl.getUniformLocation(prog, "uTime");
  var uMouse = gl.getUniformLocation(prog, "uMouse");
  var uScroll = gl.getUniformLocation(prog, "uScroll");

  // Ribbon colours are pre-multiplied by their brightness
  var palettes = {
    morandi: { c1: [0.275, 0.297, 0.272], c2: [0.567, 0.520, 0.460], c3: [0.483, 0.393, 0.379], sphere: 1 },
    green:   { c1: [0.060, 0.230, 0.130], c2: [0.150, 0.380, 0.210], c3: [0.040, 0.200, 0.160], sphere: 0 },
    // Home palette at ~70% brightness, for reading pages
    "morandi-flow": { c1: [0.193, 0.208, 0.190], c2: [0.397, 0.364, 0.322], c3: [0.338, 0.275, 0.265], sphere: 0 },
    // Language Distortion: pale powder blue, lilac and cream, lighter than the home greens
    ld:      { c1: [0.400, 0.460, 0.540], c2: [0.600, 0.530, 0.600], c3: [0.600, 0.560, 0.470], sphere: 0 },
    echo:    { c1: [0.024, 0.042, 0.140], c2: [0.040, 0.160, 0.215], c3: [0.130, 0.042, 0.185], sphere: 0 }
  };
  var pal = palettes[canvas.getAttribute("data-palette")] || palettes.morandi;
  gl.uniform3fv(gl.getUniformLocation(prog, "uC1"), pal.c1);
  gl.uniform3fv(gl.getUniformLocation(prog, "uC2"), pal.c2);
  gl.uniform3fv(gl.getUniformLocation(prog, "uC3"), pal.c3);
  gl.uniform1f(gl.getUniformLocation(prog, "uSphere"), pal.sphere);

  // The fluid is soft by nature, so render below native resolution
  var SCALE = 0.5;
  function resize() {
    var w = Math.max(1, Math.floor(window.innerWidth * SCALE));
    var h = Math.max(1, Math.floor(window.innerHeight * SCALE));
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
    }
    gl.uniform2f(uRes, w, h);
  }
  window.addEventListener("resize", resize);
  resize();

  // Mouse drifts the liquid with a slow, eased follow
  var target = [0, 0], mouse = [0, 0];
  window.addEventListener("pointermove", function (e) {
    target[0] = e.clientX / window.innerWidth - 0.5;
    target[1] = 0.5 - e.clientY / window.innerHeight;
  });

  // Scrolling past the first screen moves the sphere aside and dims the field
  var scroll = 0;
  function scrollTarget() {
    return Math.min(1, Math.max(0, window.scrollY / window.innerHeight));
  }

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var start = performance.now();
  var running = true;

  function frame(now) {
    mouse[0] += (target[0] - mouse[0]) * 0.03;
    mouse[1] += (target[1] - mouse[1]) * 0.03;
    scroll += (scrollTarget() - scroll) * (reduced ? 1 : 0.06);
    gl.uniform1f(uScroll, scroll);
    gl.uniform1f(uTime, (now - start) / 1000 + 20.0);
    gl.uniform2f(uMouse, mouse[0], mouse[1]);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    if (running && !reduced) requestAnimationFrame(frame);
  }

  if (reduced) {
    window.addEventListener("scroll", function () { requestAnimationFrame(frame); });
  }

  document.addEventListener("visibilitychange", function () {
    var wasRunning = running;
    running = !document.hidden;
    if (running && !wasRunning && !reduced) requestAnimationFrame(frame);
  });

  requestAnimationFrame(function (now) {
    frame(now);
    canvas.classList.add("ready");
  });
})();
