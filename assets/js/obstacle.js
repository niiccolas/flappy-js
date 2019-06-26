class Obstacle {
  constructor(xPos, yPos, width, height, speed) {
    this.xPos    = xPos;
    this.yPos    = yPos;
    this.width   = width;
    this.height  = height;
    this.speed   = speed;
  }

  draw() {
    context.drawImage(sprites, 360, 0, 80, 80, this.xPos, this.yPos, this.width, this.height);
  }

  update() {
    const outOfScreen = this.xPos + this.width <= 0;
    const topObstacle = this.yPos <= 320;

    this.xPos -= this.speed;

    if (outOfScreen) {
      this.xPos = 360; // right outside the right extremity of the canvas

      if (topObstacle) {
        this.yPos = -((Math.random() * (150 - 50)) + 50); // Math.random() * (max - min) + min
      } else {
        this.yPos = 320 + ((Math.random() * (150 - 50)) + 50);
      }
    }
  }
}
