/* ================= GSAP ================= */

gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.config({
  ignoreMobileResize: true
});

gsap.utils.toArray(".post").forEach(post => {
  gsap.fromTo(
    post,
    {
      opacity: 0,
      y: 120,
      rotateX: 15
    },
    {
      opacity: 1,
      y: 0,
      rotateX: 0,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: post,
        start: "top 80%",
        end: "top 40%",
        toggleActions: "play reverse play reverse"
      }
    }
  );
});

/* ================= PARTICLES ================= */

const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

const particles = Array.from({ length: 140 }, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  r: Math.random() * 2 + 1,
  dx: Math.random() * 0.4,
  dy: Math.random() * 0.4
}));

function particleAnimate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(0,200,255,0.7)";

  particles.forEach(p => {
    p.x += p.dx;
    p.y += p.dy;

    if (p.x > canvas.width) p.x = 0;
    if (p.y > canvas.height) p.y = 0;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
  });

  requestAnimationFrame(particleAnimate);
}
particleAnimate();

/* ================= THREE.JS ================= */

const threeCanvas = document.getElementById("three-bg");

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  70,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  canvas: threeCanvas,
  alpha: true,
  antialias: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

const geometry = new THREE.TorusKnotGeometry(2.5, 0.6, 140, 18);
const material = new THREE.MeshStandardMaterial({
  color: 0x00c8ff,
  wireframe: true
});

const knot = new THREE.Mesh(geometry, material);
scene.add(knot);

const light = new THREE.PointLight(0xffffff, 1.2);
light.position.set(6, 6, 6);
scene.add(light);

camera.position.z = 7;

function threeAnimate() {
  requestAnimationFrame(threeAnimate);
  knot.rotation.x += 0.0025;
  knot.rotation.y += 0.004;
  renderer.render(scene, camera);
}
threeAnimate();

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
