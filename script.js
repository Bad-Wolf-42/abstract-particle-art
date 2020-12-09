const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 550;
canvas.height = 550;

const maxParticles = 400;
let particlesArray = [];

let frame = 0;

squareSize = 25;
arrayDimensions = canvas.width / squareSize;

const vectorField = new Array(arrayDimensions * arrayDimensions);

class Vector {
  constructor() {
    this.theta = Math.random() * Math.PI * 2;
    // this.magnitude = 1;
    // this.origin = [0, 0];
    this.x = Math.cos(this.theta);
    this.y = Math.sin(this.theta);
    this.speed = 0.05; //0.1
  }
  update() {
    this.theta += this.speed;
    this.x = Math.cos(this.theta);
    this.y = Math.sin(this.theta);
  }
  randomize() {
    this.theta = Math.random() * Math.PI * 2;
    this.x = Math.cos(this.theta);
    this.y = Math.sin(this.theta);
  }
}

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.radius = Math.abs(Math.random() * 6 - 2);
    this.hue = Math.random() * 100 + 100;
    this.saturation = Math.random() * 50 + 50;
    this.lightness = Math.random() * 50 + 25;
    this.arrayX = Math.floor(this.x / squareSize);
    this.arrayY = Math.floor(this.y / squareSize);
    this.index = this.arrayY * arrayDimensions + this.arrayX;
  }
  draw() {
    ctx.fillStyle = `hsla(${this.hue}, ${this.saturation}%, ${this.lightness}%, 1)`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  }
  update() {
    if ((this.x > 0 && this.x < canvas.width) && (this.y > 0 && this.y < canvas.height)) {
      this.arrayX = Math.floor(this.x / squareSize);
      this.arrayY = Math.floor(this.y / squareSize);
      this.index = this.arrayY * arrayDimensions + this.arrayX;
      let headingX = vectorField[this.index].x;
      let headingY = vectorField[this.index].y;
      this.x += headingX;
      this.y += headingY;
    }
    else {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
    }
  }
}

function visualizeArray() {
  for (y = 0; y < arrayDimensions; y++) {
    for (x = 0; x < arrayDimensions; x++) {
      ctx.strokeStyle = '#777';
      ctx.strokeRect(x * squareSize, y * squareSize, squareSize, squareSize);
    }
  }
}

function populateVectorArray() {
  for (i = 0; i < vectorField.length; i++) {
    vectorField[i] = new Vector();
  }
}

function populateParticleArray() {
  for (i = 0; i < maxParticles; i++) {
    particlesArray.push(new Particle);
  }
}

function animate() {
  //ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
    particlesArray[i].draw();
  }
  for (i = 0; i < vectorField.length; i++) {
    vectorField[i].update();
  }
  if (frame % 200 === 0) {
    for (i = 0; i < vectorField.length; i++) {
      vectorField[i].randomize();
    }
  }
  //visualizeArray();
  frame++;
  requestAnimationFrame(animate);
}

function init() {
  populateVectorArray();
  populateParticleArray();
  animate();
}

init();
