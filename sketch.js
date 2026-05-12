let deadMap, aliveMap;
let isAlive = false;

function preload() {
  deadMap = loadImage('assets/mp_dead.png');
  aliveMap = loadImage('assets/mp_alive.png');
}

function setup() {
  createCanvas(800, 520);
  imageMode(CENTER);
}

function draw() {
  background(10);

  let imgW = width * 0.8;
  let imgH = (deadMap.height / deadMap.width) * imgW;

  if (isAlive) {
    image(aliveMap, width / 2, height / 2, imgW, imgH);
  } else {
    image(deadMap, width / 2, height / 2, imgW, imgH);
  }
}

// click → revive
function mousePressed() {
  isAlive = true;
}