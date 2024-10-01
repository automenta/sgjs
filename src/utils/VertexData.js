class VertexData {
  constructor(vertices, colors) {
    this.vertices = vertices;
    this.colors = colors;
  }

  // Method for creating vertex data for a rectangle
  static createRectangle(width, height, color) {
    const vertices = [
      -width / 2, -height / 2,
      width / 2, -height / 2,
      width / 2, height / 2,
      -width / 2, height / 2,
    ];

    const colors = [
      color,
      color,
      color,
      color,
    ];

    return new VertexData(vertices, colors);
  }
}

export default VertexData;
