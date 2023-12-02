import Audio from './audio.js'
import Props from './props.js'
import Start from './start.js'

import Desk from './desk.js'
import Persons from './persons.js'
import Places from './places.js'
import EndDay from './end-day.js'
import Assistants from './assistants.js'

const viewport = document.querySelector('#viewport main');
let currentPosition = 1;

let uiActive = false;

export default {
  
  init: function() {

    window.addEventListener('resize', this.resizeViewport);
    document.body.addEventListener('click', this.handleClick.bind(this));

    // document.body.addEventListener("contextmenu", (ev) => { ev.preventDefault(); });

    this.resizeViewport();

  },

  resizeViewport: function() {
    const viewWidth = window.innerWidth,
          viewHeight = window.innerHeight;
    let scaleFactor;

    scaleFactor = viewHeight / 1080;

    viewport.style.transform = 'scale3d('+scaleFactor+','+scaleFactor+','+1+')';
  },

  handleClick: function(ev) {
    var target = ev.target;
    if (target && target.classList.contains('button')) {
      if (target.id === 'button-desk') this.switchToDesk();
      if (target.id === 'button-persons') this.switchToPersons();
      if (target.id === 'button-places') this.switchToPlaces();
      if (target.id === 'button-end-day') this.endDay();
      if (target.id === 'button-lets-go') this.nextDay();
    }
  },

  switchToDesk: function() {
    if (currentPosition !== 1) {
      Audio.sfx('swoosh');
      Persons.hide('right'); // immer rechts raus
      Places.hide('right'); // immer rechts raus
      Assistants.hide();
      Desk.show();
      currentPosition = 1;  
    }
  },

  switchToPersons: function() {
    if (currentPosition !== 2) {
      Audio.sfx('swoosh');
      if (currentPosition > 2) {
        Places.hide('right'); // nach rechts raus
        Persons.hide('left'); // von links rein
      } else {
        Desk.hide('left'); // nach links raus
        Persons.hide('right'); // von rechts rein
      }
      Persons.show();
      Assistants.show();
      currentPosition = 2;
    }
  },

  switchToPlaces: function() {
    if (currentPosition !== 3) {
      Audio.sfx('swoosh');
      Desk.hide('left'); // immer links raus
      Persons.hide('left'); // immer links raus
      Places.show();
      Assistants.show();
      currentPosition = 3;
    }
  },

  endDay: function() {
    Audio.sfx('click');
    EndDay.show();
  },

  nextDay: function() {
    Audio.sfx('click');
    EndDay.nextDay();
  },

  /*
  handleHover: function(ev) {
    var target = ev.target;
    if (target && target.classList.contains('button') && startScreen.classList.contains('active')) {
      Audio.sfx('up-2', 0, 0.1);
    }
  },

  handleClick: function(ev) {
    var target = ev.target;
    if (target && target.classList.contains('button') && startScreen.classList.contains('active')) {
      ev.preventDefault();
      Audio.sfx('up-1', 0, 1);
      if (target.classList.contains('normal')) Props.setDifficulty('normal');
      if (target.classList.contains('easy')) Props.setDifficulty('easy');
      if (target.classList.contains('hard')) Props.setDifficulty('hard');
      if (target.classList.contains('scarygrave')) Props.setGameProp('special', true);
      if (target.classList.contains('switch')) {
        document.getElementById('game-options').classList.add('out');
        document.getElementById('special').classList.remove('out');
      } else if (target.classList.contains('back')) {
        document.getElementById('game-options').classList.remove('out');
        document.getElementById('special').classList.add('out');
      } else {
        document.querySelector('ul.menu').classList.add('is--hidden');
        document.querySelector('div.warning-container').classList.add('is--hidden');
        document.querySelector('.wait-1').classList.remove('is--hidden');
        document.querySelector('.wait-2').classList.remove('is--hidden');
        window.setTimeout(() => {
          this.resetGame();
        }, 500);
        window.setTimeout(() => {
          startScreen.classList.remove('active');
          Audio.playAmbientLoop();
          startScreen.classList.add('is--hidden');
          this.initCountdown();
        }, 2000);  
      }
    }
  },

  initCountdown: function() {
    countdownElement.querySelector('.big').textContent = '3';
    window.setTimeout(() => {
      countdownElement.querySelector('.big').textContent = '2';
    }, 1000);
    window.setTimeout(() => {
      countdownElement.querySelector('.big').textContent = '1';
    }, 2000);
    window.setTimeout(() => {
      countdownElement.querySelector('.big').textContent = 'GO!';
      countdownElement.classList.add('go');
      this.letsGOGOGO();
    }, 3000);
  },

  letsGOGOGO: function() {
    Props.setGameProp('gamePaused', false);
    document.getElementById('front-plants').classList.add('autoscroll-anim');
    document.getElementById('glow-plants').classList.add('autoscroll-anim');
    document.getElementById('creeper-plants').classList.add('autoscroll-anim');
    document.getElementById('background').classList.add('autoscroll-anim');
    document.getElementById('walls').classList.add('walls-anim');
    Props.setGameProp('particleSpeed', 3.6);
  },
  
  gameOver: function() {
    Props.setGameProp('gameOver', true);
    Audio.sfx('game-over');
    playerElement.classList.remove('flap');
    playerElement.classList.add('dead');
    window.setTimeout(() => {
      document.getElementById('play-again').querySelector('.win').classList.add('is--hidden'); // hide win message
      this.playAgain();
    }, 2000);
  },

  gameWin: function() {
    Props.setGameProp('gameOver', true);
    Audio.sfx('win');
    window.setTimeout(() => {
      document.getElementById('play-again').querySelector('.win').classList.remove('is--hidden'); // show win message
      this.playAgain();
    }, 2000);
  },

  playAgain: function() {
    if (Props.getGameProp('score') > Props.getGameProp('highScore')) {
      Props.setGameProp('highScore', Math.floor(Props.getGameProp('score')));
      document.getElementById('new-highscore').classList.remove('is--hidden');
      document.getElementById('highscore').classList.add('is--hidden');
      document.getElementById('highscore').querySelector('span').textContent = Props.getGameProp('highScore');
    } else {
      document.getElementById('highscore').classList.remove('is--hidden');
    }
    Props.setGameProp('particleSpeed', 0);
    document.getElementById('play-again').classList.add('active');
    window.setTimeout(() => {
      uiActive = true;
      this.resetGame();
    }, 200);
  },

  handleKeydown: function() {
    if (uiActive) {
      uiActive = false;
      document.getElementById('play-again').classList.remove('active');
      document.getElementById('new-highscore').classList.add('is--hidden');
      Player.updateScore();
      document.getElementById('stars').innerHTML = '';
      countdownElement.classList.remove('go');
      this.initCountdown();
    }
  },

  resetGame: function() {
    document.getElementById('front-plants').classList.remove('autoscroll-anim');
    document.getElementById('glow-plants').classList.remove('autoscroll-anim');
    document.getElementById('creeper-plants').classList.remove('autoscroll-anim');
    document.getElementById('background').classList.remove('autoscroll-anim');
    document.getElementById('walls').classList.remove('walls-anim');
    document.getElementById('final-blocker').classList.remove('active');
    Props.resetGameProps();
    playerElement.classList.remove('dead');
    playerElement.classList.add('flap');
    Start.init();
    Player.reset();
  }
  */
}
