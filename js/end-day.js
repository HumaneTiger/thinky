import Props from './props.js'
import Persons from './persons.js'
import Places from './places.js'
import Desk from './desk.js'

const endDayContainer = document.getElementById('end-day');
const assistantsContainer = document.getElementById('assistants');
const interrogationsContainer = document.getElementById('interrogations');
const dayContainer = document.querySelector('#day-count .day');
const allAssistantChips = assistantsContainer.querySelectorAll('.assistant--chip');


export default {
  
  init: function() {
  },

  hide: function() {
    endDayContainer.classList.add('out');
    interrogationsContainer.classList.add('out--right');
  },

  // this is the "end day" mode
  show: function() {
    endDayContainer.classList.remove('out');
    const allSnippets = document.querySelectorAll('#viewport main .clue-snippet');
    [...allSnippets].forEach((snippet) => {
      snippet.classList.remove('new');
      snippet.classList.add('out');
    });
    [...allAssistantChips].forEach(chip => {
      if (chip.classList.contains('active')) {
        interrogationsContainer.querySelector('.' + chip.id + ' .bgimg').classList.remove('is--hidden');
        interrogationsContainer.classList.remove('out--right');
        const newClueOrItem = Props.getNewThing(chip.dataset.interrogation);
        chip.classList.remove('active');
        if (chip.dataset.interrogation === 'nico-galanis') {
          chip.querySelector('.speech-bubble--victim-clue').classList.remove('is--hidden');
        } else if (newClueOrItem && newClueOrItem.type === 'clue') {
          interrogationsContainer.querySelector('.' + chip.id + ' .bgimg').src =  './img/end-day/new-entry.png';
          chip.querySelector('.speech-bubble--clue').classList.remove('is--hidden');
        } else if (newClueOrItem && newClueOrItem.type === 'item') {
          interrogationsContainer.querySelector('.' + chip.id + ' .bgimg').src =  './img/desk/' + newClueOrItem.key + '.png';
          chip.querySelector('.speech-bubble--item').classList.remove('is--hidden');
          document.getElementById(newClueOrItem.key).classList.remove('is--hidden');
        }
      } else {
        interrogationsContainer.querySelector('.' + chip.id + ' .bgimg').classList.add('is--hidden');
        chip.classList.add('at--home');
      }
      chip.removeAttribute('style');
      chip.classList.add('is--locked', 'no--hover');
      chip.querySelector('.speech-bubble--person').classList.add('is--hidden');
      chip.querySelector('.speech-bubble--place').classList.add('is--hidden');
      chip.querySelector('.speech-bubble--victim').classList.add('is--hidden');
    });
    assistantsContainer.classList.add('end-day');
    assistantsContainer.classList.remove('out--left');
  },

  nextDay: function() {
    this.hide();
    let nextDay = Props.getGameProp('day') + 1;
    Props.setGameProp('day', nextDay);
    dayContainer.textContent = nextDay;
    endDayContainer.querySelector('.day').textContent = nextDay;
    if (nextDay === 2) {
      document.getElementById('letter').classList.add('is--hidden');
    }
    const allSnippets = document.querySelectorAll('#viewport main .clue-snippet');    
    [...allSnippets].forEach((snippet) => {
      snippet.classList.remove('out');
    });
    [...allAssistantChips].forEach(chip => {
      chip.classList.remove('is--locked', 'no--hover', 'at--home');
      chip.querySelector('.speech-bubble--victim-clue').classList.add('is--hidden');
      chip.querySelector('.speech-bubble--item').classList.add('is--hidden');
      chip.querySelector('.speech-bubble--clue').classList.add('is--hidden');
    });
    assistantsContainer.classList.remove('end-day');
    if (Props.getGameProp('mode') === 'desk') {
      assistantsContainer.classList.add('out--left');
    }
    Persons.unlockAll();
    Places.unlockAll();
  }
}