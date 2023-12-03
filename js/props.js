var game = {
  day: 1,
  detectiveName: 'Starling'
}

var clues = {
  'bakery': 'The Bakery is across the street of the Diner',
  'nico-galanis': 'Nico Galanis was the Bakery owner',
  'secury-cam': 'Cloaked couple walks by the music store Friday at 22:46',
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
    game.day = 1;
  },

  getAllClues: function() {
    return clues;
  }

}
