// MP REVIVE - Hackathon Project

// global variables
let deadMap, aliveMap;
let isAllAlive = false; 
let activeArea = null;
let phase = 0;
let currentMusic = null;
let bgmMusic = null;
// background wave offset
let waveOffset = 0;

// slider ui state
let sliderIndex = 0;
let sliderOffset = 0; 
let sliderTarget = 0;
let cardWidth = 0; 

// images and vehicle tracking
let areaImages = {};
let vehicleFromIndex = 0;
let vehicleToIndex = 0;

// map data content
let areaData = {
  A1: {
    regionFact: 'Gateway of ancient trade routes and the spiritual heartland of the west.',
    slides: [
      { type: 'city',  name: 'Indore',        fact: 'Cleanest city in India 7 years running.',         img: 'indore'   },
      { type: 'place', name: 'Rajwada',        fact: 'A 200-year-old royal palace in the city heart.',  img: 'indore_1' },
      { type: 'place', name: 'Sarafa',         fact: 'Famous night food bazaar, alive after midnight.', img: 'indore_2' },
      { type: 'city',  name: 'Ujjain',         fact: 'One of the 7 sacred cities of Hinduism.',         img: 'ujjain'   },
      { type: 'place', name: 'Mahakaleshwar',  fact: 'One of the 12 Jyotirlingas of Shiva.',            img: 'ujjain_1' },
      { type: 'place', name: 'Kshipra Ghats',  fact: 'Ancient bathing ghats on the Kshipra river.',     img: 'ujjain_2' },
      { type: 'city',  name: 'Mandu',          fact: 'City of Joy — a ruined kingdom on a plateau.',    img: 'mandu'    },
      { type: 'place', name: 'Jahaz Mahal',    fact: 'A palace built like a ship between two lakes.',   img: 'mandu_1'  },
      { type: 'place', name: 'Rani Roopmati',  fact: 'A pavilion of love overlooking the Narmada.',     img: 'mandu_2'  }
    ]
  },
  A2: {
    regionFact: 'The dense southern canopy where forests breathe and mighty rivers are born.',
    slides: [
      { type: 'city',  name: 'Pench',        fact: "Inspiration for Rudyard Kipling's Jungle Book.",  img: 'pench'        },
      { type: 'place', name: 'Tiger Trail',  fact: 'Home to over 50 Bengal tigers in the wild.',      img: 'pench_1'      },
      { type: 'place', name: 'Pench River',  fact: 'The river splits the forest into two worlds.',    img: 'pench_2'      },
      { type: 'city',  name: 'Kanha',        fact: 'Largest national park in Central India.',         img: 'kanha'        },
      { type: 'place', name: 'Barasingha',   fact: 'Kanha saved the swamp deer from extinction.',     img: 'kanha_1'      },
      { type: 'place', name: 'Bamni Dadar',  fact: 'Sunset point — animals gather at dusk here.',     img: 'kanha_2'      },
      { type: 'city',  name: 'Amarkantak',   fact: 'Origin of the sacred Narmada and Son rivers.',    img: 'amarkantak'   },
      { type: 'place', name: 'Narmada Kund', fact: 'The sacred spring where the river begins.',       img: 'amarkantak_1' },
      { type: 'place', name: 'Kapildhara',   fact: 'A 100ft waterfall deep in the forest.',           img: 'amarkantak_2' }
    ]
  },
  A3: {
    regionFact: 'The eastern wilds, defined by white marble gorges, mist, and ancient wilderness.',
    slides: [
      { type: 'city',  name: 'Jabalpur',        fact: 'City of marble rocks and the Narmada gorge.',        img: 'jabalpur'      },
      { type: 'place', name: 'Bhedaghat',        fact: '100ft white marble cliffs on either side of river.', img: 'jabalpur_1'    },
      { type: 'place', name: 'Dhuandhar Falls',  fact: 'Narmada disappears into smoke-like mist here.',     img: 'jabalpur_2'    },
      { type: 'city',  name: 'Bandhavgarh',      fact: 'Highest density of Bengal tigers on Earth.',        img: 'bandhavgarh'   },
      { type: 'place', name: 'White Tiger',       fact: 'First white tiger was captured here in 1951.',      img: 'bandhavgarh_1' },
      { type: 'place', name: 'Bandhavgarh Fort',  fact: 'A 2000-year-old fort inside the jungle.',          img: 'bandhavgarh_2' },
      { type: 'city',  name: 'Pachmarhi',         fact: 'Only hill station in MP — the Queen of Satpura.',   img: 'panchmarhi'    },
      { type: 'place', name: 'Bee Falls',          fact: 'A cascading waterfall surrounded by dense forest.', img: 'panchmarhi_1' },
      { type: 'place', name: 'Pandava Caves',      fact: 'Ancient rock shelters used by the Pandavas.',      img: 'panchmarhi_2'  }
    ]
  },
  A4: {
    regionFact: 'The northern plains—home to impregnable forts, temples, and the seat of ancient empires.',
    slides: [
      { type: 'city',  name: 'Gwalior',         fact: 'The pearl of the cities of Hind — Babur.',             img: 'gwalior'   },
      { type: 'place', name: 'Gwalior Fort',     fact: 'One of the most impregnable forts in India.',          img: 'gwalior_1' },
      { type: 'place', name: 'Jai Vilas',        fact: 'A palace with a dining table for 100 guests.',         img: 'gwalior_2' },
      { type: 'city',  name: 'Orchha',           fact: 'A forgotten Mughal-era capital on the Betwa river.',   img: 'orcha'     },
      { type: 'place', name: 'Ram Raja Temple',  fact: 'Only temple in India where Ram is worshipped as king.', img: 'orcha_1'  },
      { type: 'place', name: 'Orchha Fort',      fact: 'A palace-complex still echoing royal footsteps.',      img: 'orcha_2'   },
      { type: 'city',  name: 'Bhopal',           fact: 'City of Lakes — capital of Madhya Pradesh.',           img: 'bhopal'    },
      { type: 'place', name: 'Upper Lake',        fact: 'One of the oldest man-made lakes in India.',          img: 'bhopal_1'  },
      { type: 'place', name: 'Bhojpur Temple',   fact: 'An unfinished Shiva temple with a 7.5ft lingam.',      img: 'bhopal_2'  }
    ]
  }
};

