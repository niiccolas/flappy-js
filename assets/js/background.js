class Background {
  constructor(xPos, yPos, width, height, speed) {
    this.xPos   = xPos;
    this.yPos   = yPos;
    this.width  = width;
    this.height = height;
    this.speed  = speed;
  }

  draw() {
    context.drawImage(sprites, 0, 0, 360, 640, this.xPos, this.yPos, this.width, this.height);
    // context.drawImage(sprites, 0, 0, 360, 640, this.xPos, this.yPos, this.width, this.height);
  }

  update() {
    this.xPos -= this.speed; // Move bg left with a constant speed
    const bgIsOutOfScreen = this.xPos <= -360;

    if (bgIsOutOfScreen) {
      this.xPos = 360; // set Bg to its starting location
    }
  }
}
