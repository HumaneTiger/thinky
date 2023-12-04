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
let topIndex = 1;

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
        '<div class="clue-snippet font--typewriter" data-clue-snippet="' + clue + '" style="left: ' + (top > 1000 ? left + 30 : left) + 'px; top: ' + (top > 1000 ? top - 870 : top) + 'px;">' +
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

      if (dragMode === false && target.closest('div.battle-card')) {

        dragMode = true;

        dragEl = target.closest('div.battle-card');

        dragEl.style.zIndex = topIndex++;
        dragEl.classList.add('grabbed');
        
        startPosX = dragEl.clientX;
        startPosY = dragEl.clientY;

        initialStyleLeft = dragEl.style.left;
        initialStyleTop = dragEl.style.top;
      }

      if (dragMode === false && target.closest('#almanac') && target.classList.contains('title')) {

        dragMode = true;

        dragEl = target.closest('#almanac');
        dragEl.classList.add('grabbed');
        
        startPosX = dragEl.clientX;
        startPosY = dragEl.clientY;

        initialStyleLeft = dragEl.style.left;
        initialStyleTop = dragEl.style.top;
      }
    }
  },

  mouseMove: function(e) {

    e.preventDefault;
    e.stopPropagation();
    
    if (dragMode) {

      let scale = window.innerHeight / 1200;
      // calculate the new position
      newPosX = (startPosX - e.clientX) / scale;
      newPosY = (startPosY - e.clientY) / scale;

      // with each move we also want to update the start X and Y
      startPosX = e.clientX;
      startPosY = e.clientY;

      if (dragEl) {
        // set the element's new position:
        dragEl.style.top = (dragEl.offsetTop - newPosY) + "px";
        dragEl.style.left = (dragEl.offsetLeft - newPosX) + "px";  
        let dragTarget = this.getDragTarget(e);
        if (dragTarget) {
          dragTarget.classList.add('active');
        }
        // remove item info when card is dragged
        battleCardsContainer.querySelector('p.item-info').innerHTML = '';
      }
    }  
  },

  mouseUp: function(e) {
    if (dragMode) {
      let dragTarget = this.getDragTarget(e);
      if (dragTarget) {
        if (dragTarget.classList.contains('zombie') && !dragEl.classList.contains('resolve')) {
          Battle.resolveAttack(dragEl, dragTarget);
        }
      } else if (dragEl.id && dragEl.id === 'almanac') {
        dragEl.classList.remove('grabbed');
        dragEl.classList.add('repos');
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
    el.classList.remove('grabbed');
  }

}