// intro text
let storySlides = [
  { title: 'Madhya Pradesh', sub: 'Year 2150', body: null },
  { title: null, body: ['Tourism has collapsed.', 'Nature is fading.', 'Cities are abandoned.', 'The land that once thrived now lies silent.'] },
  { title: null, body: ['But there is still hope.', '', 'Four sacred zones hold the last pulse of life.', '', 'You must revive them.'] },
  { title: 'SYSTEM BOOT // MISSION', body: ['Locate the holographic scanning nodes on the map.', 'CLICK AND HOLD to hack the firewalls and restore the pulse.', '', 'Once revived, classified data logs will be unlocked.', 'The history of MP will be yours to explore.'] }
];

// map zones
let areas = [
  { name: 'WEST MP',  key: 'A1', xPercent: 0.18, yPercent: 0.60, hackProgress: 0, isAlive: false, music: 'NORMAL.mpeg'   },
  { name: 'SOUTH MP', key: 'A2', xPercent: 0.55, yPercent: 0.82, hackProgress: 0, isAlive: false, music: 'NORMAL.mpeg' },
  { name: 'EAST MP',  key: 'A3', xPercent: 0.76, yPercent: 0.58, hackProgress: 0, isAlive: false, music: 'NORMAL.mpeg' },
  { name: 'NORTH MP', key: 'A4', xPercent: 0.42, yPercent: 0.25, hackProgress: 0, isAlive: false, music: 'NORMAL.mpeg'  }
];

