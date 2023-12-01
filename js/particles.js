import Props from './props.js'

/* REVISED DUST EFFECT POC */
/* CREDITS: https://codepen.io/BrendonC/pen/EeajOe */

let canvas = document.getElementById('particle-canvas');
let ctx = canvas.getContext('2d');
let width = 800;
let height = 600;

export default {
  
  init: function() {}

};

class Particle {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.vx = 0;
    this.vy = 0;
    this.accelX = 0;
    this.accelY = 0;
    this.life = 2000;
    this.size = 2;
  }
  
  update() {
    this.vx += this.accelX;
    this.vy += this.accelY;
    this.x += this.vx;
    this.y += this.vy;
    this.x -= Props.getGameProp('particleSpeed');
    if (this.x < 0) this.life = -1;
  }
  
  draw(ctx) {
    let grad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
    grad.addColorStop(0, 'rgba(255, 255, 150, ' + (this.opacity + Math.random() / 10) + ')');
    grad.addColorStop(0.75, 'transparent');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);
  }
  
  isAlive() {
    return this.life >= 0;
  }
}

class ParticleSystem {
  constructor() {
    this.particles = [];
    this.updateHandler = undefined;
  }
  
  addParticle(particle) {
    this.particles.push(particle);
  }

  update(deltaTime = 0) {
    this.particles.forEach(particle => {
      particle.update(deltaTime);
      this.updateHandler && this.updateHandler(particle);
    });
  }
  
  onUpdate(fn) {
    this.updateHandler = fn;
  }
}

let system = new ParticleSystem();

for (let i = 0; i < 40; i++) {
  let particle = new Particle();
  let angle = Math.PI/2 * (Math.random() - 0.5) * 2;
  particle.x = Math.random() * width;
  particle.y = Math.random() * height;
  particle.life = Math.random() * 1000 + 1000;
  particle.size = Math.random() * 10;  
  particle.maxLife = particle.life;
  particle.opacity = Math.random(0.5);
  system.addParticle(particle);
}

system.onUpdate((particle) => {
  if (!particle.isAlive()) {
    particle.x = width - (Math.random() * 150);
    particle.y = Math.random() * height;
    particle.vx = 0;
    particle.vy = 0;
    particle.life = Math.random() * 2000 + 2000;
    particle.maxLife = particle.life;    
  }
  
  particle.life -= 10;
  particle.accelX = (Math.random() - 0.5) * 0.02;
  particle.accelY = (Math.random() - 0.5) * 0.02;

  particle.update();
});

function update() {
  system.update();
}

function draw() {
  ctx.globalCompositeOperation = 'source-over';
  ctx.fillStyle = '#010101';
  ctx.fillRect(0, 0, width, height);
  ctx.clearRect(0, 0, width, height);
  system.particles.forEach(particle => particle.draw(ctx));
}

function render() {
  update();
  draw();
  requestAnimationFrame(render);
}

function setup() {
  canvas.width = width;
  canvas.height = height;
}

function init() {
  setup();
  render();
}

init();