let mapImg;

function preload() {
  mapImg = loadImage('assets/MP_Map.png');
}

function setup() {
  createCanvas(800, 520);
  imageMode(CENTER);
}

function draw() {
  background(20);

  let imgW = width * 0.9;
  let imgH = (mapImg.height / mapImg.width) * imgW;

  image(mapImg, width / 2, height / 2, imgW, imgH);
}