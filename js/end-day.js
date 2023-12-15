import Props from './props.js'
import Audio from './audio.js'
import Persons from './persons.js'
import Places from './places.js'
import Desk from './desk.js'

const endDayContainer = document.getElementById('end-day');
const finaleContainer = document.getElementById('finale');
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
    const allTabs = document.querySelectorAll('#register .tabs .tab');
    [...allSnippets].forEach((snippet) => {
      snippet.classList.remove('new');
      snippet.classList.add('out');
    });
    [...allTabs].forEach((tab) => {
      tab.classList.remove('new');
    });
    [...allAssistantChips].forEach(chip => {
      interrogationsContainer.querySelector('.' + chip.id + ' .bgimg').src =  './img/end-day/nothing.png';
      if (chip.classList.contains('active')) {
        const interriogatedPersonOrPlace = chip.dataset.interrogation;
        interrogationsContainer.querySelector('.' + chip.id + ' .bgimg').classList.remove('is--hidden');
        interrogationsContainer.classList.remove('out--right');
        const newClueOrItem = Props.getNewThing(interriogatedPersonOrPlace);
        chip.classList.remove('active');
        if (newClueOrItem && newClueOrItem.type === 'clue') {
          interrogationsContainer.querySelector('.' + chip.id + ' .bgimg').src =  './img/end-day/new-entry.png';
          Desk.addFinding(interriogatedPersonOrPlace, newClueOrItem);
          if (interriogatedPersonOrPlace === 'nico-galanis') {
            chip.querySelector('.speech-bubble--victim-clue').classList.remove('is--hidden');
          } else {
            chip.querySelector('.speech-bubble--clue').classList.remove('is--hidden');
          }
        } else if (newClueOrItem && newClueOrItem.type === 'item') {
          chip.querySelector('.speech-bubble--item').classList.remove('is--hidden');
          if (document.getElementById(newClueOrItem.key)) {
            interrogationsContainer.querySelector('.' + chip.id + ' .bgimg').src =  './img/desk/' + newClueOrItem.key + '.png';
            document.getElementById(newClueOrItem.key).classList.remove('is--hidden');
          } else {
            console.log('Item ' + newClueOrItem.key + ' missing on the desk.');
          }
        } else {
          /* no findings */
          const containerNothingNew = document.getElementById(interriogatedPersonOrPlace);
          chip.querySelector('.speech-bubble--nope').classList.remove('is--hidden');
          if (containerNothingNew.querySelector('.nothing-new')) {
            containerNothingNew.querySelector('.nothing-new').classList.remove('is--hidden');
          } else if (containerNothingNew.classList.contains('place--marker')) {
            containerNothingNew.classList.add('nothing-new');
          }
        }
      } else {
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
      chip.querySelector('.speech-bubble--clue').classList.add('is--hidden');
      chip.querySelector('.speech-bubble--item').classList.add('is--hidden');
      chip.querySelector('.speech-bubble--nope').classList.add('is--hidden');
    });
    assistantsContainer.classList.remove('end-day');
    if (Props.getGameProp('mode') === 'desk') {
      assistantsContainer.classList.add('out--left');
    }
    Persons.unlockAll();
    Places.unlockAll();
  },

  startFinale: function() {
    finaleContainer.classList.remove('out');
  },

  stopFinale: function() {
    finaleContainer.classList.add('out');
  },

  caseSolved: function() {
    window.setTimeout(() => {
      Audio.sfx('solved', 0, 1);
      document.querySelector('#finale h1').textContent = "Case solved!";
      document.getElementById('murderer-1').style.top = '140px';
      document.getElementById('murderer-2').style.top = '140px';
      document.getElementById('button-go-back').classList.add('is--hidden');
      document.getElementById('content-solved').style.opacity = '1';
    }, 500);
  }

}