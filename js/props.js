var game = {
  day: 1,
  mode: 'desk',
  detectiveName: 'Starling'
}

var clues = {
  'diner-owner': 'A restaurant owner from Lovich Street found Galani',
  'bakery-across-diner': 'The Bakery is across the street of the Diner',
  'bakery-owner': 'Nico Galanis was the Bakery owner',
  /* bakery photo crime 1 */
  'table-chairs': 'A building with table and chairs outside',
  'friday-specials': 'The hand-written board menu offers "Friday Specials"',
  'clock-time': 'The clock says 9:13',
  /* bakery photo crime 2 */
  'bust-pavement': 'A bust and shattered glass are lying on the pavement',
  'shop-down-street': 'A shop "down at the end of street"',
  /* dnd poster */
  'dnd-poster': 'The posters announcement says "Friday, Nov. 10th"',
  /* coop flyer */
  'coop-diner': 'Nico\'s Bakery has a coop with the Diner restaurant',
  /* antiques recipe */
  'antiques-recipe': 'A recipe over "Movie Bust -- $149"',
  /* others, todo */
  //'secury-cam': 'Cloaked couple walks by the music store Friday at 22:46',
}

var interrogations = {
  'nico-galanis': {
    'wound-knife': 'The victim has a jagged wound on his neck',
    'two-bruises': 'The victim has two large bruises on his head',
    'black-petals': 'There are black flower petals scattered across him',
    'item-phone': true
  },
  'parker-bailey': {
    'parker-walking': 'Mr. Bailey says he was out walking from 7 to 10',
    'parker-delaney': 'Mr. Bailey bought flowers for his wife at 5pm',
  },
  'morning-cafe': {
    'item-knife': true,
    'item-photo-crime-1': true,
    'item-photo-crime-2': true,
    'item-flyer-diner': true,
  },
  'bailey-diner': {
    'item-dnd-poster': true,
    'item-antiques-recipe': true,
  },
}

var solutions = {
  'nico-galanis': ['bakery-owner'],
  'parker-bailey': ['diner-owner'],
  'matt-bishop': ['bust-pavement', 'phone-clue-1'],
  'emmett-moss': ['some-clue-1', 'some-clue-2', 'some-clue-3'],
  'donna-fischer': ['some-clue-1', 'some-clue-2', 'some-clue-3'],
  'ophelia-easton': ['some-clue-1', 'some-clue-2', 'some-clue-3'],
  'delaney-cane': ['some-clue-1', 'some-clue-2', 'some-clue-3'],
  'willow-bryce': ['some-clue-1', 'some-clue-2', 'some-clue-3'],

  'morning-cafe': ['bakery-across-diner'],
  'bailey-diner': ['coop-diner', 'photo-diner'],
  'knight-antiques': ['some-clue-1', 'some-clue-2', 'some-clue-3'],
  'sprout': ['some-clue-1', 'some-clue-2', 'some-clue-3'],
  'zinc-jewelers': ['some-clue-1', 'some-clue-2', 'some-clue-3'],
  'readwell-books': ['some-clue-1', 'some-clue-2', 'some-clue-3'],
  'audio-forge': ['some-clue-1', 'some-clue-2', 'some-clue-3'],
}

var nameMappings = {
  'nico-galanis': 'Nico Galanis',
  'parker-bailey': 'Parker Bailey',
  'matt-bishop': 'Matt Bishop',
  'emmett-moss': 'Emmett Moss',
  'donna-fischer': 'Donna Fischer',
  'ophelia-easton': 'Ophelia Easton',
  'delaney-cane': 'Delaney Cane',
  'willow-bryce': 'Willow Bryce',

  'morning-cafe': 'Καλημέρα Kafe',
  'bailey-diner': 'Bailey Family Diner',
  'knight-antiques': 'Red Knight Antiques',
  'sprout': 'Sprout!',
  'zinc-jewelers': 'ZINC Jewelers',
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

  getAllInterrogation: function() {
    return interrogations;
  },

  mapName: function(name) {
    return nameMappings[name];
  }

}
