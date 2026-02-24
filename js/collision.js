// Collision Detection Utilities

// Axis-Aligned Bounding Box (AABB) collision detection
function checkCollision(rect1, rect2) {
  return rect1.x < rect2.x + rect2.width &&
         rect1.x + rect1.width > rect2.x &&
         rect1.y < rect2.y + rect2.height &&
         rect1.y + rect1.height > rect2.y;
}

// More precise collision with padding for better gameplay feel
// Reduces the hitbox by padding amount on all sides
function checkCollisionWithPadding(rect1, rect2, padding = 5) {
  const padded1 = {
    x: rect1.x + padding,
    y: rect1.y + padding,
    width: rect1.width - padding * 2,
    height: rect1.height - padding * 2
  };

  return checkCollision(padded1, rect2);
}
