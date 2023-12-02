import Audio from './audio.js'
import Persons from './persons.js'
import Places from './places.js'

const deskContainer = document.getElementById('desk');

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

  hide: function(out) {
    deskContainer.classList.remove('out--' + ('rightleft'.replace(out, '')));
    deskContainer.classList.add('out--' + out);
  },

  show: function() {
    deskContainer.classList.remove('out--left');
    deskContainer.classList.remove('out--right');
  }

}