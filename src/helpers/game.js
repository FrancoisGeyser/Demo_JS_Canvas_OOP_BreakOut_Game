import Paddle from "../elements/paddle";
import Ball from "../elements/ball";
import InputHandler from "../helpers/inputHandler";
import { levels, buildLevel } from "../helpers/levels";
import Display from "../elements/display";

const GAME_STATE = {
  MENU: 0,
  RUNNING: 1,
  PAUSED: 2,
  GAMEOVER: 3,
  NEWLEVEL: 4,
  WON: 5
};

export default class Game {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.level = 0;
    this.totalLevels = levels.length;
    this.lives = 3;

    this.gameState = GAME_STATE.MENU;

    this.paddle = new Paddle(this);
    this.ball = new Ball(this);
    this.display = new Display(this);

    this.gameObjects = [];
    this.bricks = [];

    new InputHandler(this);
  }

  start() {
    if (
      this.gameState !== GAME_STATE.MENU &&
      this.gameState !== GAME_STATE.NEWLEVEL &&
      this.gameState !== GAME_STATE.WON
    )
      return;

    this.bricks = buildLevel(this, levels[this.level]);
    this.ball.reset();
    this.gameObjects = [this.paddle, this.ball, this.display];
    this.gameState = GAME_STATE.RUNNING;
  }

  draw(ctx) {
    [...this.gameObjects, ...this.bricks].forEach((object) => object.draw(ctx));

    if (this.gameState === GAME_STATE.PAUSED) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
      ctx.fill();

      ctx.font = "30px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText("Game Paused", this.gameWidth / 2, this.gameHeight / 2);
    }

    if (this.gameState === GAME_STATE.MENU) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgba(0, 0, 0, 1)";
      ctx.fill();

      ctx.font = "30px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText(
        "Press SPACE to start",
        this.gameWidth / 2,
        this.gameHeight / 2
      );
    }

    if (this.gameState === GAME_STATE.GAMEOVER) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgba(0, 0, 0, 1)";
      ctx.fill();

      ctx.font = "30px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText("GAME OVER", this.gameWidth / 2, this.gameHeight / 2);
    }

    if (this.gameState === GAME_STATE.WON) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgba(0, 0, 0, 1)";
      ctx.fill();

      ctx.font = "30px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText("You Won!", this.gameWidth / 2, this.gameHeight / 2);
    }
  }

  update(deltaTime) {
    if (this.lives === 0) {
      this.gameState = GAME_STATE.GAMEOVER;
    }

    if (
      this.gameState === GAME_STATE.PAUSED ||
      this.gameState === GAME_STATE.MENU ||
      this.gameState === GAME_STATE.GAMEOVER ||
      this.gameState === GAME_STATE.WON
    )
      return;

    if (this.bricks.length === 0) {
      if (this.level < levels.length - 1) {
        this.level++;
        this.gameState = GAME_STATE.NEWLEVEL;
        this.start();
      } else {
        this.gameState = GAME_STATE.WON;
      }
    }

    [...this.gameObjects, ...this.bricks].forEach((object) =>
      object.update(deltaTime)
    );
    this.bricks = this.bricks.filter(
      (object) => object.markForDeletion !== true
    );
  }

  togglePause() {
    if (this.gameState === GAME_STATE.MENU) return;
    if (this.gameState === GAME_STATE.PAUSED) {
      this.gameState = GAME_STATE.RUNNING;
    } else {
      this.gameState = GAME_STATE.PAUSED;
    }
  }

  toggleStart() {
    if (this.gameState === GAME_STATE.MENU) {
      this.gameState = GAME_STATE.RUNNING;
    }
  }
}
