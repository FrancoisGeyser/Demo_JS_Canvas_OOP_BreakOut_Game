export default class InputHandler {
  constructor(game) {
    this.game = game;

    document.addEventListener("keydown", (event) => {
      switch (event.keyCode) {
        case 65:
          this.game.paddle.moveLeft();
          break;
        case 68:
          this.game.paddle.moveRight();
          break;
        case 32:
          this.game.start();
          break;
        case 27:
          this.game.togglePause();
          break;
        default:
          break;
      }
    });

    document.addEventListener("keyup", (event) => {
      switch (event.keyCode) {
        case 65:
          if (this.game.paddle.speed < 0) this.game.paddle.stop();
          break;
        case 68:
          if (this.game.paddle.speed > 0) this.game.paddle.stop();
          break;
        default:
          break;
      }
    });
  }
}
