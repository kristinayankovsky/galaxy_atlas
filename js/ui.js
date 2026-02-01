// js/ui.js

export function updatePlanetInfo(planet) {
  const title = document.querySelector(".planet-info h2");
  const img = document.querySelector(".planet-info img");
  const stats = document.querySelector(".planet-stats");
  const fact = document.querySelector(".planet-fact");

  title.textContent = planet.name;
  img.src = planet.image;
  img.alt = planet.name;

  stats.innerHTML = `
    <li><strong>Radius:</strong> ${planet.radius}</li>
    <li><strong>Distance:</strong> ${planet.distance}</li>
    <li><strong>Year Length:</strong> ${planet.year}</li>
  `;

  fact.textContent = planet.fact;
}

export function setActivePlanet(element) {
  document.querySelectorAll(".planet").forEach(p =>
    p.classList.remove("active")
  );
  element.classList.add("active");
}

