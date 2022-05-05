import { detectCollision } from "../helpers/collisionDetections";

export default class Ball {
  constructor(game) {
    this.game = game;
    this.gameHeight = game.gameHeight;
    this.gameWidth = game.gameWidth;
    this.size = 8;
    this.reset();
  }

  draw(ctx) {
    let circle = new Path2D();
    circle.arc(this.position.x, this.position.y, this.size, 0, 2 * Math.PI);
    ctx.fillStyle = "red";
    ctx.fill(circle);
  }

  update(deltaTime) {
    this.position.x += this.speed.x;
    this.position.y += this.speed.y;

    //wall top / bottom
    if (this.position.y - this.size < 0) {
      this.speed.y = -this.speed.y;
    }
    if (this.position.y + this.size > this.gameHeight) {
      this.game.lives--;
      this.reset();
    }

    // wall left / right
    if (
      this.position.x - this.size < 0 ||
      this.position.x + this.size > this.gameWidth
    ) {
      this.speed.x = -this.speed.x;
    }

    // paddle
    if (detectCollision(this, this.game.paddle)) {
      this.speed.y = -this.speed.y;
      this.position.y = this.game.paddle.position.y - this.size;
    }
  }

  reset() {
    this.position = {
      x: 10,
      y: 400
    };
    this.speed = {
      x: 4,
      y: -2
    };
  }
}
