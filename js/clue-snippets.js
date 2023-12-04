import Audio from './audio.js'
import Props from './props.js'

import Desk from './desk.js'
import Persons from './persons.js'
import Places from './places.js'
import EndDay from './end-day.js'
import Assistants from './assistants.js'

const viewport = document.querySelector('#viewport main');

let newPosX = 0, newPosY = 0, startPosX = 0, startPosY = 0, initialStyleLeft = 0, initialStyleTop = 0;
let dragMode = false;
let dragEl = null;

export default {
  
  init: function() {
    
    document.body.addEventListener('pointerdown', this.mouseDown.bind(this));
    document.body.addEventListener('pointermove', this.mouseMove.bind(this));
    document.body.addEventListener('pointerup', this.mouseUp.bind(this));
    
    this.initClues();
  },

  initClues: function() {
    const allClues = Props.getAllClues();
    let left = 1480, top = 140;
    for (var clue in allClues) {
      viewport.insertAdjacentHTML(
        'beforeend',
        '<div class="clue-snippet font--typewriter is--hidden" data-clue-snippet="' + clue + '" style="left: ' + (top > 1000 ? left + 30 : left) + 'px; top: ' + (top > 1000 ? top - 870 : top) + 'px;">' +
        '<p>' + allClues[clue] + '</p></div>'
      );
      left += 50;
      top += 60;
      if (left > 1600) {
        left = 1480;
      }
    }
  },

  extractClue: function(ev) {
    const target = ev.target;
    if (target && target.dataset.clue && !target.classList.contains('extracted')) {
      const clue = target.dataset.clue;
      const cluePosition = target.getBoundingClientRect();
      const constClueSnippet = viewport.querySelector('.clue-snippet[data-clue-snippet="'+clue+'"]');
      if (constClueSnippet) {
        Audio.sfx('click');
        target.classList.add('extracted');
        constClueSnippet.classList.remove('is--hidden');
        constClueSnippet.classList.add('new');

        const snippetLeft = constClueSnippet.style.left,
              snippetTop = constClueSnippet.style.top,
              startLeft = cluePosition.x,
              startTop = cluePosition.y - 50;

        constClueSnippet.style.left = startLeft + 'px';
        constClueSnippet.style.top = startTop + 'px';

        window.setTimeout (() => {
          Audio.sfx('pick-up', 0, 0.1);
          constClueSnippet.style.left = snippetLeft;
          constClueSnippet.style.top = snippetTop;            
        }, 800);
        
      }      
    }
  },

  mouseDown: function(ev) {
      
    let target = ev.target;
    const leftMouseButton = (ev.button === 0);

    if (target && leftMouseButton) {

      if (dragMode === false && target.closest('.clue-snippet')) {

        dragMode = true;

        dragEl = target.closest('.clue-snippet');

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
      if (dragTarget) {
        // lock snippet
      } else {
        this.resetDraggedElement(dragEl);
      }
      dragMode = false;
      dragEl = null;
    }
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

    let targetCards = document.querySelectorAll('.drag-target.unknown');

    targetCards.forEach(candidate => {

      let viewportOffset = candidate.getBoundingClientRect();
      candidate.classList.add('no--hover');
      candidate.classList.remove('force--hover');

      if (mouseX >= viewportOffset.left &&
          mouseX <= viewportOffset.right &&
          mouseY >= viewportOffset.top &&
          mouseY <= viewportOffset.bottom) {
          
          targetCandidateFound = candidate;
      }

    });

    return targetCandidateFound;

  }

}