// load stuff before starting
function preload() {
  deadMap  = loadImage('assets/mp_dead.png');
  aliveMap = loadImage('assets/mp_alive.png');

  let allKeys = [
    'indore',   'indore_1',   'indore_2',
    'ujjain',   'ujjain_1',   'ujjain_2',
    'mandu',    'mandu_1',    'mandu_2',
    'pench',    'pench_1',    'pench_2',
    'kanha',    'kanha_1',    'kanha_2',
    'amarkantak', 'amarkantak_1', 'amarkantak_2',
    'jabalpur', 'jabalpur_1', 'jabalpur_2',
    'bandhavgarh', 'bandhavgarh_1', 'bandhavgarh_2',
    'panchmarhi',  'panchmarhi_1',  'panchmarhi_2',
    'gwalior',  'gwalior_1',  'gwalior_2',
    'orcha',    'orcha_1',    'orcha_2',
    'bhopal',   'bhopal_1',   'bhopal_2'
  ];
  for (let i = 0; i < allKeys.length; i++) {
    let k = allKeys[i];
    areaImages[k] = loadImage('assets/' + k + '.png');
  }
}

// init canvas
function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(60); 
  imageMode(CORNER);
  recalculateCardWidth();
}

// handle screen resize
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  recalculateCardWidth();
  if (activeArea != null) { 
    sliderTarget = sliderIndex * cardWidth; 
    sliderOffset = sliderTarget; 
  }
}

// ui math helpers
function recalculateCardWidth() { 
  cardWidth = getCardBoxWidth() + 40; 
}

function getCardBoxWidth() { 
  return min(width * 0.80, 750); 
}

function getCardBoxHeight() { 
  return min(height * 0.55, 450); 
}

function getCardBoxX() { 
  return (width  - getCardBoxWidth()) / 2; 
}

function getCardBoxY() { 
  return 100; 
}

// calc map position
function getMapTransform() {
  let aspect = deadMap.width / deadMap.height;
  let mapWidth = width * 0.85;
  let mapHeight = mapWidth / aspect;
  
  if (mapHeight > height * 0.85) { 
    mapHeight = height * 0.85; 
    mapWidth = mapHeight * aspect; 
  }
  return { 
    w: mapWidth, 
    h: mapHeight, 
    x: (width - mapWidth) / 2, 
    y: (height - mapHeight) / 2 
  };
}

// find node location
function getAreaPos(area) {
  let transform = getMapTransform();
  return { 
    x: transform.x + area.xPercent * transform.w, 
    y: transform.y + area.yPercent * transform.h 
  };
}

// main loop
function draw() {
  cursor('default');

  // stop and show popup if area is clicked
  if (activeArea != null) { 
    drawAreaUI(activeArea); 
    return; 
  }

  // story screens
  if (phase === 0) { 
    cursor('pointer'); 
    drawTitleScreen(); 
    return; 
  }
  if (phase === 3) { 
    cursor('pointer'); 
    drawMissionBriefing(); 
    return; 
  }

  // draw main map
  background(10, 10, 14);
  
  if (phase >= 4) {
    drawAmbientGridAndParticles();
  }

  let transform = getMapTransform();
  if (isAllAlive) {
    image(aliveMap, transform.x, transform.y, transform.w, transform.h);
  } else {
    image(deadMap, transform.x, transform.y, transform.w, transform.h);
  }

  // dim screen for text
  if (phase === 1 || phase === 2) {
    cursor('pointer');
    fill(10, 10, 15, 190); 
    rect(0, 0, width, height);
    drawStoryOverlay(phase);
  } else {
    handleHackingLogic();
    drawInteractiveMap();
    drawSideHUD();
  }
}

