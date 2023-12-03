import Audio from './audio.js'
import Props from './props.js'
import Ui from './ui.js'
import Persons from './persons.js'
import Places from './places.js'

const deskContainer = document.getElementById('desk');

export default {
  
  init: function() {
    document.body.addEventListener('click', this.handleClick.bind(this));
    document.body.addEventListener('pointerdown', this.handlePointerDown.bind(this));
    document.getElementById('detective-name').addEventListener('keydown', this.typeFeedback);
    document.getElementById('detective-name').addEventListener('keyup', this.handleDetectiveName.bind(this));
  },

  handleClick: function(ev) {
    var target = ev.target;
    if (target && target.classList.contains('button') && target.closest('.desk--item')) {
      ev.preventDefault();
      Audio.sfx('shuffle-paper');
      this.updateDetectiveName();
      document.getElementById('letter-police').classList.remove('out');
      document.getElementById('letter').classList.add('aside');
    }
  },

  typeFeedback: function(ev) {
    console.log('fff');
    Audio.sfx('typewriter-hit')
  },

  handleDetectiveName: function(ev) {
    this.updateDetectiveName();
  },

  updateDetectiveName: function() {
    const detectiveName = document.getElementById('detective-name').value || document.getElementById('detective-name').placeholder;
    if (detectiveName) {
      Props.setGameProp('detectiveName', detectiveName);
    }
    document.getElementById('letter-police').querySelector('*[data-name="detective"]').textContent = Props.getGameProp('detectiveName');
  },

  handlePointerDown: function(ev) {
    var target = ev.target;
    if (target && target.classList.contains('clue') && target.closest('.desk--item')) {
      ev.preventDefault();
      Ui.extractClue(target);
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