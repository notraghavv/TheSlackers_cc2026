let deadMap, aliveMap;
let isAlive = false;
let activeArea = null;
let phase = 0;
let uiIndex = 0;
let currentMusic = null;

// ── Area images ───────────────────────────────────────
let areaImages = {};

let areaContent = {
  A1: [
    { label: "Indore – Food capital",     img: "indore"      },
    { label: "Ujjain – Spiritual hub",    img: "ujjain"      },
    { label: "Mandu – Historic forts",    img: "mandu"       }
  ],
  A2: [
    { label: "Pench – Tiger reserve",     img: "pench"       },
    { label: "Kanha – Dense forests",     img: "kanha"       },
    { label: "Amarkantak – River origin", img: "amarkantak"  }
  ],
  A3: [
    { label: "Jabalpur – Marble rocks",   img: "jabalpur"    },
    { label: "Bandhavgarh – Wildlife",    img: "bandhavgarh" },
    { label: "Pachmarhi – Hills",         img: "panchmarhi"  }
  ],
  A4: [
    { label: "Gwalior – Fort city",       img: "gwalior"     },
    { label: "Orchha – Heritage temples", img: "orcha"       },
    { label: "Bhopal – Capital City",     img: "bhopal"      }
  ]
};

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
  { name: 'WEST MP',  key: 'A1', x: 200, y: 320, clicks: 0, alive: false, music: 'WEST.mpeg'   },
  { name: 'SOUTH MP', key: 'A2', x: 420, y: 420, clicks: 0, alive: false, music: 'NORMAL.mpeg' },
  { name: 'EAST MP',  key: 'A3', x: 550, y: 320, clicks: 0, alive: false, music: 'NORMAL.mpeg' },
  { name: 'NORTH MP', key: 'A4', x: 350, y: 150, clicks: 0, alive: false, music: 'NORTH.mpeg'  }
];

// ─────────────────────────────────────────────────────
function preload() {
  deadMap  = loadImage('assets/mp_dead.png');
  aliveMap = loadImage('assets/mp_alive.png');

  let allKeys = [
    'indore','ujjain','mandu','pench','kanha','amarkantak',
    'jabalpur','bandhavgarh','panchmarhi','gwalior','orcha','bhopal'
  ];
  for (let k of allKeys) {
    areaImages[k] = loadImage('assets/' + k + '.png');
  }
}

function setup() {
  createCanvas(800, 520);
  imageMode(CORNER);
}

// ─────────────────────────────────────────────────────
function draw() {
  if (phase <= 2) {
    drawStory(phase);
    return;
  }

  if (activeArea) {
    drawAreaUI(activeArea);
    return;
  }

  // ── Map screen ──────────────────────────────────────
  background(10);
  imageMode(CENTER);
  let imgW = width * 0.8;
  let imgH = (deadMap.height / deadMap.width) * imgW;

  if (isAlive) {
    image(aliveMap, width / 2, height / 2, imgW, imgH);
  } else {
    image(deadMap,  width / 2, height / 2, imgW, imgH);
  }
  imageMode(CORNER);

  for (let a of areas) drawArea(a);
}

