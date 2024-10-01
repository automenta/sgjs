import { gl } from '../utils/webgl';

class NodeRenderer {
  constructor() {
    // Create a shader program for rendering nodes
    this.shaderProgram = this.createShaderProgram();
  }

  // Method for creating the shader program
  createShaderProgram() {
    const vertexShader = this.loadShader(gl.VERTEX_SHADER, 'basic.vert');
    const fragmentShader = this.loadShader(gl.FRAGMENT_SHADER, 'basic.frag');

    const shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
      alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
      return null;
    }

    return shaderProgram;
  }

  // Method for loading a shader
  loadShader(type, filename) {
    const shader = gl.createShader(type);
    const source = this.getShaderSource(filename);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }

    return shader;
  }

  // Method for getting the shader source from a file
  getShaderSource(filename) {
    const request = new XMLHttpRequest();
    request.open('GET', `./${filename}`, false);
    request.send();
    return request.responseText;
  }

  // Method for rendering a node
  render(node, camera) {
    // Get the shader program
    const shaderProgram = this.shaderProgram;

    // Use the shader program
    gl.useProgram(shaderProgram);

    // Get the attribute and uniform locations
    const positionLocation = gl.getAttribLocation(shaderProgram, 'a_position');
    const colorLocation = gl.getAttribLocation(shaderProgram, 'a_color');
    const modelViewProjectionLocation = gl.getUniformLocation(shaderProgram, 'u_modelViewProjection');

    // Bind the vertex data
    gl.bindBuffer(gl.ARRAY_BUFFER, node.vertexData.buffer);

    // Set the attribute pointers
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(positionLocation);

    gl.vertexAttribPointer(colorLocation, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(colorLocation);

    // Set the uniform values
    gl.uniformMatrix4fv(modelViewProjectionLocation, false, camera.getViewMatrix());

    // Draw the node
    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }
}

export default NodeRenderer;
