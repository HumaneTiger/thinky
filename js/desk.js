import Audio from './audio.js'
import Props from './props.js'
import Ui from './ui.js'
import ClueSnippets from './clue-snippets.js'
import Persons from './persons.js'
import Places from './places.js'

const deskContainer = document.getElementById('desk');
const registerContainer = document.getElementById('register');
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
    if (target && target.closest('.tab')) {
      ev.preventDefault();
      this.showRegisterPage(target.closest('.tab'));
    }
  },

  showRegisterPage: function(tab) {
    const person = tab.id.split('tab-')[1];
    if (!tab.classList.contains('active')) {
      Audio.sfx('shuffle-page', 0, 1);
      registerContainer.querySelector('.tab.active').classList.remove('active');
      tab.classList.add('active');
      registerContainer.querySelector('.page:not(.is--hidden)').classList.add('is--hidden');
      document.getElementById('page-' + person).classList.remove('is--hidden');
    }
  },
  unlockRegisterPage: function(person) {
    const personPage = document.getElementById('page-' + person);
    if (personPage) {
      personPage.classList.remove('unknown');
      personPage.classList.add('known');
      personPage.querySelector('.profile').src = personPage.querySelector('.profile').src.replace('-unknown', '-known');
      document.getElementById('tab-' + person).classList.add('new');  
    } else {
      console.log('Can not find register page for ' + person);
    }
  },

  addFinding: function(interriogatedPerson, newClueOrItem) {
    const personPage = document.getElementById('page-' + interriogatedPerson);
    if (personPage) {
      personPage.querySelector('.findings p.none').classList.add('is--hidden');
      if (interriogatedPerson === 'nico-galanis') {
        personPage.querySelector('.findings').innerHTML += '<p><em>Assistant on Day ' + Props.getGameProp('day') + ':</em> "' + newClueOrItem.value + '"</p>'
      } else {
        personPage.querySelector('.findings').innerHTML += '<p><em>' + Props.mapName(interriogatedPerson) + ' on Day ' + Props.getGameProp('day') + ':</em> "' + newClueOrItem.value + '"</p>'
      }
      document.getElementById('tab-' + interriogatedPerson).classList.add('new');
    } else {
      console.log('Register page for person ' + interriogatedPerson + ' can\'t be found.');
    }
  },
  unlockPhoneAvatar: function (label) {
    const personProfile = document.querySelector('#phone .message.' + label);
    if (personProfile) {
      personProfile.classList.add('known');
    } else {
      console.log('Can not find phone avatar for ' + label);
    }
  },
  typeFeedback: function(ev) {
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