// ── Hotspot dot ───────────────────────────────────────
function drawArea(a) {
  if (a.alive) {
    noStroke();
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

// ── Story slides ──────────────────────────────────────
function drawStory(idx) {
  background(10, 10, 15);
  let s = storySlides[idx];

  push();
  textAlign(CENTER, CENTER);
  noStroke();

  if (s.title) {
    fill(255);
    textSize(48);
    textStyle(BOLD);
    text(s.title, width / 2, height / 2 - 30);

    fill(170, 160, 145);
    textSize(24);
    textStyle(NORMAL);
    text(s.sub, width / 2, height / 2 + 30);
  } else {
    fill(210, 205, 195);
    textSize(18);
    textStyle(NORMAL);
    let startY = height / 2 - ((s.body.length - 1) * 30) / 2;
    for (let i = 0; i < s.body.length; i++) {
      text(s.body[i], width / 2, startY + i * 30);
    }
  }

  // pulsing hint
  let pulse = map(sin(frameCount * 0.05), -1, 1, 120, 220);
  fill(pulse);
  textSize(13);
  textStyle(NORMAL);
  text('Click anywhere to continue  →', width / 2, height - 38);
  pop();
}

// ── Area popup ────────────────────────────────────────
function drawAreaUI(area) {
  background(10, 10, 15);

  let slides = areaContent[area.key] || [];
  let total  = slides.length;
  let slide  = slides[uiIndex];

  push();
  noStroke();

  // ── Header ────────────────────────────────────────
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(26);
  textStyle(BOLD);
  text(area.name, width / 2, 46);

  stroke(55);
  strokeWeight(1);
  line(width / 2 - 180, 68, width / 2 + 180, 68);
  noStroke();

  // ── Image box ─────────────────────────────────────
  let boxW = 420, boxH = 230;
  let boxX = (width - boxW) / 2;
  let boxY = 82;

  let img = areaImages[slide.img];
  if (img && img.width > 0) {
    // cover-fit inside box
    let iRatio = img.width / img.height;
    let bRatio = boxW / boxH;
    let dw, dh;
    if (iRatio > bRatio) { dh = boxH; dw = dh * iRatio; }
    else                  { dw = boxW; dh = dw / iRatio; }
    let dx = boxX + (boxW - dw) / 2;
    let dy = boxY + (boxH - dh) / 2;

    drawingContext.save();
    drawingContext.beginPath();
    drawingContext.roundRect(boxX, boxY, boxW, boxH, 8);
    drawingContext.clip();
    image(img, dx, dy, dw, dh);
    drawingContext.restore();
  } else {
    fill(28);
    stroke(70);
    strokeWeight(1);
    rect(boxX, boxY, boxW, boxH, 8);
    noStroke();
    fill(75);
    textSize(13);
    textAlign(CENTER, CENTER);
    text('[ loading image… ]', width / 2, boxY + boxH / 2);
  }

  // border over image
  noFill();
  stroke(50);
  strokeWeight(1);
  rect(boxX, boxY, boxW, boxH, 8);
  noStroke();

  // ── Label ─────────────────────────────────────────
  fill(225);
  textSize(15);
  textStyle(NORMAL);
  textAlign(CENTER, CENTER);
  text(slide.label, width / 2, boxY + boxH + 32);

  // ── Dot indicators ────────────────────────────────
  let dotGap   = 16;
  let dotStart = width / 2 - ((total - 1) * dotGap) / 2;
  for (let i = 0; i < total; i++) {
    fill(i === uiIndex ? 255 : 55);
    noStroke();
    ellipse(dotStart + i * dotGap, boxY + boxH + 56, 7, 7);
  }

  // ── Arrows ────────────────────────────────────────
  let arrowY = boxY + boxH + 32;

  fill(uiIndex > 0 ? 230 : 40);
  textSize(30);
  textStyle(NORMAL);
  text('‹', width / 2 - 120, arrowY);

  fill(uiIndex < total - 1 ? 230 : 40);
  text('›', width / 2 + 120, arrowY);

  // ── Music indicator ───────────────────────────────
  if (currentMusic) {
    fill(80, 200, 120);
    textSize(11);
    textStyle(NORMAL);
    text('♪  playing area music', width / 2, boxY + boxH + 78);
  }

  // ── Close hint ────────────────────────────────────
  fill(75);
  textSize(11);
  textStyle(NORMAL);
  text('press  Q  to close', width / 2, height - 16);
  pop();
}

// ── Input ─────────────────────────────────────────────
function mousePressed() {

  // story: any click advances
  if (phase <= 2) {
    phase = min(phase + 1, 3);
    return;
  }

  // popup arrow clicks
  if (activeArea) {
    let slides = areaContent[activeArea.key] || [];
    let total  = slides.length;
    let boxH   = 230, boxY = 82;
    let arrowY = boxY + boxH + 32;

    if (mouseX > width / 2 - 145 && mouseX < width / 2 - 95 &&
        abs(mouseY - arrowY) < 26) {
      uiIndex = max(0, uiIndex - 1);
    }
    if (mouseX > width / 2 + 95 && mouseX < width / 2 + 145 &&
        abs(mouseY - arrowY) < 26) {
      uiIndex = min(total - 1, uiIndex + 1);
    }
    return;
  }

  // map hotspot clicks
  for (let a of areas) {
    if (dist(mouseX, mouseY, a.x, a.y) < 40) {
      a.clicks++;
      if (a.clicks >= 3) {
        a.alive = true;
        isAlive = areas.every(a => a.alive);

        // ── Play area music ───────────────────────
        if (currentMusic) {
          currentMusic.stop();
          currentMusic = null;
        }
        currentMusic = createAudio('assets/' + a.music);
        currentMusic.play();

        activeArea = a;
        uiIndex    = 0;
      }
    }
  }
}

function keyPressed() {
  if (key === 'q' || key === 'Q') {
    activeArea = null;

    // stop music when closing popup
    if (currentMusic) {
      currentMusic.stop();
      currentMusic = null;
    }
  }
}