// hold mouse to hack
function handleHackingLogic() {
  let isHackingAnyone = false;
  let hackSpeed = (deltaTime / 1000) * 60; 

  for (let i = 0; i < areas.length; i++) {
    let area = areas[i];
    let pos = getAreaPos(area);
    
    // make hitbox bigger if done
    let hitRadius = 50;
    if (area.isAlive) {
      hitRadius = 150;
    }

    let distanceToMouse = dist(mouseX, mouseY, pos.x, pos.y);
    let isHovering = (distanceToMouse < hitRadius);

    if (isHovering && mouseIsPressed && area.isAlive == false) {
      isHackingAnyone = true;
      area.hackProgress += 1.2 * hackSpeed; 
      
      // finish hack
      if (area.hackProgress >= 100) {
        area.isAlive = true;
        area.hackProgress = 100;
        
        checkIfAllAlive();
        triggerRevival(area);
      }
    } else {
      // drop progress if let go
      if (area.isAlive == false && area.hackProgress > 0) {
        area.hackProgress -= (2.0 * hackSpeed);
        if (area.hackProgress < 0) {
          area.hackProgress = 0;
        }
      }
    }
  }

  // screen shake
  if (isHackingAnyone) {
    translate(random(-2, 2), random(-2, 2));
  }
}

// check win condition
function checkIfAllAlive() {
  let complete = true;
  for (let i = 0; i < areas.length; i++) {
    if (areas[i].isAlive == false) {
      complete = false;
    }
  }
  isAllAlive = complete;
}

// open popup
function triggerRevival(area) {
  activeArea = area; 
  sliderIndex = 0; 
  sliderOffset = 0; 
  sliderTarget = 0;
  
  // Pause BGM, stop any prior node music
  if (bgmMusic) bgmMusic.pause();
  if (currentMusic) currentMusic.stop();

  currentMusic = createAudio('assets/' + area.music); 
  currentMusic.loop();
  currentMusic.play();
}

// background fx
function drawAmbientGridAndParticles() {
  push();
  
  if (isAllAlive == false) {
    // draw sine waves
    noFill();
    strokeWeight(1);
    waveOffset += 0.02; 
    
    for (let i = 0; i < 5; i++) {
      beginShape();
      stroke(0, 220, 255, 10 + (i * 5)); 
      for (let x = 0; x < width; x += 20) {
        let y = height/2 + sin(x * 0.005 + waveOffset + i) * (50 + i * 20) + cos(x * 0.002 - waveOffset) * 30;
        vertex(x, y);
      }
      endShape();
    }

    // draw grid
    stroke(0, 220, 255, 8); 
    for (let x = 0; x < width; x += 60) line(x, 0, x, height);
    for (let y = 0; y < height; y += 60) line(0, y, width, y);
    
  } else {
    // draw fireflies
    noStroke();
    let time = millis() * 0.001;
    for (let i = 0; i < 30; i++) {
        let x = noise(i, time) * width;
        let y = noise(i + 100, time * 0.8) * height;
        let alpha = noise(i + 200, time * 2) * 200;
        fill(100, 255, 150, alpha);
        ellipse(x, y, 3, 3);
    }
  }
  pop();
}

