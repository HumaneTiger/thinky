var game = {
  day: 1,
  detectiveName: 'Starling'
}

var clues = {
  'bakery': 'The Bakery is across the street of the Diner',
  'nico-galanis': 'Nico Galanis was the Bakery owner',

  'bakery1': 'The Bakery is across the street of the Diner',
  'nico-galanis1': 'Nico Galanis was the Bakery owner',
  'bakery11': 'The Bakery is across the street of the Diner',
  'nico-galanis11': 'Nico Galanis was the Bakery owner',
  'bakery2': 'The Bakery is across the street of the Diner',
  'nico-galanis2': 'Nico Galanis was the Bakery owner',
  'bakery3': 'The Bakery is across the street of the Diner',
  'nico-galanis3': 'Nico Galanis was the Bakery owner',
  'bakery4': 'The Bakery is across the street of the Diner',
  'nico-galanis4': 'Nico Galanis was the Bakery owner',
  'bakery5': 'The Bakery is across the street of the Diner',
  'nico-galanis5': 'Nico Galanis was the Bakery owner',
  'bakery6': 'The Bakery is across the street of the Diner',
  'nico-galanis6': 'Nico Galanis was the Bakery owner',
  'bakery7': 'The Bakery is across the street of the Diner',
  'nico-galanis7': 'Nico Galanis was the Bakery owner',
  'bakery8': 'The Bakery is across the street of the Diner',
  'nico-galanis8': 'Nico Galanis was the Bakery owner',
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
