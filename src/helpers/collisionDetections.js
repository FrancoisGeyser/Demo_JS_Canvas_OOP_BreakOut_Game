export function detectCollision(ball, gameObject) {
  if (!gameObject) return;
  let bottomOfBall = ball.position.y + ball.size;
  let topOfBall = ball.position.y - ball.size;
  let leftOfBall = ball.position.x;
  let rightOfBall = ball.position.x + ball.size;

  let topOfObject = gameObject.position.y;
  let bottomOfObject = gameObject.position.y + gameObject.height;
  let leftOfObject = gameObject.position.x;
  let rightOfObject = gameObject.position.x + gameObject.width;

  if (
    bottomOfBall >= topOfObject &&
    topOfBall <= bottomOfObject &&
    leftOfBall >= leftOfObject &&
    rightOfBall <= rightOfObject
  ) {
    return true;
  } else {
    return false;
  }
}