// stats on side
function drawSideHUD() {
  let aliveCount = 0;
  for (let i = 0; i < areas.length; i++) {
    if (areas[i].isAlive) aliveCount++;
  }

  push();
  textAlign(LEFT, TOP); 
  noStroke();
  
  // top left
  if (isAllAlive) {
    fill(0, 255, 100);
    textSize(14); textStyle(BOLD); 
    text("SYSTEM // RESTORED", 40, 40);
  } else {
    fill(0, 220, 255);
    textSize(14); textStyle(BOLD); 
    text("SYS.DIAG // 0x4A", 40, 40);
  }

  fill(170, 180, 190); 
  textSize(12); textStyle(NORMAL); textLeading(22);
  
  let leftData = "";
  if (isAllAlive) {
    leftData = "ENVIRONMENT : PURIFIED\nECOSYSTEM : THRIVING\nTOURISM : ACTIVE";
  } else {
    let toxicity = map(aliveCount, 0, 4, 98.4, 0).toFixed(1);
    let pulse = map(aliveCount, 0, 4, 20, 72).toFixed(0);
    let lifeStatus = (aliveCount === 0) ? 'CRITICAL LOW' : 'STABLE';
    leftData = `ATMOS TOXICITY : ${toxicity}%\nPLANETARY PULSE : ${pulse} BPM\nLIFESIGNS DETECT : ${lifeStatus}`;
  }
  text(leftData, 40, 65);

  // top right
  textAlign(RIGHT, TOP);
  fill(255); textSize(28); textStyle(BOLD); 
  text("MADHYA PRADESH", width - 40, 36);
  
  if (isAllAlive) {
    fill(0, 255, 100); 
  } else {
    fill(0, 220, 255);
  }
  
  textSize(16); textStyle(BOLD);
  text(isAllAlive ? "PRESENT DAY" : "YEAR 2150", width - 40, 68);
  
  fill(170, 180, 190); textSize(12); textStyle(NORMAL);
  text(isAllAlive ? "MISSION ACCOMPLISHED" : `REVIVAL PROTOCOL : ${aliveCount} / 4 ZONES SECURED`, width - 40, 95);
  pop();
}

// start screen
function drawTitleScreen() {
  background(5, 6, 8); 
  push(); 
  textAlign(CENTER, CENTER); textFont('Arial');
  
  drawingContext.shadowBlur = 30; 
  drawingContext.shadowColor = 'rgba(0, 220, 255, 0.5)';
  
  fill(255); textSize(56); textStyle(BOLD); drawingContext.letterSpacing = "12px"; 
  text(storySlides[0].title.toUpperCase(), width / 2, height / 2 - 30);
  
  drawingContext.shadowBlur = 20; fill(0, 220, 255); textSize(20); textStyle(NORMAL); drawingContext.letterSpacing = "8px"; 
  text(storySlides[0].sub.toUpperCase(), width / 2, height / 2 + 40);
  
  drawingContext.shadowBlur = 0; 
  fill(0, 220, 255, map(sin(frameCount * 0.05), -1, 1, 100, 255)); 
  textSize(12); drawingContext.letterSpacing = "4px"; 
  text("CLICK ANYWHERE TO BEGIN", width / 2, height - 60); 
  pop();
}

// text slide
function drawStoryOverlay(index) {
  let slide = storySlides[index]; 
  push(); 
  
  fill(5, 8, 12, 220); rect(0, 0, width, height); 
  textAlign(CENTER, CENTER); textFont('Arial');
  
  drawingContext.shadowBlur = 15; drawingContext.shadowColor = 'rgba(0, 0, 0, 0.9)'; 
  fill(210, 230, 240); textSize(22); textStyle(NORMAL); drawingContext.letterSpacing = "4px";
  
  let startY = height / 2 - ((slide.body.length - 1) * 50) / 2;
  for (let i = 0; i < slide.body.length; i++) {
    text(slide.body[i].toUpperCase(), width / 2, startY + i * 50);
  }
  
  drawingContext.shadowBlur = 0; 
  fill(0, 220, 255, map(sin(frameCount * 0.05), -1, 1, 100, 255)); 
  textSize(12); drawingContext.letterSpacing = "4px"; 
  text("CLICK ANYWHERE TO CONTINUE", width / 2, height - 60); 
  pop();
}

