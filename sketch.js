let deadMap, aliveMap;
let isAlive = false;

let areas = [
  { name: 'A1', x: 300, y: 320, clicks: 0, alive: false },
  { name: 'A2', x: 420, y: 260, clicks: 0, alive: false },
  { name: 'A3', x: 550, y: 320, clicks: 0, alive: false },
  { name: 'A4', x: 420, y: 150, clicks: 0, alive: false }
];

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

   for (let a of areas) {
    drawArea(a);
  }
}


function drawArea(a) {


  if (a.alive) {
    fill(0, 255, 100, 150);
    ellipse(a.x, a.y, 50);
  }

  stroke(255, 120, 50);
  noFill();
  ellipse(a.x, a.y, 32);

  noStroke();
  fill(255, 140, 60);
  ellipse(a.x, a.y, 14);

  fill(255);
  textAlign(CENTER);
  textSize(10);
  text(a.name, a.x, a.y + 20);
}
//click to revive
function mousePressed() {
  for (let a of areas) {

    
    if (dist(mouseX, mouseY, a.x, a.y) < 40) {

      a.clicks++;

      if (a.clicks >= 3) {
        a.alive = true;
        isAlive = true;
      }
    }
  }
}
