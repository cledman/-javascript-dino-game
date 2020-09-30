const dino = document.querySelector(".dino");
const background = document.querySelector(".background");
const gameScreen = window.innerWidth;
const score = document.querySelector(".points");

let gameSpeed = 40;
let isJumping = false;
let position = 0;
let totalPoints = 0;
const handleKeyUp = (event) => {
  if (event.keyCode == 32) {
    if (!isJumping) {
      jump();
    }
  }
};

const jump = () => {
  isJumping = true;
  let upInterval = setInterval(() => {
    if (position >= 150) {
      clearInterval(upInterval);
      let downInterval = setInterval(() => {
        if (position <= 0) {
          clearInterval(downInterval);
          isJumping = false;
        } else {
          position -= 10;
          if (position <= 0) {
            position = 0;
            isJumping = false;
          }
          dino.style.bottom = position + "px";
        }
      }, 30);
    } else {
      position += 20;
      dino.style.bottom = position + "px";
    }
  }, 10);
};

const createCactus = () => {
  const cactus = document.createElement("div");
  let cactusPosition = gameScreen;
  let randomTime = Math.random() * 6000;
  cactus.classList.add("cactus");
  cactus.style.left = 1000 + "px";
  background.appendChild(cactus);
  let leftInterval = setInterval(() => {
    if (cactusPosition < -60) {
      clearInterval(leftInterval);
      background.removeChild(cactus);
      gameSpeed = gameSpeed - 0.1;
      totalPoints += 100;
      score.innerHTML = totalPoints;
    } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) {
      //gameover
      clearInterval(leftInterval);
      document.body.innerHTML =
        '<h1 class="game-over">Fim de Jogo</h1><a href="index.html">Reiniciar</a>';
    } else {
      cactusPosition -= 10;
      cactus.style.left = cactusPosition + "px";
    }
  }, gameSpeed);

  setTimeout(createCactus, randomTime);
};

createCactus();

document.addEventListener("keyup", handleKeyUp);
