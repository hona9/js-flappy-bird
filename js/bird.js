document.addEventListener('DOMContentLoaded', ()=>{
  let bird = document.querySelector('.bird');
  let backround = document.querySelector('.background');
  let container = document.querySelector('.container');

  let birdPosLeft = 200;
  let birdPosBot = 350;
  let gravity = 2;
  let gap = 450;
  // let gravitySpeed = 1;
  let isGameOver = false;

  function animate(){
    // requestAnimationFrame(animate);
    // gravitySpeed += gravity;
    birdPosBot -= gravity;
    bird.style.left = birdPosLeft + 'px';
    bird.style.bottom = birdPosBot + 'px';
  }
  let ballAnime = setInterval(animate, 20);
  // let ballAnime = requestAnimationFrame(animate);

  let spacebar = document.addEventListener('keydown', function(event){
    if(event.key == ' '){
       jump();
    }
  });
  function jump(){
    if(birdPosBot < 650) birdPosBot += 70;
    bird.style.bottom = birdPosBot + 'px';
    // gravitySpeed = 1;
  }

  function generatePipe(){
    let pipe = document.createElement('div');
    let topPipe = document.createElement('div');
    if(!isGameOver){
      pipe.classList.add('pipe');
      topPipe.classList.add('top-pipe');
    }
    container.appendChild(pipe);
    container.appendChild(topPipe);
    let pipePosLeft = 500;
    let randomHeight = (Math.random()-.5) * 200;
    let pipePosBot = randomHeight;
    pipe.style.left = pipePosLeft + 'px';
    pipe.style.bottom = pipePosBot + 'px';
    topPipe.style.left = pipePosLeft + 'px';
    topPipe.style.bottom = pipePosBot + gap + 'px';

    function animatePipe(){
      pipePosLeft -= 2;
      pipe.style.left = pipePosLeft + 'px';
      topPipe.style.left = pipePosLeft + 'px';

      if(pipePosLeft === -60){
        clearInterval(moveTimer);
        container.removeChild(pipe);
        container.removeChild(topPipe);
      } 
      if(pipePosLeft>200 
        && pipePosLeft<260
        && (birdPosBot < pipePosBot + 200|| birdPosBot >pipePosBot+gap-150)
          ||birdPosBot === -2){
        gameOver();
        clearInterval(moveTimer);
      }
      if(pipePosLeft === 160) score();
    }
    let moveTimer = setInterval(animatePipe, 20);
    if(!isGameOver) setTimeout(generatePipe, 3000);
  }
  generatePipe();
  
  let gameOverLogo = document.querySelector('.game-over');
  function gameOver(){
    clearInterval(ballAnime);
    isGameOver = true;
    document.removeEventListener('keydown', spacebar);
    gameOverLogo.style.display = 'block';
    highScore();
  }

  let scoreCount = 0;
  let scoreDisplay = document.querySelector('.score-count');
  let highScoreDisplay = document.querySelector('.best-count');
  function score(){
    scoreCount++;
    scoreDisplay.innerHTML = `${scoreCount}`;
  }
  let highScoreCount = 0;
  function highScore(){
    if(scoreCount > highScoreCount){
      highScoreCount = scoreCount;
      localStorage.setItem('highScoreCount', highScoreCount);
      highScoreDisplay.innerHTML = `Best: ${highScoreCount}`;
    }
  }
});