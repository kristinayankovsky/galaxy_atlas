// Get canvas
const canvas = document.getElementById("starCanvas");
const ctx = canvas.getContext("2d");

// Resize canvas to full screen
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// Generate random stars
const stars = Array.from({ length: 300 }, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  size: Math.random() * 2 + 1,
  twinkle: Math.random() * Math.PI * 2
}));

// Draw and animate stars
function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  stars.forEach(star => {
    const brightness = 0.5 + Math.sin(Date.now() / 500 + star.twinkle) / 2;
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${brightness})`;
    ctx.fill();
  });

  requestAnimationFrame(drawStars);
}

drawStars();
