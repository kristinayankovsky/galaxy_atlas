export function createStars(canvas, stars) {
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  stars.forEach(star => {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
    ctx.fillStyle = "#fff";
    ctx.fill();
  });
}
export function animateStars(canvas, stars) {
  const ctx = canvas.getContext("2d");

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    stars.forEach(star => {
      
      const brightness = 0.5 + Math.sin(Date.now() / 500 + star.twinkle * 10) / 2;
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${brightness})`;
      ctx.fill();
    });

    requestAnimationFrame(draw);
  }

  draw();
}