import Desk from './desk.js'
import Persons from './persons.js'
import Places from './places.js'

const assistantsContainer = document.getElementById('assistants');

export default {
  
  init: function() {
  },

  hide: function() {
    assistantsContainer.classList.add('out--left');
  },

  show: function() {
    assistantsContainer.classList.remove('out--left');
  }

}