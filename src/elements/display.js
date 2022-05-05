export default class Display {
  constructor(game) {
    this.game = game;
  }

  draw(ctx) {
    ctx.font = "20px Arial";
    ctx.fillStyle = "green";
    ctx.textAlign = "center";
    ctx.fillText(
      `lives: ${this.game.lives} | level: ${this.game.level + 1} / ${
        this.game.totalLevels
      }`,
      90,
      20
    );
  }

  update() {}
}
