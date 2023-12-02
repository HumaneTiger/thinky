import Persons from './persons.js'
import Desk from './desk.js'

const placesContainer = document.getElementById('places');

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
  }

}