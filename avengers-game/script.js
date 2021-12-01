const thanos = document.querySelector('.thanos');
const background = document.querySelector('.background');
const button = document.querySelector('.try-again');

let isJumping = false;
let isGameOver = false;
let position = 0;

function handleKeyUp(event) {
  if (event.keyCode === 32) {
    if (!isJumping) {
      jump();
    }
  }
}

function jump() {
  isJumping = true;

  let upInterval = setInterval(() => {
    if (position >= 150) {
      // Descendo
      clearInterval(upInterval);

      let downInterval = setInterval(() => {
        if (position <= 0) {
          clearInterval(downInterval);
          isJumping = false;
        } else {
          position -= 20;
          thanos.style.bottom = position + 'px';
        }
      }, 20);
    } else {
      // Subindo
      position += 20;
      thanos.style.bottom = position + 'px';
    }
  }, 20);
}

function createCaptain() {
  const captain = document.createElement('div');
  let captainPosition = 1200;
  let randomTime = Math.random() * 6000;

  if (isGameOver) return;

  captain.classList.add('captain');
  background.appendChild(captain);
  captain.style.left = captainPosition + 'px';

  let leftTimer = setInterval(() => {
    if (captainPosition < -60) {
      // Saiu da tela
      clearInterval(leftTimer);
      background.removeChild(captain);
    } else if (captainPosition > 0 && captainPosition < 60 && position < 60) {
      // Game over
      clearInterval(leftTimer);
      isGameOver = true;
      document.body.innerHTML = `
        <h1 class="game-over">Fim de jogo</h1>
        <img class="game-over-img" src="thanos-endgame.gif" />
        <button aria-label="tentar-novamente" class="try-again" onClick="refresh(this)">Tentar Novamente</button>
      `;
        
    } else {
      captainPosition -= 10;
      captain.style.left = captainPosition + 'px';
    }
  }, 20);

  setTimeout(createCaptain, randomTime);
}

function refresh(){
  window.location.reload('Refresh')
}

createCaptain();

document.addEventListener('keyup', handleKeyUp);