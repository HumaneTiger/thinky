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

  show: function() {
    endDayContainer.classList.remove('out');
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
  }

}