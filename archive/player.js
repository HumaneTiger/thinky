import Props from '../js/props.js'
import Audio from '../js/audio.js'
import Ui from '../js/ui.js'

let velocityY = 0;

let startScrollReference;

let player = {
  x : 666,
  y : 300,
  width : 110,
  height : 100
}

const playerElement = document.getElementById('player');
const playerIndicator = document.getElementById('player-indicator');

const topIndicator = document.getElementById('top-indicator');
const bottomIndicator = document.getElementById('bottom-indicator');
const orbIndicator = document.getElementById('orb-indicator');

const frontVignette = document.getElementById('front-vignette');
const backVignette = document.getElementById('back-vignette');
const finalBlocker = document.getElementById('final-blocker');

const walls = document.getElementById('walls');
const scoreCollection = document.body.querySelectorAll('.score');

let orbCollection, treasureCollection, graveCollection;

export default {
  
  init: function() {
    document.body.addEventListener("keydown", this.handleKeydown.bind(this));
    document.body.addEventListener("pointerdown", this.handlePointerdown.bind(this));
    requestAnimationFrame(this.update.bind(this));
  },

  reset: function() {
    velocityY = 0;
    player.x = 666;
    player.y = 300;
    startScrollReference = walls.getBoundingClientRect();
    orbCollection = walls.querySelectorAll('.orb');
    treasureCollection = walls.querySelectorAll('.treasure');
    graveCollection = walls.querySelectorAll('.scary-grave');
    playerElement.style.top = player.y + 'px';
    this.updateBrightness();
  },

  handleKeydown: function(ev) {
    if (!Props.getGameProp('gameOver') && !Props.getGameProp('gamePaused')) {
      if (ev.key && (ev.key.toLowerCase() === 'w' || ev.key === 'ArrowUp' || ev.key === ' ')) {
        ev.preventDefault();
        Audio.sfx('up-2', 0, 0.05);
        velocityY = (Props.getGameProp('velocityChange') * 2);
      }
    }
  },

  handlePointerdown: function() {
    if (!Props.getGameProp('gameOver') && !Props.getGameProp('gamePaused')) {
      document.body.dispatchEvent(new KeyboardEvent('keydown', {'key': 'w'}));
    }
  },

  checkForCollision: function() {
    /*
      1. check if walls have moved another 140 pixels
          1a. raise collision index
      2. check collision for current index
    */
    const scrollReference = walls.getBoundingClientRect();
    const collisionIndex = Math.floor(Math.abs(scrollReference.left - startScrollReference.left - 115) / 140) + 4;

    if (Props.getGameProp('wallEdges')[collisionIndex]) {
      const collisionTop = 44 + Props.getGameProp('wallEdges')[collisionIndex].top * 60;
      const collisionBottom = 714 - Props.getGameProp('wallEdges')[collisionIndex].bottom * 60;
  
      if (Props.getGameProp('showMarker')) {
        playerIndicator.classList.remove('is--hidden');
        playerIndicator.innerHTML = collisionIndex;
  
        playerIndicator.style.top = player.y + 28 + 'px';
        playerIndicator.style.left = player.x + 40 + 'px';
        playerIndicator.style.width = (player.width / 3.1) + 'px';
        playerIndicator.style.height = (player.height / 1.7) + 'px';
    
        topIndicator.classList.remove('is--hidden');
        bottomIndicator.classList.remove('is--hidden');
        topIndicator.style.left = player.x + 'px';
        bottomIndicator.style.left = player.x + 'px';
        topIndicator.style.top = collisionTop + 'px';
        bottomIndicator.style.top = collisionBottom + 'px';
      }
  
      if (player.y > Props.getGameProp('board').height) {
        Ui.gameOver();
      }
  
      if ((player.y + 28) < collisionTop || (player.y + 28 + (player.height / 1.7) > collisionBottom) ) {
        Ui.gameOver();
      }
  
      if (collisionIndex === 199) {
        Ui.gameWin();
      }
    }

    for (var i=0; i < orbCollection.length; i +=1 ) {
      if (!orbCollection[i].classList.contains('is--hidden')) {
        const orbPos = orbCollection[i].getBoundingClientRect();
        if (this.calcCollision(player, orbPos)) {
          Audio.sfx('collect', 0, 1);
          orbCollection[i].classList.add('is--hidden');
          Props.setGameProp('brightness', 100);
          finalBlocker.classList.remove('active');
        }  
      }
    }

    for (var i=0; i < treasureCollection.length; i +=1 ) {
      if (!treasureCollection[i].classList.contains('is--hidden') && !treasureCollection[i].classList.contains('collected')) {
        const treasurePos = treasureCollection[i].getBoundingClientRect();
        if (this.calcCollision(player, treasurePos)) {
          Audio.sfx('collect-2');
          treasureCollection[i].classList.add('collected');
          window.setTimeout((treasure) => {
            treasure.classList.add('is--hidden');
            document.getElementById('stars').innerHTML += '<div class="treasure"></div>';
            Props.setGameProp('score', Props.getGameProp('score') + 500);  
          }, 130, treasureCollection[i]);
        }  
      }
    }
    for (var i=0; i < graveCollection.length; i +=1 ) {
      if (!graveCollection[i].classList.contains('touched')) {
        const gravePos = graveCollection[i].getBoundingClientRect();
        if (this.calcCollision(player, gravePos, true)) {
          graveCollection[i].classList.add('touched');
          Props.setGameProp('score', Math.floor(Props.getGameProp('score') / 2));
          Props.setGameProp('brightness', Math.floor(Props.getGameProp('brightness') / 2));
          if (!document.getElementById('scare-face').classList.contains('omg')) {
            document.getElementById('scare-face').classList.add('omg');
            Audio.sfx('jump-scare', 0, 1);
            window.setTimeout(() => {
              document.getElementById('scare-face').classList.add('fade-out');
            }, 200);  
            window.setTimeout(() => {
              document.getElementById('scare-face').classList.remove('omg');
              document.getElementById('scare-face').classList.remove('fade-out');
            }, 500);  
          }
        }  
      }
    }

  },

  calcCollision(player, orb, grave) {

    let a = {
      x: player.x + 40,
      y: player.y + 28,
      width: 20,
      height: 30
    }
    let b = {
      x: orb.left - startScrollReference.left - 12,
      y: orb.top - startScrollReference.top - 10,
      width: 40,
      height: 60
    }
    if (grave) {
      b.x += 95;
      b.y += 50;
      b.width += 40;
      b.height += 60;
    }
    
    if (b.x < a.x - 50) return false;

    if (Props.getGameProp('showMarker') && b.x > 400 && b.x < 1400) {
      orbIndicator.classList.remove('is--hidden');
      orbIndicator.style.left = b.x + 'px';
      orbIndicator.style.top = b.y + 'px';
      orbIndicator.style.width = b.width + 'px';
      orbIndicator.style.height = b.height + 'px';
    }

    return a.x < b.x + b.width &&
           a.x + a.width > b.x &&
           a.y < b.y + b.height &&
           a.y + a.height > b.y;
  },

  updateBrightness: function() {

    const brightness = Props.getGameProp('brightness');
    const iScaleX = 1.3;
    const iScaleY = 1.2;

    const glow = playerElement.querySelectorAll('.glow');
    if (glow[0]) glow[0].style.opacity = brightness / 100;

    let scaleX = Math.round((iScaleX - (1 - brightness / 100)) * 100) / 100;
    let scaleY = Math.round((iScaleY - (1 - brightness / 100)) * 100) / 100;

    if (scaleY > 0.4) {
      frontVignette.style.transform = 'scale('+scaleX+', '+scaleY+')';
      backVignette.style.transform = 'scale('+scaleX+', '+scaleY+')';  
    }

    if (brightness > 0) {
      Props.setGameProp('brightness', brightness - 0.05)
    } else {
      finalBlocker.classList.add('active');
    }

  },

  updateScore: function() {
    Props.setGameProp('score', Props.getGameProp('score') + Props.getGameProp('scoreValue'));
    for (var i=0; i < scoreCollection.length; i += 1) {
      scoreCollection[i].textContent = 'Score: ' + Math.floor(Props.getGameProp('score'));
    }
  },

  update: function() {

    requestAnimationFrame(this.update.bind(this));

    if (Props.getGameProp('gameOver') || Props.getGameProp('gamePaused')) return;

    velocityY += (Props.getGameProp('gravity') * 3);
    player.y = Math.max(player.y + velocityY, 0);

    playerElement.style.top = player.y + 'px';

    this.checkForCollision();
    this.updateBrightness();
    this.updateScore();
    
  }

}
