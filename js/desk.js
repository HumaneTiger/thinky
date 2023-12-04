import Audio from './audio.js'
import Props from './props.js'
import Ui from './ui.js'
import ClueSnippets from './clue-snippets.js'
import Persons from './persons.js'
import Places from './places.js'

const deskContainer = document.getElementById('desk');
const letterPoliceContainer = document.getElementById('letter-police');

export default {
  
  init: function() {
    document.body.addEventListener('click', this.handleClick.bind(this));
    document.body.addEventListener('pointerdown', this.handlePointerDown.bind(this));
    document.getElementById('detective-name').addEventListener('keydown', this.typeFeedback);
    document.getElementById('detective-name').addEventListener('keyup', this.handleDetectiveName.bind(this));
  },

  handleClick: function(ev) {
    var target = ev.target;
    if (target && target.classList.contains('button') && target.closest('.physical--item')) {
      ev.preventDefault();
      Audio.sfx('shuffle-paper');
      this.updateDetectiveName();
      letterPoliceContainer.classList.remove('out');
      document.getElementById('letter').classList.add('aside', 'no--hover');
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
    letterPoliceContainer.querySelector('*[data-name="detective"]').textContent = Props.getGameProp('detectiveName');
  },

  handlePointerDown: function(ev) {
    var target = ev.target;
    if (target && target.classList.contains('clue') && target.closest('.physical--item')) {
      ev.preventDefault();
      ClueSnippets.extractClue(ev);
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