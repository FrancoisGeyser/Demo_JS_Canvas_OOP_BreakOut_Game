import { detectCollision } from "../helpers/collisionDetections";

export default class Brick {
  constructor(game, position) {
    this.game = game;

    this.width = 90;
    this.height = 25;
    this.position = position;

    this.markForDeletion = false;
  }

  draw(ctx) {
    ctx.fillStyle = "blue";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  update() {
    if (detectCollision(this.game.ball, this)) {
      this.markForDeletion = true;
      this.game.ball.speed.y = -this.game.ball.speed.y;
    }
  }
}
