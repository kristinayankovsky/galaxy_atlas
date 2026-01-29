export const stars = Array.from({ length: 200 }, () => ({
  x: Math.random() * window.innerWidth,
  y: Math.random() * window.innerHeight,
  size: Math.random() * 2 + 1, // star radius 1-3
  twinkle: Math.random() // optional for twinkle effect
}));