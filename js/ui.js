import Audio from './audio.js'
import Props from './props.js'

import Desk from './desk.js'
import Persons from './persons.js'
import Places from './places.js'
import ClueSnippets from './clue-snippets.js'
import EndDay from './end-day.js'
import Assistants from './assistants.js'

const viewport = document.querySelector('#viewport main');
let currentPosition = 1;

let uiActive = false;

export default {
  
  init: function() {

    window.addEventListener('resize', this.resizeViewport);
    document.body.addEventListener('click', this.handleClick.bind(this));
    document.body.addEventListener('keypress', this.handleKey.bind(this));

    // document.body.addEventListener("contextmenu", (ev) => { ev.preventDefault(); });

    this.resizeViewport();
  },

  resizeViewport: function() {
    let scaleFactor = window.innerHeight / 1080;
    viewport.style.transform = 'scale3d('+scaleFactor+','+scaleFactor+','+1+')';
  },

  handleClick: function(ev) {
    var target = ev.target;
    Audio.playAmbientLoop();
    if (target && target.classList.contains('button')) {
      if (target.id === 'button-desk') this.switchToDesk();
      if (target.id === 'button-persons') this.switchToPersons();
      if (target.id === 'button-places') this.switchToPlaces();
      if (target.id === 'button-end-day') this.endDay();
      if (target.id === 'button-lets-go') this.nextDay();
      if (target.id === 'button-finale') this.triggerFinale();
      if (target.id === 'button-go-back') this.stopFinale();
    }
  },

  handleKey: function(ev) {
    if (ev.key === '#') {
      ClueSnippets.cheat();
    }
    if (ev.key === 'h' || ev.key === 'H' ) {
      document.getElementById('viewport').classList.toggle('highlight-clues');
    }
  },

  switchToDesk: function() {
    if (currentPosition !== 1) {
      Audio.sfx('swoosh');
      Persons.hide('right'); // immer rechts raus
      Places.hide('right'); // immer rechts raus
      Assistants.hide();
      Desk.show();
      currentPosition = 1;
      Props.setGameProp('mode', 'desk');
    }
  },

  switchToPersons: function() {
    if (currentPosition !== 2) {
      Audio.sfx('swoosh');
      if (currentPosition > 2) {
        Places.hide('right'); // nach rechts raus
        Persons.hide('left'); // von links rein
      } else {
        Desk.hide('left'); // nach links raus
        Persons.hide('right'); // von rechts rein
      }
      Persons.show();
      Assistants.show();
      currentPosition = 2;
      Props.setGameProp('mode', 'persons');
    }
  },

  switchToPlaces: function() {
    if (currentPosition !== 3) {
      Audio.sfx('swoosh');
      Desk.hide('left'); // immer links raus
      Persons.hide('left'); // immer links raus
      Places.show();
      Assistants.show();
      currentPosition = 3;
      Props.setGameProp('mode', 'places');
    }
  },

  endDay: function() {
    Audio.sfx('click');
    EndDay.show();
  },

  nextDay: function() {
    Audio.sfx('click');
    EndDay.nextDay();
  },

  triggerFinale: function() {
    Audio.sfx('click');
    viewport.classList.add('finale');
    EndDay.startFinale();
  },

  stopFinale: function() {
    Audio.sfx('click');
    viewport.classList.remove('finale');
    EndDay.stopFinale();
  },

}