// mission objective
function drawMissionBriefing() {
  background(5, 6, 8); 
  let slide = storySlides[3]; 
  push(); 
  textAlign(CENTER, CENTER); textFont('Arial');
  
  drawingContext.shadowBlur = 30; drawingContext.shadowColor = 'rgba(0, 220, 255, 0.7)'; 
  fill(0, 220, 255); textSize(36); textStyle(BOLD); drawingContext.letterSpacing = "8px"; 
  text(slide.title.toUpperCase(), width / 2, height / 2 - 120);
  
  drawingContext.shadowBlur = 10; drawingContext.shadowColor = 'black'; 
  fill(180, 200, 210); textSize(18); textStyle(NORMAL); drawingContext.letterSpacing = "3px";
  
  let startY = height / 2 - 30; 
  for (let i = 0; i < slide.body.length; i++) {
    text(slide.body[i].toUpperCase(), width / 2, startY + i * 45);
  }
  
  drawingContext.shadowBlur = 0; 
  fill(0, 220, 255, map(sin(frameCount * 0.05), -1, 1, 100, 255)); 
  textSize(12); drawingContext.letterSpacing = "4px"; 
  text("CLICK TO INITIALIZE SCANNER", width / 2, height - 60); 
  pop();
}

// map nodes loop
function drawInteractiveMap() {
  let hoveredArea = null; 
  let isHovering = false;
  
  for (let i = 0; i < areas.length; i++) {
    let area = areas[i];
    drawArea(area); 
    
    let pos = getAreaPos(area);
    let hitRadius = area.isAlive ? 150 : 50;
    
    if (dist(mouseX, mouseY, pos.x, pos.y) < hitRadius) { 
      hoveredArea = area; 
      isHovering = true; 
    }
  }
  
  if (isHovering) cursor('pointer');
  if (hoveredArea && hoveredArea.isAlive == false && hoveredArea.hackProgress === 0) {
    drawMapTooltip(hoveredArea);
  }
}

// small info box
function drawMapTooltip(area) {
  let pos = getAreaPos(area); 
  push(); 
  
  let boxWidth = 220;
  let boxHeight = 65;
  let textX = pos.x + 45;
  let textY = pos.y - boxHeight / 2;
  
  // keep on screen
  if (textX + boxWidth > width) {
    textX = pos.x - boxWidth - 45;
  }
  
  stroke(color(0, 220, 255, 150)); strokeWeight(1); 
  line(pos.x, pos.y, textX > pos.x ? textX : textX + boxWidth, pos.y);
  
  fill(12, 14, 18, 240); stroke(color(0, 220, 255, 80)); 
  rect(textX, textY, boxWidth, boxHeight, 6);
  
  noStroke(); fill(255); textAlign(LEFT, TOP); textSize(12); textStyle(BOLD); 
  text(`TARGET: ${area.name}`, textX + 16, textY + 14);
  
  fill(0, 255, 100); textSize(11); textStyle(NORMAL); 
  text(`ACTION: HOLD CLICK TO HACK`, textX + 16, textY + 36); 
  pop();
}

// draw single node
function drawArea(area) {
  if (area.isAlive) return;
  
  let pos = getAreaPos(area); 
  let ax = pos.x;
  let ay = pos.y; 
  push();
  
  // node shake
  if (area.hackProgress > 0 && area.hackProgress < 100) { 
    ax += random(-2, 2); 
    ay += random(-2, 2); 
  }

  // outer rings
  stroke(0, 220, 255, map(sin(frameCount * 0.08), -1, 1, 20, 70)); 
  strokeWeight(6); noFill(); 
  ellipse(ax, ay, 52);
  
  stroke(0, 220, 255, 40); 
  strokeWeight(3); 
  ellipse(ax, ay, 46);

  // loading ring
  if (area.hackProgress > 0) {
    if (area.hackProgress > 80) {
      stroke(255, 50, 50); 
    } else {
      stroke(0, 255, 100); 
    }
    
    strokeWeight(4);
    let progress = area.hackProgress / 100;
    arc(ax, ay, 46, 46, -HALF_PI, -HALF_PI + (TWO_PI * progress));

    noStroke(); fill(0, 255, 100); textAlign(CENTER, CENTER); textSize(11); textStyle(BOLD);
    text(`${round(area.hackProgress)}%`, ax, ay - 40);
  }

  // inner dot
  noStroke(); fill(0, 220, 255); ellipse(ax, ay, 12);
  fill(10, 15, 20, 220); stroke(0, 220, 255, 80); strokeWeight(1);
  
  let tWidth = textWidth(area.name); 
  rect(ax - tWidth/2 - 10, ay + 26, tWidth + 20, 22, 11);
  
  noStroke(); fill(180, 240, 255); textAlign(CENTER, CENTER); textSize(10); textStyle(BOLD); 
  text(area.name, ax, ay + 37);
  pop();
}

