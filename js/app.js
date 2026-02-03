// js/app.js

import { planets } from "./data.js";
import { updatePlanetInfo, setActivePlanet } from "./ui.js";

// keeps track of selected planet
// -1 means placeholder state
let currentPlanetIndex = -1;



function init() {
  const planetButtons = Array.from(document.querySelectorAll(".planet"));

  if (!planetButtons.length) return;

  // remove active state on load
  planetButtons.forEach(p => p.classList.remove("active"));

  // click handling
  planetButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      selectPlanet(index, planetButtons);
    });
  });

  // keyboard navigation
  document.addEventListener("keydown", e => {
    if (e.key === "ArrowRight") {
      navigatePlanet(1, planetButtons);
    }

    if (e.key === "ArrowLeft") {
      navigatePlanet(-1, planetButtons);
    }
  });

  // init star background
  initStars();
}

// selects a planet by index
function selectPlanet(index, planetButtons) {
  const planetData = planets[index];
  if (!planetData) return;

  currentPlanetIndex = index;

  updatePlanetInfo(planetData);
  setActivePlanet(planetButtons[index]);
}

// moves between planets with keyboard

function navigatePlanet(direction, planetButtons) {
  if (currentPlanetIndex === -1) return;

  let newIndex = currentPlanetIndex + direction;

  if (newIndex < 0) newIndex = planets.length - 1;
  if (newIndex >= planets.length) newIndex = 0;

  selectPlanet(newIndex, planetButtons);
}




/*stars + shooting stars */

let canvas, ctx;
let stars = [];
let shootingStars = [];

function initStars() {
  canvas = document.getElementById("starfield");
  if (!canvas) return;

  ctx = canvas.getContext("2d");

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  createStars();
  animateStars();
}

function resizeCanvas() {
  const parent = canvas.parentElement;
  canvas.width = parent.clientWidth;
  canvas.height = parent.clientHeight;
}

function createStars() {
  stars = Array.from({ length: 140 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.5 + 0.3,
    speed: Math.random() * 0.15 + 0.05
  }));
}

// create a shooting star
function spawnShootingStar() {
  shootingStars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height * 0.5,
    vx: Math.random() * 6 + 6,
    vy: Math.random() * 4 + 4,
    life: 0
  });
}

function animateStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // draw background stars
  ctx.fillStyle = "white";
  stars.forEach(star => {
    star.y += star.speed;
    if (star.y > canvas.height) star.y = 0;

    ctx.beginPath();
    ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
    ctx.fill();
  });

  // randomly spawn shooting stars
  if (Math.random() < 0.008) {
    spawnShootingStar();
  }

  // draw shooting stars
  shootingStars.forEach((s, index) => {
    ctx.strokeStyle = "rgba(255,255,255,0.8)";
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.moveTo(s.x, s.y);
    ctx.lineTo(s.x - s.vx * 3, s.y - s.vy * 3);
    ctx.stroke();

    s.x += s.vx;
    s.y += s.vy;
    s.life++;

    if (s.life > 25) {
      shootingStars.splice(index, 1);
    }
  });

  requestAnimationFrame(animateStars);
}

document.addEventListener("DOMContentLoaded", init);



