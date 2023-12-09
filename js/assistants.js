import Props from './props.js'
import Persons from './persons.js'
import Places from './places.js'

const assistantsContainer = document.getElementById('assistants');
let originalPosition = [];

let newPosX = 0, newPosY = 0, startPosX = 0, startPosY = 0, initialStyleLeft = 0, initialStyleTop = 0;
let dragMode = false;
let dragEl = null;

export default {
  
  init: function() {
    document.body.addEventListener('pointerdown', this.mouseDown.bind(this));
    document.body.addEventListener('pointermove', this.mouseMove.bind(this));
    document.body.addEventListener('pointerup', this.mouseUp.bind(this));
  },

  mouseDown: function(ev) {
      
    let target = ev.target;
    const leftMouseButton = (ev.button === 0);

    if (target && leftMouseButton) {

      if (dragMode === false && target.closest('.assistant--chip:not(.is--locked)')) {

        dragMode = true;

        dragEl = target.closest('.assistant--chip');

        dragEl.classList.add('grabbed');
        
        startPosX = ev.clientX;
        startPosY = ev.clientY;

        initialStyleLeft = dragEl.style.left;
        initialStyleTop = dragEl.style.top;
        
      }
    }
  },

  mouseMove: function(ev) {

    ev.preventDefault;
    ev.stopPropagation();

    if (dragMode) {
      
      let scale = window.innerHeight / 1080;
      // calculate the new position
      newPosX = (startPosX - ev.clientX) / scale;
      newPosY = (startPosY - ev.clientY) / scale;

      // with each move we also want to update the start X and Y
      startPosX = ev.clientX;
      startPosY = ev.clientY;

      if (dragEl) {
        // set the element's new position:
        dragEl.style.top = (dragEl.offsetTop - newPosY) + "px";
        dragEl.style.left = (dragEl.offsetLeft - newPosX) + "px";  
        let dragTarget = this.getDragTarget(ev);
        if (dragTarget && !dragTarget.classList.contains('is--locked')) {
          dragEl.classList.add('active');
          dragTarget.classList.remove('no--hover');
          dragTarget.classList.add('force--hover');
        } else {
          dragEl.classList.remove('active');
        }
      }
    }  
  },

  mouseUp: function(ev) {
    if (dragMode) {
      let dragTarget = this.getDragTarget(ev);
      dragEl.classList.remove('grabbed');
      if (dragTarget && !dragTarget.classList.contains('is--locked')) {
        dragTarget.classList.add('no--hover', 'is--locked');
        dragTarget.classList.remove('force--hover');
        this.taskAssistant(dragEl, dragTarget);
      } else {
        dragEl.classList.remove('grabbed', 'active');
        this.resetDraggedElement(dragEl);
      }
      dragMode = false;
      dragEl = null;
    }
  },

  taskAssistant: function(dragEl, dragTarget) {
    dragEl.classList.add('no--hover', 'is--locked');
    dragEl.querySelector('.speech-bubble--person').classList.add('is--hidden');
    dragEl.querySelector('.speech-bubble--place').classList.add('is--hidden');
    dragEl.querySelector('.speech-bubble--victim').classList.add('is--hidden');
    if (Props.getGameProp('mode') === 'persons') {
      if (dragTarget.id === 'nico-galanis') {
        dragEl.querySelector('.speech-bubble--victim').classList.remove('is--hidden');
      } else {
        dragEl.querySelector('span').textContent = Props.mapName(dragTarget.id);
        dragEl.querySelector('.speech-bubble--person').classList.remove('is--hidden');
      }
    } else if (Props.getGameProp('mode') === 'places') {
      dragEl.querySelector('.speech-bubble--place').classList.remove('is--hidden');
    }
  },

  resetDraggedElement: function(el) {
    if (el.style) {
      el.removeAttribute('style');
    }
  },

  getDragTarget: function(ev) {

    let targetCandidateFound;
    let mouseX = ev.clientX;
    let mouseY = ev.clientY;

    let targetCards = document.querySelectorAll('.drag-target:not(.unknown)');

    targetCards.forEach(candidate => {

      let viewportOffset = candidate.getBoundingClientRect();

      if (mouseX >= viewportOffset.left &&
          mouseX <= viewportOffset.right &&
          mouseY >= viewportOffset.top &&
          mouseY <= viewportOffset.bottom) {

          targetCandidateFound = candidate;

      } else {
        candidate.classList.add('no--hover');
        candidate.classList.remove('force--hover');
      }

    });

    return targetCandidateFound;

  },

  hide: function() {
    assistantsContainer.classList.add('out--left');
  },

  show: function() {
    let allAssistantChips = assistantsContainer.querySelectorAll('.assistant--chip');
    [...allAssistantChips].forEach(chip => {
      this.resetDraggedElement(chip);
    });
    assistantsContainer.classList.remove('out--left');
  }

}