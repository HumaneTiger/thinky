import Audio from './audio.js'
import Persons from './persons.js'
import Places from './places.js'

export default {
  
  init: function() {
    document.body.addEventListener('click', this.handleClick.bind(this));
  },

  handleClick: function(ev) {
    var target = ev.target;
    if (target && target.classList.contains('button') && target.closest('.desk--item')) {
      ev.preventDefault();
      Audio.sfx('shuffle-paper');
      document.getElementById('letter-police').classList.remove('out');
      document.getElementById('letter').classList.add('aside');
    }
  },

}