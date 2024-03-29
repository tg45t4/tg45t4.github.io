const score = document.querySelector('.score'),
    start = document.querySelector('.start'),
    start1 = document.querySelector('.start1'),
    start2 = document.querySelector('.start2'),
    gameArea = document.querySelector('.gameArea'),
    car = document.createElement('div');

car.classList.add('car');

start.addEventListener('click', () => { startGame(3,3); });
start1.addEventListener('click', () => { startGame(2,4); });
start2.addEventListener('click', () => { startGame(2,7); });

document.addEventListener('keydown', startRun);
document.addEventListener('keyup', stopRun);

const keys = {
    ArrowUp:false,
    ArrowDown:false,
    ArrowRight:false,
    ArrowLeft:false
};

const setting = {
    start:false,
    score:0,
    speed:1,
    traffic:3

};
function getQuantityElements(heightElement){ 
   return document.documentElement.clientHeight / heightElement + 1;
}

function startGame(tr,sp){
    setting.traffic = tr;
    setting.speed = sp;

    

    start.classList.add('hide');
    start1.classList.add('hide');
    start2.classList.add('hide');
    playMusic('start');
    gameArea.innerHTML = '';
    car.style.left = '125px';
    car.style.top = 'auto';
    car.style.right= '10px';
    for(let i = 0; i < getQuantityElements(100); i++){
        const line = document.createElement('div');
        line.classList.add('line');
        line.style.top = (i*70) + 'px';
        line.y = i * 100;
        gameArea.appendChild(line);
    }
    for(let i = 0; i< getQuantityElements(100* setting.traffic);i++){
        const enemy = document.createElement('div');
        enemy.classList.add('enemy');
        enemy.y =  -100*setting.traffic * (i+1);
        enemy.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50))+ 'px';
        enemy.style.top = enemy.y +'px';
        enemy.style.background = 'transparent url("./image/enemy'+Math.floor(Math.random() * 3)+'.png") center / cover no-repeat';
        gameArea.appendChild(enemy);
    }

    setting.score = 0;
    setting.start = true;
    gameArea.appendChild(car);
    setting.x = car.offsetLeft;
    setting.y = car.offsetTop;
    requestAnimationFrame(playGame);

}
function playGame(){
    
    if(setting.start){
        setting.score += setting.speed;
        score.textContent = 'Score: '+ setting.score;
        moveRoad();
        moveEnemy();
    
        if(keys.ArrowLeft && setting.x>0){         
            setting.x-=setting.speed;
        }
        if(keys.ArrowRight && setting.x<(gameArea.offsetWidth - car.offsetWidth)){
            setting.x+=setting.speed;
        }
        if(keys.ArrowUp && setting.y>0){
            setting.y-=setting.speed;
        }
        if(keys.ArrowDown && setting.y<(gameArea.offsetHeight - car.offsetHeight)){
            setting.y+=setting.speed;
        }

        car.style.left = setting.x + 'px';
        car.style.top = setting.y + 'px';
        requestAnimationFrame(playGame);
        
        
    }
}

function startRun(event){
    event.preventDefault();
    
    if(event.key == 'ArrowLeft' || event.key =='ArrowRight' || event.key =='ArrowUp' || event.key =='ArrowDown'){
        console.log(event.key);
    keys[event.key] = true;  
    }
}

function stopRun(){
    event.preventDefault();
    keys[event.key] = false;
}

function moveRoad(){
    let lines = document.querySelectorAll('.line');
    lines.forEach(function(line){
        line.y  +=setting.speed;
        line.style.top = line.y + 'px';
        if(line.y >= document.documentElement.clientHeight ){
            line.y = -100;
        }
    });
}

function moveEnemy(){
    let enemy = document.querySelectorAll('.enemy');
    enemy.forEach(function(item){
        let carRect = car.getBoundingClientRect();
        let enemyRect = item.getBoundingClientRect();

        if (carRect.top <= enemyRect.bottom && 
            carRect.right >= enemyRect.left &&
            carRect.left <= enemyRect.right &&
            carRect.bottom >= enemyRect.top){           
        setting.start = false;        
        start.classList.remove('hide');
        start1.classList.remove('hide');
        start2.classList.remove('hide');
        start.style.top = score.offsetHeight;
        start1.style.top = score.offsetHeight;
        start2.style.top = score.offsetHeight;
        stopMusic();
        playMusic('crash');
        }

        item.y += setting.speed / 2;
        item.style.top = item.y + 'px';
        if(item.y>=document.documentElement.clientHeight){
            item.y =-100*setting.traffic;
            item.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50))+ 'px';
        }
    });

   
}


 let audio = new Audio()
function playMusic(msc){
         
    if(msc=='start'){      
        audio.src = 'mp3.mp3';  
        audio.play();       

    }
    
    else if(msc=='crash'){   
        audio.src = 'crash.mp3';
        audio.play();
       
    }

}
function stopMusic(){
    audio.pause(); 
}