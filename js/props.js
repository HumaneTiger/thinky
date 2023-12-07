var game = {
  day: 1,
  detectiveName: 'Starling'
}

var clues = {
  'diner-owner': 'A restaurant owner from Lovich Street found Galani',
  'bakery-across-diner': 'The Bakery is across the street of the Diner',
  'bakery-owner': 'Nico Galanis was the Bakery owner',
  'secury-cam': 'Cloaked couple walks by the music store Friday at 22:46',
  'photo-diner': 'A building with table and chairs outside',
  'coop-diner': 'Bakery has a coop with the Diner restaurant'
}

var solutions = {
  'nico-galanis': ['bakery-owner'],
  'parker-bailey': ['diner-owner'],
  'matt-bishop': ['some-clue-1', 'some-clue-2', 'some-clue-3'],
  'emmett-moss': ['some-clue-1', 'some-clue-2', 'some-clue-3'],
  'donna-fischer': ['some-clue-1', 'some-clue-2', 'some-clue-3'],
  'ophelia-easton': ['some-clue-1', 'some-clue-2', 'some-clue-3'],
  'delaney-cane': ['some-clue-1', 'some-clue-2', 'some-clue-3'],
  'willow-bryce': ['some-clue-1', 'some-clue-2', 'some-clue-3'],

  'morning-cafe': ['bakery-across-diner'],
  'bailey-diner': ['coop-diner', 'photo-diner'],
  'knight-antiques': ['some-clue-1', 'some-clue-2', 'some-clue-3'],
  'sprout': ['some-clue-1', 'some-clue-2', 'some-clue-3'],
  'zink-jewelers': ['some-clue-1', 'some-clue-2', 'some-clue-3'],
  'readwell-books': ['some-clue-1', 'some-clue-2', 'some-clue-3'],
  'audio-forge': ['some-clue-1', 'some-clue-2', 'some-clue-3'],
}

var nameMappings = {
  'morning-cafe': 'Καλημέρα Kafe',
  'bailey-diner': 'Bailey Family Diner',
  'knight-antiques': 'Red Knight Antiques',
  'sprout': 'Sprout!',
  'zink-jewelers': 'ZINC Jewelers',
  'readwell-books': 'Readwell Books',
  'audio-forge': "Willow's Audio Forge",
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
  },

  getAllSolutions: function() {
    return solutions;
  },

  mapName: function(name) {
    return nameMappings[name];
  }

}
