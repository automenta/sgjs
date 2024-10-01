class Camera {
  constructor() {
    this.position = [0, 0];
    this.zoom = 1;
    this.rotation = 0;
  }

  // Methods for panning, zooming, and rotating the camera
  pan(dx, dy) {
    this.position[0] += dx;
    this.position[1] += dy;
  }

  zoomIn(factor) {
    this.zoom *= factor;
  }

  zoomOut(factor) {
    this.zoom /= factor;
  }

  rotate(angle) {
    this.rotation += angle;
  }

  // Method for getting the camera's view matrix
  getViewMatrix() {
    return [
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      -this.position[0], -this.position[1], 0, 1,
    ];
  }

  // Method for getting the camera's projection matrix
  getProjectionMatrix() {
    return [
      this.zoom, 0, 0, 0,
      0, this.zoom, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1,
    ];
  }

  // Method for updating the camera's view matrix
  updateViewMatrix() {
    this.viewMatrix = this.getViewMatrix();
  }
}

export default Camera;
