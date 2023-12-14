var game = {
  day: 1,
  mode: 'desk',
  detectiveName: 'Starling'
}

var clues = {
  'diner-owner': 'A restaurant owner from Lovich Street found Galani',
  'bakery-across-diner': 'The Bakery is across the street of the Diner',
  'bakery-owner': 'Nico Galanis was the Bakery owner',
  /* nico */
  'flower-petals-victim': 'Black flower petals were found on the victim',
  /* bakery photo crime 1 */
  'table-chairs': 'A building with table and chairs outside',
  'friday-specials': 'The hand-written board menu offers "Friday Specials"',
  'clock-time': 'The clock says 9:13',
  'knife-blade': 'It seems like this blade couldn\'t do the wound',
  /* bakery photo crime 2 */
  'bust-pavement': 'A bust and shattered glass are lying on the pavement',
  'shop-down-street': 'A shop "down at the end of street"',
  /* dnd poster */
  'dnd-poster': 'Posters announcement says "Friday, Nov. 10th"',
  'play-music': 'Poster also promises a favorite music night',
  /* rejection letter */
  'no-space': 'Nico has no free space in his shop to give up',
  /* coop flyer */
  'coop-diner': 'Nico\'s Bakery has a coop with the Diner restaurant',
  /* antiques recipe */
  'antiques-recipe': 'A recipe "Movie Bust -- $149" written on it',
  /* book store */
  'black-flower-petal': 'Black flower petals were found in the book shop',
  /* jeweler */
  'donna-to-jeweler': 'Donna went to Emmett\'s place Friday at 7',
  /* parker */
  'shopping-sprout': 'Parker was out walking from 7-10 on Friday',
  /* matt */
  'sold-bust': 'Say farewell to an antique Hollywood bust',
  'visit-antiques': 'Matt invites us to visit and examine his shop',
  /* delaney */
  'flower-orders': 'Black and orange flowers are a Halloween sales hit',
  'check-bookshop': 'Delaney suggests to check the Bookshop',
  /* donna */
  'flowers-present': 'Someone wants to get rid of 300 flowers',
  'bookshop-girl': 'The Jeweler bought presents for the Bookseller',
  /* ophelia */
  'food-waste': 'Strange people got attracked by food waste left outside',
  /* willow */
  'dnd-party': 'There was a DnD party Friday night',
  'missing-nico': 'Someone was missing Nico at the DnD party',
  'camera-footage': 'Willow gives us access to security camera footage',
  /* emmett */
  'sucking-attention': "Not everyone is happy with Nico's business",
  'dahlia-romantic': "Emmet was surpising Donna with flowers at his place",
  'jewelry-shop-boy': "The Jewelry shop owner visited Denlaney on Friday",
  /* others, todo */
  'secury-cam': 'Cloaked couple walks by the music store',
}

