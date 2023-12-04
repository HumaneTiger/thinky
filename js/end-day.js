import Props from './props.js'
import Persons from './persons.js'
import Desk from './desk.js'

const endDayContainer = document.getElementById('end-day');
const dayContainer = document.querySelector('#day-count .day');

export default {
  
  init: function() {
  },

  hide: function() {
    endDayContainer.classList.add('out');
  },

  // this is the "end day" mode
  show: function() {
    endDayContainer.classList.remove('out');
    const allSnippets = document.querySelectorAll('#viewport main .clue-snippet');    
    [...allSnippets].forEach((snippet) => {
      snippet.classList.remove('new');
      snippet.classList.add('out');
    });
  },

  nextDay: function() {
    this.hide();
    let nextDay = Props.getGameProp('day') + 1;
    Props.setGameProp('day', nextDay);
    dayContainer.textContent = nextDay;
    endDayContainer.querySelector('.day').textContent = nextDay;
    if (nextDay === 2) {
      document.getElementById('letter').classList.add('is--hidden');
      document.getElementById('photo-seccam').classList.remove('is--hidden');
    }
    document.getElementById('letter').classList.add('is--hidden');
    const allSnippets = document.querySelectorAll('#viewport main .clue-snippet');    
    [...allSnippets].forEach((snippet) => {
      snippet.classList.remove('out');
    });
  }
}