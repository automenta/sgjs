import { gl } from './webgl';

class VertexData {
  constructor(vertices, color) {
    this.vertices = vertices;
    this.color = color;
    this.buffer = this.createBuffer();
  }

  // Method for creating the vertex buffer
  createBuffer() {
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);
    return buffer;
  }

  // Static method for creating rectangle vertex data
  static createRectangle(width, height, color) {
    const vertices = [
      -width / 2, -height / 2,
      width / 2, -height / 2,
      width / 2, height / 2,
      -width / 2, -height / 2,
      width / 2, height / 2,
      -width / 2, height / 2,
    ];
    return new VertexData(vertices, color);
  }

  // Static method for creating line vertex data
  static createLine(start, end, color) {
    const vertices = [
      start[0], start[1],
      end[0], end[1],
    ];
    return new VertexData(vertices, color);
  }
}

export default VertexData;
