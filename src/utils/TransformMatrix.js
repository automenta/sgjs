class TransformMatrix {
  constructor() {
    this.matrix = [
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1,
    ];
    this.position = [0, 0];
    this.rotation = 0;
    this.scale = [1, 1];
  }

  // Methods for setting and getting position, rotation, and scale
  setPosition(x, y) {
    this.position = [x, y];
    this.updateMatrix();
  }

  setRotation(angle) {
    this.rotation = angle;
    this.updateMatrix();
  }

  setScale(x, y) {
    this.scale = [x, y];
    this.updateMatrix();
  }

  // Method for updating the transform matrix
  updateMatrix() {
    const cos = Math.cos(this.rotation);
    const sin = Math.sin(this.rotation);

    this.matrix = [
      this.scale[0] * cos, this.scale[0] * -sin, 0, 0,
      this.scale[1] * sin, this.scale[1] * cos, 0, 0,
      0, 0, 1, 0,
      this.position[0], this.position[1], 0, 1,
    ];
  }
}
