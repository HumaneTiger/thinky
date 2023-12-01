import { default as Props } from './props.js'

const wallsContainer = document.getElementById('walls');

let left, top, bottom;

export default {
  
  init: function() {
    this.resetCave();
    this.generateWalls();
  },

  generateWalls: function() {

    for (var i=0; i < 200; i += 1) {

      this.addWall(top, bottom);

      if (Math.random() < 0.5) {
        if (top > 1) top--;
      } else {
        if (top < 4) top++;
      }
      if (Math.random() < 0.5) {
        if (bottom > 1) bottom--;
      } else {
        if (bottom < 4) bottom++;
      }

      if (Math.random() < 0.33) {
        const randPlant = Math.floor(Math.random() * (7 - 1 + 1) + 1);
        wallsContainer.innerHTML = wallsContainer.innerHTML + '<div class="plant bottom-' + bottom + '" style="left: ' + left + 'px"><img src="./img/plants/plant-' + randPlant + '.png"></div>';
      }
    }
  },

  addWall: function(top, bottom) {
    this.addTreasure();
    wallsContainer.innerHTML = wallsContainer.innerHTML + '<div class="wall-1 top top-' + top + '" style="left: ' + left + 'px"></div><div class="wall-1 bottom bottom-' + bottom + '" style="left: ' + left + 'px"></div>';
    Props.getGameProp('wallEdges').push({
      top: top,
      bottom: bottom
    });
    this.addOrb();
    left += 140;
  },

  resetCave: function() {
    left = 0;
    top = 4;
    bottom = 4;
    wallsContainer.innerHTML = '';
  },

  addOrb: function() {
    const wallIndex = Props.getGameProp('wallEdges').length;
    if (wallIndex % Props.getGameProp('orbSpawn') === 0) {
      wallsContainer.innerHTML = wallsContainer.innerHTML + '<div class="orb top-' + top + '" style="left: ' + (left + 60) + 'px; margin-top: '+ (100 - Math.floor(Math.random()*100)) +'px;"><div class="orb-glow pulse-anim-2"></div></div>';
    }
  },

  addTreasure: function() {
    const wallIndex = Props.getGameProp('wallEdges').length;
    if (wallIndex > 10 && wallIndex%(Math.floor(Math.random()*30)) === 0 && !(wallIndex % Props.getGameProp('orbSpawn') === 0)) {
      wallsContainer.innerHTML = wallsContainer.innerHTML + '<div class="treasure type-'+Math.floor(Math.random()*3+1)+' bottom-' + bottom + '" style="left: ' + (left + 50) + 'px; transform: translateY('+ (-140 + Math.floor(Math.random()*140)) +'px) scale(0.8);"><div class="treasure-glow pulse-anim-3"></div>';
    }
    if (Props.getGameProp('special') && wallIndex > 20 && wallIndex%(Math.floor(Math.random() * 150)) === 0 && !(wallIndex % Props.getGameProp('orbSpawn') === 0)) {
      wallsContainer.innerHTML = wallsContainer.innerHTML + '<div class="scary-grave bottom-' + bottom + '" style="left: ' + (left - 20) + 'px;"><!--<div class="treasure-glow pulse-anim-3">--></div>';
    }
  }

}