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
  }

}
