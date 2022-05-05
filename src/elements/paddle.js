export default class Paddle {
  constructor(game) {
    this.gameHeight = game.gameHeight;
    this.gameWidth = game.gameWidth;
    this.width = 150;
    this.height = 20;
    this.padding = 5;

    this.speed = 0;
    this.maxSpeed = 7;

    this.position = {
      x: this.gameWidth / 2 - this.width / 2,
      y: this.gameHeight - this.height - this.padding
    };
  }

  draw(ctx) {
    ctx.fillStyle = "green";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  update(deltaTime) {
    this.position.x += this.speed;

    if (this.position.x < 0) this.position.x = 0;
    if (this.position.x + this.width > this.gameWidth)
      this.position.x = this.gameWidth - this.width;
  }

  stop() {
    this.speed = 0;
  }
  moveLeft() {
    this.speed = -this.maxSpeed;
  }
  moveRight() {
    this.speed = this.maxSpeed;
  }
}
