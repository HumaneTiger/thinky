import Props from './props.js'
import Audio from './audio.js'
import Desk from './desk.js'

const personsContainer = document.getElementById('persons');
const registerContainer = document.getElementById('register');
const allProfilePhotos = personsContainer.querySelectorAll('.profile--photo');
const allSolutions = Props.getAllSolutions();

export default {
  
  init: function() {
    for (var solution in allSolutions) {
      const solutionsForTarget = allSolutions[solution];
      this.updatePersonsPlacesUnknowns(document.getElementById(solution), solutionsForTarget.length);
      this.generateRegister(solution);
    }
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
  },

  updatePersonsPlacesUnknowns: function(target, unknownClues) {
    const label = target.id;
    target.querySelector('.label').textContent = Props.mapName(label) + ' (' + unknownClues + ')';
  },

  revealPersonsPlacesTarget: function(target, label) {
    Audio.sfx('reveal');
    target.querySelector('.bgimg').src = target.querySelector('.bgimg').src.replace('-unknown', '-known');
    target.classList.remove('unknown');
    target.querySelector('.label').textContent = Props.mapName(label);
    Desk.unlockRegisterPage(label);
    Desk.unlockPhoneAvatar(label);
  },

  generateRegister: function(solution) {
    if (registerContainer.querySelector('#tab-' + solution + ' span')) {
      registerContainer.querySelector('#tab-' + solution + ' span').textContent = Props.mapName(solution);
    }
  },

}