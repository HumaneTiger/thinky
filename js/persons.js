import Desk from './desk.js'
import Places from './places.js'

const personsContainer = document.getElementById('persons');
const allProfilePhotos = personsContainer.querySelectorAll('.profile--photo');

export default {
  
  init: function() {
  },

  hide: function(out) {
    personsContainer.classList.remove('out--' + ('rightleft'.replace(out, '')));
    personsContainer.classList.add('out--' + out);
  },

  show: function() {
    personsContainer.classList.remove('out--left');
    personsContainer.classList.remove('out--right');
  },

  unlockAll: function() {
    [...allProfilePhotos].forEach(photo => {
      photo.classList.remove('is--locked');
    });
  }

}