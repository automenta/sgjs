import { gl } from '../utils/webgl';

class RectangleNodeRenderer {
  constructor() {
    // Create a shader program for rendering rectangles
    this.shaderProgram = this.createShaderProgram();
  }

  // Method for creating the shader program
  createShaderProgram() {
    // ... (implement shader program creation logic) ...
  }

  // Method for rendering a rectangle node
  render(node, camera) {
    // Get the shader program
    const shaderProgram = this.shaderProgram;

    // Use the shader program
    gl.useProgram(shaderProgram);

    // Get the attribute and uniform locations
    const positionLocation = gl.getAttribLocation(shaderProgram, 'a_position');
    const colorLocation = gl.getUniformLocation(shaderProgram, 'u_color');
    const modelViewProjectionLocation = gl.getUniformLocation(shaderProgram, 'u_modelViewProjection');

    // Bind the vertex data
    gl.bindBuffer(gl.ARRAY_BUFFER, node.vertexData.buffer);

    // Set the attribute pointers
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(positionLocation);

    // Set the uniform values
    gl.uniform4fv(colorLocation, node.vertexData.color);
    gl.uniformMatrix4fv(modelViewProjectionLocation, false, camera.getViewMatrix());

    // Draw the rectangle
    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }
}

export default RectangleNodeRenderer;
