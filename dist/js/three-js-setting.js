$(document).ready(function(){
    var WEBGL = {
  isWebGLAvailable: function() {
    try {
      var canvas = document.createElement("canvas");
      return !!(
        window.WebGLRenderingContext &&
        (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
      );
    } catch (e) {
      return false;
    }
  },

  isWebGL2Available: function() {
    try {
      var canvas = document.createElement("canvas");
      return !!(window.WebGL2RenderingContext && canvas.getContext("webgl2"));
    } catch (e) {
      return false;
    }
  },

  getWebGLErrorMessage: function() {
    return this.getErrorMessage(1);
  },

  getWebGL2ErrorMessage: function() {
    return this.getErrorMessage(2);
  },

  getErrorMessage: function(version) {
    var names = {
      1: "WebGL",
      2: "WebGL 2"
    };

    var contexts = {
      1: window.WebGLRenderingContext,
      2: window.WebGL2RenderingContext
    };

    var message =
      'Your $0 does not seem to support <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation" style="color:#fff">$1</a>';

    var element = document.createElement("div");
    element.id = "webglmessage";
    element.style.fontFamily = "monospace";
    element.style.fontSize = "13px";
    element.style.fontWeight = "normal";
    element.style.textAlign = "center";
    element.style.background = "#fff";
    element.style.color = "#222";
    element.style.padding = "1.5em";
    element.style.width = "400px";
    element.style.margin = "5em auto 0";

    if (contexts[version]) {
      message = message.replace("$0", "graphics card");
    } else {
      message = message.replace("$0", "browser");
    }
    message = message.replace("$1", names[version]);
    element.innerHTML = message;
    return element;
  }
};

// stats.js - http://github.com/mrdoob/stats.js
var Stats = function() {
  function h(a) {
    c.appendChild(a.dom);
    return a;
  }
  function k(a) {
    for (var d = 0; d < c.children.length; d++)
      c.children[d].style.display = d === a ? "none" : "none";
    l = a;
  }
  var l = 0,
    c = document.createElement("div");
  c.style.cssText =
    "position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000";
  c.addEventListener(
    "click",
    function(a) {
      a.preventDefault();
      k(++l % c.children.length);
    },
    !1
  );
  var g = (performance || Date).now(),
    e = g,
    a = 0,
    r = h(new Stats.Panel("FPS", "#0ff", "#002")),
    f = h(new Stats.Panel("MS", "#0f0", "#020"));
  if (self.performance && self.performance.memory)
    var t = h(new Stats.Panel("MB", "#f08", "#201"));
  k(0);
  return {
    REVISION: 16,
    dom: c,
    addPanel: h,
    showPanel: k,
    begin: function() {
      g = (performance || Date).now();
    },
    end: function() {
      a++;
      var c = (performance || Date).now();
      f.update(c - g, 200);
      if (
        c > e + 1e3 &&
        (r.update(1e3 * a / (c - e), 100), (e = c), (a = 0), t)
      ) {
        var d = performance.memory;
        t.update(d.usedJSHeapSize / 1048576, d.jsHeapSizeLimit / 1048576);
      }
      return c;
    },
    update: function() {
      g = this.end();
    },
    domElement: c,
    setMode: k
  };
};
Stats.Panel = function(h, k, l) {
  var c = Infinity,
    g = 0,
    e = Math.round,
    a = e(window.devicePixelRatio || 1),
    r = 80 * a,
    f = 48 * a,
    t = 3 * a,
    u = 2 * a,
    d = 3 * a,
    m = 15 * a,
    n = 74 * a,
    p = 30 * a,
    q = document.createElement("canvas");
  q.width = r;
  q.height = f;
  q.style.cssText = "width:80px;height:48px";
  var b = q.getContext("2d");
  b.font = "bold " + 9 * a + "px Helvetica,Arial,sans-serif";
  b.textBaseline = "top";
  b.fillStyle = l;
  b.fillRect(0, 0, r, f);
  b.fillStyle = k;
  b.fillText(h, t, u);
  b.fillRect(d, m, n, p);
  b.fillStyle = l;
  b.globalAlpha = 0.9;
  b.fillRect(d, m, n, p);
  return {
    dom: q,
    update: function(f, v) {
      c = Math.min(c, f);
      g = Math.max(g, f);
      b.fillStyle = l;
      b.globalAlpha = 1;
      b.fillRect(0, 0, r, m);
      b.fillStyle = k;
      b.fillText(e(f) + " " + h + " (" + e(c) + "-" + e(g) + ")", t, u);
      b.drawImage(q, d + a, m, n - a, p, d, m, n - a, p);
      b.fillRect(d + n - a, m, a, p);
      b.fillStyle = l;
      b.globalAlpha = 0.9;
      b.fillRect(d + n - a, m, a, e((1 - f / v) * p));
    }
  };
};
"object" === typeof module && (module.exports = Stats);

// start javascript main code block

if (WEBGL.isWebGLAvailable() === false) {
  document.body.appendChild(WEBGL.getWebGLErrorMessage());
}

var SEPARATION = 80,
  AMOUNTX = 200,
  AMOUNTY = 200;

var container, stats;
var camera, scene, renderer;

var particles,
  count = 0;

var mouseX = 0,
  mouseY = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

init();
animate();

function init() {

  containerMy = document.getElementById( 'box' );
  container   = document.createElement("div");

  containerMy.appendChild(container);

  camera = new THREE.PerspectiveCamera(
    120,
    window.innerWidth / window.innerHeight,
    1,
    10000
  );
  camera.position.z = 2000;

  scene = new THREE.Scene();

  //

  var numParticles = AMOUNTX * AMOUNTY;

  var positions = new Float32Array(numParticles * 3);
  var scales = new Float32Array(numParticles);

  var i = 0,
    j = 0;

  for (var ix = 0; ix < AMOUNTX; ix++) {
    for (var iy = 0; iy < AMOUNTY; iy++) {
      positions[i] = ix * SEPARATION - AMOUNTX * SEPARATION / 2; // x
      positions[i + 1] = 0; // y
      positions[i + 2] = iy * SEPARATION - AMOUNTY * SEPARATION / 2; // z

      scales[j] = 1;

      i += 3;
      j++;
    }
  }

  var geometry = new THREE.BufferGeometry();
  geometry.addAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.addAttribute("scale", new THREE.BufferAttribute(scales, 1));

  var material = new THREE.ShaderMaterial({
    uniforms: {
      color: { value: new THREE.Color(0x999999) }
    },
    vertexShader: document.getElementById("vertexshader").textContent,
    fragmentShader: document.getElementById("fragmentshader").textContent
  });

  //

  particles = new THREE.Points(geometry, material);
  scene.add(particles);

  //

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  stats = new Stats();
  container.appendChild(stats.dom);

  document.addEventListener("mousemove", onDocumentMouseMove, false);
  document.addEventListener("touchstart", onDocumentTouchStart, false);
  document.addEventListener("touchmove", onDocumentTouchMove, false);

  //

  window.addEventListener("resize", onWindowResize, false);
}

function onWindowResize() {
  windowHalfX = window.innerWidth / 2;
  windowHalfY = window.innerHeight / 2;

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

//

function onDocumentMouseMove(event) {
  mouseX = event.clientX - windowHalfX;
  mouseY = event.clientY - windowHalfY;
}

function onDocumentTouchStart(event) {
  if (event.touches.length === 1) {
    event.preventDefault();

    mouseX = event.touches[0].pageX - windowHalfX;
    mouseY = event.touches[0].pageY - windowHalfY;
  }
}

function onDocumentTouchMove(event) {
  if (event.touches.length === 1) {
    event.preventDefault();

    mouseX = event.touches[0].pageX - windowHalfX;
    mouseY = event.touches[0].pageY - windowHalfY;
  }
}

//

function animate() {
  requestAnimationFrame(animate);

  render();
  stats.update();
}

function render() {
  renderer.setClearColor( 0xffffff, 1);
  camera.position.x += (mouseX - camera.position.x) * 0.05;
  camera.position.y += (-mouseY - camera.position.y) * 0.05;
  camera.lookAt(scene.position);

  var positions = particles.geometry.attributes.position.array;
  var scales = particles.geometry.attributes.scale.array;

  var i = 0,
    j = 0;

  for (var ix = 0; ix < AMOUNTX; ix++) {
    for (var iy = 0; iy < AMOUNTY; iy++) {
      
      let p = Math.sin((ix + count) * 0.3) * 30 + 
        Math.sin((iy + count) * 0.5) * 30;
      
      positions[i + 1] = p;
      
      // console.write(i + 1, p);
        
      scales[j] =
        (Math.sin((ix + count) * 0.3) + 1) * 2 +
        (Math.sin((iy + count) * 0.5) + 1) * 2;

      i += 3;
      j++;
    }
  }

  particles.geometry.attributes.position.needsUpdate = true;
  particles.geometry.attributes.scale.needsUpdate = true;

  renderer.render(scene, camera);

  count += 0.1;
}

});