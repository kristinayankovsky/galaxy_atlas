// js/app.js

import { planets } from "./data.js";
import { updatePlanetInfo, setActivePlanet } from "./ui.js";

function init() {
  const planetButtons = document.querySelectorAll(".planet");

  document.querySelectorAll(".planet").forEach(p =>
  p.classList.remove("active")
);

  planetButtons.forEach(button => {
    button.addEventListener("click", () => {
      const planetId = button.dataset.planet;
      const planetData = planets.find(p => p.id === planetId);

      if (!planetData) return;

      updatePlanetInfo(planetData);
      setActivePlanet(button);
    });
  });


}

document.addEventListener("DOMContentLoaded", init);

const canvas = document.getElementById("starfield");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
   const parent = canvas.parentElement;
  canvas.width = parent.clientWidth;
  canvas.height = parent.clientHeight;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

const stars = Array.from({ length: 120 }, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  r: Math.random() * 1.5,
  speed: Math.random() * 0.2 + 0.05
}));

function animateStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "white";
  stars.forEach(star => {
    star.y += star.speed;
    if (star.y > canvas.height) star.y = 0;

    ctx.beginPath();
    ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
    ctx.fill();
  });

  requestAnimationFrame(animateStars);
}

animateStars();