// popup screen layout
function drawAreaUI(area) {
  background(10, 10, 15);
  let data = areaData[area.key];
  let slides = data.slides;
  let totalSlides = slides.length;

  // slide animation
  sliderOffset = lerp(sliderOffset, sliderTarget, 0.13);
  let displayIndex = round(sliderOffset / cardWidth);
  displayIndex = constrain(displayIndex, 0, totalSlides - 1);

  let boxWidth = getCardBoxWidth();
  let boxHeight = getCardBoxHeight();
  let boxX = getCardBoxX();
  let boxY = getCardBoxY();

  push();
  noStroke(); fill(22, 24, 34); rect(0, 0, width, 40);
  fill(160, 200, 255); textAlign(CENTER, CENTER); textSize(12); text(data.regionFact, width / 2, 20);

  fill(255); textSize(24); textStyle(BOLD); text(area.name, width / 2, 60);

  // mask images
  drawingContext.save(); 
  drawingContext.beginPath(); 
  drawingContext.rect(boxX, boxY, boxWidth, boxHeight); 
  drawingContext.clip();
  
  for (let i = 0; i < totalSlides; i++) {
    let slide = slides[i];
    let xOffset = boxX + i * cardWidth - sliderOffset;
    
    // draw if visible
    if (xOffset > boxX - cardWidth && xOffset < boxX + cardWidth * 2) {
      let img = areaImages[slide.img];
      
      if (img && img.width > 0) {
        let iRatio = img.width / img.height;
        let bRatio = boxWidth / boxHeight;
        let drawWidth, drawHeight;
        
        if (iRatio > bRatio) { 
          drawHeight = boxHeight; 
          drawWidth = drawHeight * iRatio; 
        } else { 
          drawWidth = boxWidth; 
          drawHeight = drawWidth / iRatio; 
        }
        image(img, xOffset + (boxWidth - drawWidth) / 2, boxY + (boxHeight - drawHeight) / 2, drawWidth, drawHeight);
      }
      
      drawingContext.save();
      let grad = drawingContext.createLinearGradient(0, boxY + boxHeight - 120, 0, boxY + boxHeight);
      grad.addColorStop(0, 'rgba(0,0,0,0)'); 
      grad.addColorStop(1, 'rgba(0,0,0,0.9)');
      drawingContext.fillStyle = grad; 
      drawingContext.fillRect(xOffset, boxY, boxWidth, boxHeight);
      drawingContext.restore();
      
      if (slide.type === 'city') {
        fill(255, 200, 60);
      } else {
        fill(100, 220, 180);
      }
      
      textSize(11); textStyle(BOLD); textAlign(LEFT, TOP);
      text(slide.type === 'city' ? '🏙 CITY' : '📍 PLACE', xOffset + 15, boxY + 12);
    }
  }
  drawingContext.restore();
  
  noFill(); stroke(55); rect(boxX, boxY, boxWidth, boxHeight, 6);
  
  // text below image
  noStroke(); 
  let currentSlide = slides[displayIndex];
  fill(255); textAlign(CENTER, CENTER); textSize(20); textStyle(BOLD); 
  text(currentSlide.name, width / 2, boxY + boxHeight + 30);
  fill(170, 165, 155); textSize(14); textStyle(NORMAL); 
  text(currentSlide.fact, width / 2, boxY + boxHeight + 55);
  
  drawRoadAndVehicle(slides, totalSlides, boxY + boxHeight + 115, displayIndex);
  
  textFont('Arial');
  fill(65); textAlign(CENTER, CENTER); textSize(11); 
  text('← use arrow keys to travel →   |   press Q to return to map', width / 2, height - 20);
  
  // fake visualizer
  if (currentMusic) { 
    fill(0, 220, 255); 
    let bars = [];
    for(let i=0; i<5; i++){
        bars.push('|'.repeat(floor(map(sin(frameCount*0.1 + i), -1, 1, 2, 8))));
    }
    let visualizer = bars.join(' ');
    text(`[ ${visualizer} ]  PLAYING DECRYPTED AUDIO`, width / 2, height - 40); 
  }
  pop();
}

