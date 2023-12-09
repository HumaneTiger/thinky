import Persons from './persons.js'
import Desk from './desk.js'

const placesContainer = document.getElementById('places');
const allPlaceMarkers = placesContainer.querySelectorAll('.place--marker');

export default {
  
  init: function() {
  },

  hide: function(out) {
    console.log(out);
    placesContainer.classList.remove('out--' + ('rightleft'.replace(out, '')));
    placesContainer.classList.add('out--' + out);
  },

  show: function() {
    placesContainer.classList.remove('out--left');
    placesContainer.classList.remove('out--right');
  },

  unlockAll: function() {
    [...allPlaceMarkers].forEach(marker => {
      marker.classList.remove('is--locked');
    });
  }

}