var game = {
  score: 0,
  highScore: 0,
  mode: 'normal',
  special: false,
  scrollVelocity: -2,
  brightness: 100,
  scoreValue: 1,
  gravity: 0.1,
  velocityChange: -2.5,
  orbSpawn: 25,
  board: {
    width: 1440,
    height: 760
  },
  showMarker: false,
  wallEdges: [],
  firstKey: true,
  gameOver: false,
  gamePaused: true,
  difficulty: 'normal',
  particleSpeed: 0,
}

export default {
  
  init: function() {
    this.preloadImages();
  },

  getGameProp: function(prop) {
    return game[prop];
  },

  setGameProp: function(prop, value) {
    game[prop] = value;
  },

  resetGameProps: function() {
    game.score = 0;
    game.brightness = 100;
    game.wallEdges = [];
    game.gameOver = false;
    game.gamePaused = true;
    game.particleSpeed = 0;
  },

  setDifficulty: function(difficulty) {
    game.difficulty = difficulty;
    if (difficulty === 'normal') {
      game.gravity = 0.1;
      game.velocityChange = -2.5;
      game.orbSpawn = 25;
      game.scoreValue = 1;
    } else if (difficulty === 'easy') {
      game.gravity = 0.05;
      game.velocityChange = -1.5;
      game.orbSpawn = 15;
      game.scoreValue = 0.5;
    } else if (difficulty === 'hard') {
      game.gravity = 0.15;
      game.velocityChange = -2.8;
      game.orbSpawn = 55;
      game.scoreValue = 1.5;
    }
  },

  preloadImages: function() {
    let preloadList = [
      '/character/frame-all.png',
      '/ui/scare-face.png',
      '/ui/logo.png',
      '/environment/creeper-plants.png',
      '/environment/front-plants.png',
      '/environment/glow-plants.png',
      '/environment/vignette-back.png',
      '/environment/vignette-front.png',
      '/items/scary-grave.png'
    ];
    let images = [];
    for (const img in preloadList) {
      images[img] = new Image();
      images[img].src = '../img' + preloadList[img];
    };
  }
}