var interrogations = {
  'nico-galanis': {
    'black-petals': 'There are <span class="clue" data-clue="flower-petals-victim">black flower petals scattered across him</em>',
    'wound-knife': 'The victim has a jagged wound on his neck',
    'two-bruises': 'The victim has two large bruises on his head',
    'phone': true,
    'bent-key': true,
  },
  'parker-bailey': {
    'parker-walking': 'On Friday? I <span class="clue" data-clue="shopping-sprout">was out walking from 7-10</span>, and it\'s none of your business where I was.',
  },
  'matt-bishop': {
    'nico-painting': "Nico's painting was worthless, but he held it dear. I'd love to keep it in his memory.",
    'examine-antiques': 'I\'d have no qualms with <span class="clue" data-clue="visit-antiques">you examining my shop</span>.',
  },
  'delaney-cane': {
    'emmett-customer': '<span class="clue" data-clue="jewelry-shop-boy">The jewelry shop boy came in my shop on Friday</span> to buy <span class="clue" data-clue="bookshop-girl">presents for the bookshop girl</span>.',
    'girls-name': '(When asked for the \'girls\' name, she said:) "I don\'t know. Maybe <span class="clue" data-clue="check-bookshop">just check the bookshop</span>?"',
  },
  'emmett-moss': {
    'sold-jewelry':  "The cool old lady, who helped me with the dinner, sold me some jewelry today.",
  },
  'donna-fischer': {
    'emmett-dahlias': '<span class="clue" data-clue="donna-to-jeweler">What I did on Friday? I went to Emmett\'s place at 7</span>. He had <span class="clue" data-clue="dahlia-romantic">all these black dahlias</span> out--I think he thought it was romantic or something.',
  },
  'willow-bryce': {
    'invite-music-shop': 'Come visit me at my shop. <span class="clue" data-clue="camera-footage">I can give you access to my security camera footage</span>, if this helps finding the murderer.',
  },
  'ophelia-easton': {
    'nico-friend': "Nico was a good friend. I looked after his shop while he was away."
  },
  'morning-cafe': {
    'item-photo-crime-1': true,
    'item-photo-crime-2': true,
    'item-knife': true,
    'item-flyer-diner': true,
  },
  'bailey-diner': {
    'item-dnd-poster': true,
    'item-antiques-recipe': true,
  },
  'knight-antiques': {
    'item-shop-records': true, /* todo */
    'item-photo-rack': true, /* todo */
  },
  'readwell-books': {
    'item-flower-petals': true,
    'item-rejection-letter': true,
  },
  'sprout': {
    'item-flower-petals-2': true,
  },
  'zinc-jewelers': {
    'note-sold-ring': true, /* todo, unlocks hippie store */
  },
  'hippie-store': {
    'stained-shoelace': true, /* talk to lady randomizer again... */
    'red-sneakers': true,
    'jacked-knife': true,
  },
  'audio-forge' : {
    'photo-seccam': true,
  },
  'blue-dream': {
    'stained-shoelace': true,
    'photo-jagged-knife': true,
  }
}

var solutions = {
  /* clues to unlock persons */
  'nico-galanis': ['bakery-owner'], /* DONE */
  'parker-bailey': ['diner-owner'], /* DONE */
  'matt-bishop': ['bust-pavement', 'sold-bust'], /* DONE */
  'emmett-moss': ['sucking-attention', 'dahlia-romantic'], /* DONE */
  'donna-fischer': ['bookshop-girl', 'black-flower-petal', 'no-space'], /* DONE */
  'ophelia-easton': ['food-waste'], /* DONE */
  'delaney-cane': ['flower-orders', 'flower-petals-victim'], /* DONE */
  'willow-bryce': ['dnd-party', 'dnd-poster', 'missing-nico'], /* DONE */
  /* clues to unlock places */
  'morning-cafe': ['bakery-across-diner'], /* DONE */
  'bailey-diner': ['coop-diner', 'table-chairs'], /* DONE */
  'knight-antiques': ['visit-antiques', 'antiques-recipe'], /* DONE */
  'sprout': ['shopping-sprout', 'jewelry-shop-boy'], /* DONE */
  'zinc-jewelers': ['donna-to-jeweler'], /* note saphire ring */
  'readwell-books': ['flowers-present', 'check-bookshop'], /* DONE */
  'audio-forge': ['play-music', 'camera-footage'], /* DONE */
  'blue-dream': ['wedding-ring', 'note-sold-ring'] /* NOT done */
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
  'bailey-diner': 'Family Diner',
  'knight-antiques': 'Red Knight Antiques',
  'sprout': 'Sprout!',
  'zinc-jewelers': 'ZINC Jewelers',
  'readwell-books': 'Readwell Books',
  'audio-forge': "Audio Forge",
  'blue-dream': "Blue Dream",
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
  },

  getNewThing: function(thing) {
    const keys = Reflect.ownKeys(interrogations[thing]);
    if (keys.length) {
      let interrogation = {
        key: keys[0],
        value: interrogations[thing][keys[0]],
        type: interrogations[thing][keys[0]] === true ? 'item' : 'clue'
      };
      delete interrogations[thing][keys[0]];
      return interrogation;
    }
  },

}
