import Audio from './audio.js'
import Props from './props.js'

import Desk from './desk.js'
import Persons from './persons.js'
import Places from './places.js'
import EndDay from './end-day.js'
import Assistants from './assistants.js'

const viewport = document.querySelector('#viewport main');
const cluePositiveFeedbackElem = document.querySelector('#viewport .clue-positive-feedback');
let originalPosition = [];

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
    const allSolutions = Props.getAllSolutions();
    const isHidden = 'is--hidden'; // is--hidden
    let left = 1480, top = 140;
    /*
    const allInterrogations = Props.getAllInterrogation();
    for (var interrogation in allInterrogations) {
      for (var clue in allInterrogations[interrogation]) {
        if (allInterrogations[interrogation][clue] !== true) {
          allClues[clue] = allInterrogations[interrogation][clue];
        }
      }
    }*/
    for (var clue in allClues) {
      originalPosition[clue] = {
        left: (top > 900 ? left + 30 : left),
        top: (top > 900 ? top - 840 : top)
      }
      viewport.insertAdjacentHTML(
        'beforeend',
        '<div class="clue-snippet font--typewriter ' + isHidden + '" data-clue-snippet="' + clue + '" style="left: ' + originalPosition[clue].left + 'px; top: ' + originalPosition[clue].top + 'px;">' +
        '<p>' + allClues[clue] + '</p></div>'
      );
      left += 50;
      top += 50;
      if (left > 1600) {
        left = 1480;
      }
    }
    for (var solution in allSolutions) {
      const solutionsForTarget = allSolutions[solution];
      Persons.updatePersonsPlacesUnknowns(document.getElementById(solution), solutionsForTarget.length);
    }
  },

  cheat: function() {
    for (var clue in Props.getAllClues()) {
      viewport.querySelector('*[data-clue-snippet="' + clue + '"]').classList.remove('is--hidden');
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
        if (target.closest('.findings') && !target.closest('#page-nico-galanis')) {
          constClueSnippet.classList.add('interview');
        }

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
      } else {
        console.log('Missing clue snippet for: ' + clue);
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
      dragEl.classList.remove('grabbed');
      if (dragTarget) {
        dragTarget.classList.add('no--hover');
        dragTarget.classList.remove('force--hover');
        this.processClue(dragEl, dragTarget);
      } else {
        this.resetDraggedElement(dragEl);
      }
      dragMode = false;
      dragEl = null;
    }
  },

  processClue: function(clue, target) {
    const solutions = Props.getAllSolutions();
    const targetId = target.id,
          clueId = clue.dataset.clueSnippet;
    if (targetId && clueId) {
      const solutionsForTarget = solutions[targetId];
      if (solutionsForTarget.length && solutionsForTarget.includes(clueId)) {
        const index = solutionsForTarget.indexOf(clueId);
        solutionsForTarget.splice(index, 1);
        if (solutionsForTarget.length === 0) {
          this.positiveFeedback(clue);
          Persons.revealPersonsPlacesTarget(target, targetId);
        } else {
          this.positiveFeedback(clue);
          Audio.sfx('success');
          Persons.updatePersonsPlacesUnknowns(target, solutionsForTarget.length);
        }
      } else {
        this.wrongClue(clueId);
      }
    }
  },

  positiveFeedback: function(clue) {
    cluePositiveFeedbackElem.style.left = parseInt(clue.style.left, 10) + 145 + 'px';
    cluePositiveFeedbackElem.style.top = clue.style.top;
    cluePositiveFeedbackElem.style.opacity = 0;
    cluePositiveFeedbackElem.style.transform = 'scale(10)';
    clue.style.transition = 'transform 0.3s ease-out, opacity 0.3s ease-out';
    clue.style.transform = 'scale(3)';
    clue.style.opacity = 0;
    window.setTimeout(() => {
      cluePositiveFeedbackElem.style.removeProperty('left');
      cluePositiveFeedbackElem.style.removeProperty('top');
      cluePositiveFeedbackElem.style.removeProperty('opacity');
      cluePositiveFeedbackElem.style.removeProperty('transform');
      clue.classList.add('is--hidden');
    }, 500);
  },

  wrongClue: function(clueId) {
    Audio.sfx('wrong');
    dragEl.classList.remove('active');
    dragEl.style.left = originalPosition[clueId].left + 'px';
    dragEl.style.top = originalPosition[clueId].top + 'px';
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

  }

}