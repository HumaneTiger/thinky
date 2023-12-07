import Desk from './desk.js'
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

      if (dragMode === false && target.closest('.assistant--chip')) {

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
      console.log(dragMode);
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
        if (dragTarget) {
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
      if (dragTarget) {
        dragTarget.classList.add('no--hover');
        dragTarget.classList.remove('force--hover');
        this.taskAssistant(dragEl, dragTarget);
      } else {
        this.resetDraggedElement(dragEl);
      }
      dragMode = false;
      dragEl = null;
    }
  },

  taskAssistant: function(dragEl, dragTarget) {
    dragEl.querySelector('.speech-bubble').classList.remove('is--hidden');
  },

  resetDraggedElement: function(el) {
    el.style.left = initialStyleLeft;
    el.style.top = initialStyleTop;
    el.classList.remove('grabbed', 'active');
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
    assistantsContainer.classList.remove('out--left');
  }

}