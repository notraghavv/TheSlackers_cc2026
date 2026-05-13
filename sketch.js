let deadMap, aliveMap;
let isAlive = false;
let activeArea = null;
let phase = 0;
let uiIndex = 0;
let currentMusic;
let areaContent = {
  A1: ["Indore – Food capital", "Ujjain – Spiritual hub", "Mandu – Historic forts"],
  A2: ["Pench – Tiger reserve", "Kanha – Dense forests", "Amarkantak – River origin"],
  A3: ["Jabalpur – Marble rocks", "Bandhavgarh – Wildlife", "Amarkantak – Hills"],
  A4: ["Gwalior – Fort city", "Orchha – Heritage temples", "Shivpuri – Natural beauty"]
};
//



let storySlides = [
  {
    title: 'Madhya Pradesh',
    sub: 'Year 2150',
    body: null
  },
  {
    title: null,
    body: [
      'Tourism has collapsed.',
      'Nature is fading.',
      'Cities are abandoned.',
      'The land that once thrived now lies silent.'
    ]
  },
  {
    title: null,
    body: [
      'But there is still hope.',
      '',
      'Four sacred zones hold the last pulse of life.',
      '',
      'You must revive them.'
    ]
  }
];
let areas = [
  { name: 'WEST MP',  key: 'A1', x: 200, y: 320, clicks: 0, alive: false, music: 'WEST.mpeg' },
  { name: 'SOUTH MP', key: 'A2', x: 420, y: 420, clicks: 0, alive: false, music: 'NORMAL.mpeg' },
  { name: 'EAST MP',  key: 'A3', x: 550, y: 320, clicks: 0, alive: false, music: 'NORMAL.mpeg' },
  { name: 'NORTH MP', key: 'A4', x: 350, y: 150, clicks: 0, alive: false, music: 'NORTH.mpeg' }
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
  if (phase <= 2) {
  drawStory(phase);
  return;
}
  //ui popup
  if (activeArea) {
  drawAreaUI(activeArea);
  return;
}
  ///
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

  // story slides
  if (phase <= 2) {
    phase++;
    if (phase > 3) phase = 3;
    return;
  }

  // UI is open — handle slide navigation only
  if (activeArea) {
    let slides = areaContent[activeArea.key] || [];
    let total = slides.length;

    // Left arrow hit zone
    if (mouseX > width / 2 - 130 && mouseX < width / 2 - 70 &&
        mouseY > 300 && mouseY < 360) {
      uiIndex = max(0, uiIndex - 1);
    }

    // Right arrow hit zone
    if (mouseX > width / 2 + 70 && mouseX < width / 2 + 130 &&
        mouseY > 300 && mouseY < 360) {
      uiIndex = min(total - 1, uiIndex + 1);
    }

    return; // block all map clicks while UI is open
  }

  // Map click — activate area node
  for (let a of areas) {
    if (dist(mouseX, mouseY, a.x, a.y) < 40) {
      a.clicks++;
      if (a.clicks >= 3) {
        a.alive = true;
        isAlive = areas.every(a => a.alive);
        activeArea = a;
        //MUSIC
        if (currentMusic) {
        currentMusic.stop();
    }

        currentMusic = createAudio('assets/' + a.music);
        currentMusic.play();
        //.................
        uiIndex = 0; // reset slide index on open
      }
    }
  }
}

function keyPressed() {
  if (key === 'q' || key === 'Q') {
    activeArea = null;
  }
  if (currentMusic) {
  currentMusic.stop();
}
}

function drawStory(idx) {
  
  background(10, 10, 15);
  let s = storySlides[idx];

  textAlign(CENTER, CENTER);
  fill(255);

  if (s.title) {
    textSize(48);
    text(s.title, width/2, height/2 - 30);

    textSize(24);
    fill(170);
    text(s.sub, width/2, height/2 + 30);
  } else {
    textSize(18);
    let startY = height/2 - 60;

    for (let i = 0; i < s.body.length; i++) {
      text(s.body[i], width/2, startY + i * 30);
    }
  }

textSize(12);
fill(180);
text("Click to continue →", width/2, height - 40);
}

function drawAreaUI(area) {
  background(10, 10, 15);

  let slides = areaContent[area.key] || ["No content yet."];
  let total = slides.length;

  // Area name header
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(28);
  text(area.name, width / 2, 60);

  // Image placeholder box
  let boxW = 400, boxH = 220;
  let boxX = width / 2 - boxW / 2;
  let boxY = 100;
  stroke(100);
  strokeWeight(1);
  fill(30);
  rect(boxX, boxY, boxW, boxH, 8);
  noStroke();
  fill(80);
  textSize(14);
  text("[ image placeholder ]", width / 2, boxY + boxH / 2);

  // Slide content
  fill(220);
  textSize(16);
  text(slides[uiIndex], width / 2, boxY + boxH + 40);

  // Slide counter
  fill(120);
  textSize(12);
  text((uiIndex + 1) + " / " + total, width / 2, boxY + boxH + 65);

  // Left arrow
  fill(uiIndex > 0 ? 255 : 60);
  textSize(28);
  textAlign(CENTER, CENTER);
  text("<", width / 2 - 100, boxY + boxH + 40);

  // Right arrow
  fill(uiIndex < total - 1 ? 255 : 60);
  text(">", width / 2 + 100, boxY + boxH + 40);

  // Close hint
  fill(100);
  textSize(11);
  text("press Q to close", width / 2, height - 20);
}