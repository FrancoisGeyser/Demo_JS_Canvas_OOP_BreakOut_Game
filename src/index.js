import "./styles.css";
import Game from "./helpers/game";

const canvas = document.getElementById("Canvas");
const ctx = canvas.getContext("2d");

const GAME_HEIGHT = 600;
const GAME_WIDTH = 900;

const game = new Game(GAME_WIDTH, GAME_HEIGHT);

let timePast = 0;

function gameLoop(timeStamp) {
  let deltaTime = timeStamp - timePast;
  ctx.clearRect(0, 0, 900, 600);
  game.update(deltaTime);
  game.draw(ctx);
  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