// bottom slider bar
function drawRoadAndVehicle(slides, total, roadY, displayIndex) {
  let trackWidth = getCardBoxWidth();
  let trackX = (width - trackWidth) / 2;
  
  // road
  fill(38, 36, 30); 
  rect(trackX - 10, roadY - 8, trackWidth + 20, 16, 6);
  stroke(120, 110, 70, 140);
  
  // dashes
  for (let x = trackX; x < trackX + trackWidth; x += 24) { 
    line(x, roadY, x + 14, roadY); 
  }
  noStroke();
  
  // dots
  for (let i = 0; i < total; i++) {
    let tx = trackX + (trackWidth / (total - 1)) * i;
    if (i <= displayIndex) {
      fill(100, 200, 255);
    } else {
      fill(40);
    }
    
    let dotSize = (i === displayIndex) ? 12 : 9;
    ellipse(tx, roadY, dotSize, dotSize);
  }
  
  // moving car
  let vx = trackX;
  if (total > 1) {
    let ratio = sliderOffset / ((total - 1) * cardWidth);
    vx = trackX + trackWidth * constrain(ratio, 0, 1);
  }
  
  // pick emoji
  let emoji = '🚗';
  if (slides[vehicleFromIndex] && slides[vehicleToIndex]) {
      let fromType = slides[vehicleFromIndex].type;
      let toType = slides[vehicleToIndex].type;
      
      if (fromType === 'city' && toType === 'city') {
          emoji = '🚌';
      } else if (fromType === 'city' && toType === 'place') {
          emoji = '🛺';
      }
  }

  textSize(20); 
  text(emoji, vx, roadY - 18 + sin(frameCount * 0.18) * 1.5);
}

// mouse click events
function mousePressed() {
  if (phase < 4) { 
    phase++;
    
    // START BGM when map phase begins
    if (phase === 4 && !bgmMusic) {
      bgmMusic = createAudio('assets/bgm.mpeg');
      bgmMusic.loop();
      bgmMusic.play();
    }
    
    return; 
  }
  if (activeArea != null) return; 

  for (let i = 0; i < areas.length; i++) {
    let area = areas[i];
    let pos = getAreaPos(area);
    if (area.isAlive && dist(mouseX, mouseY, pos.x, pos.y) < 150) {
        triggerRevival(area);
    }
  }
}

// keyboard events
function keyPressed() {
  if (activeArea != null) {
    let total = areaData[activeArea.key].slides.length;
    let prev = sliderIndex;

    // move left/right
    if (keyCode === LEFT_ARROW && sliderIndex > 0) {
      sliderIndex--;
    }
    if (keyCode === RIGHT_ARROW && sliderIndex < total - 1) {
      sliderIndex++;
    }

    if (sliderIndex !== prev) {
      vehicleFromIndex = prev; 
      vehicleToIndex = sliderIndex;
      sliderTarget = sliderIndex * cardWidth;
    }
  }

  // quit to map
 if (key === 'q' || key === 'Q') { 
  activeArea = null; 
  if (currentMusic) { 
    currentMusic.stop(); 
    currentMusic = null; 
  }
  if (bgmMusic) bgmMusic.play(); 
}
}