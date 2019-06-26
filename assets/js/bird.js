class Bird {
  constructor(xPos, yPos, width, height) {
    this.xPos      = xPos;
    this.yPos      = yPos;
    this.width     = width;
    this.height    = height;
    this.fallSpeed = 3;
    this.ySpeed    = 0;
    this.scored    = false;   // prevents multiple scoring
    this.frame     = 0;       // sprite animation logic
  }

  draw() {
    context.drawImage(sprites, 360, 81 + (this.frame * 70), 80, 70, this.xPos, this.yPos, this.width, this.height);
  }

  update() {
    this.frame = this.fallSpeed <= 2.5 ? 1 : 0; // fallspeed determines Bird frame selection

    this.fallSpeed += 0.35; // speed grows every time the function is called
    this.yPos += (this.fallSpeed + this.ySpeed); // simulates gravity

    // Axis Aligned Bounding Box
    // https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection

    // Touching on the x axis?
    if (this.xPos + this.width >= obstacleTop.xPos &&
        this.xPos <= obstacleTop.xPos + obstacleTop.width) {
       // Touching on the y axis?
      if (this.yPos + this.height >= obstacleBottom.yPos || this.yPos <= obstacleTop.yPos + obstacleTop.height) {
        endTheGame();
      } else {
        if (!this.scored) {
          score += 1;
          this.scored = true;
        }
      }
    }

    if (this.yPos >= 600) { // Die hitting the ground
      endTheGame();
    }

    if (obstacleTop.xPos >= 360) {
      this.scored = false; // make scoring available once pipe is reset
    }
  }

  moveUp(speed) {
    this.fallSpeed = 4;
    this.ySpeed    = -speed;
  }
}
