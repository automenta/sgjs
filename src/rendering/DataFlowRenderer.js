import { gl } from '../utils/webgl';

class DataFlowRenderer {
  constructor() {
    // Create a shader program for rendering data flow arrows
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

  // Method for rendering data flow arrows
  render(scene, camera) {
    // Get the shader program
    const shaderProgram = this.shaderProgram;

    // Use the shader program
    gl.useProgram(shaderProgram);

    // Get the attribute and uniform locations
    const positionLocation = gl.getAttribLocation(shaderProgram, 'a_position');
    const colorLocation = gl.getAttribLocation(shaderProgram, 'a_color');
    const modelViewProjectionLocation = gl.getUniformLocation(shaderProgram, 'u_modelViewProjection');

    // Iterate through each node in the scene
    scene.nodes.forEach((node) => {
      // Iterate through each output of the node
      for (const outputName in node.outputs) {
        const output = node.outputs[outputName];
        // Iterate through each connection to the output
        output.connections.forEach((connection) => {
          // Get the target node of the connection
          const targetNode = connection.targetNode;
          // Get the input of the target node that the connection is connected to
          const targetInput = targetNode.inputs[connection.targetInputName];
          // Calculate the position of the output and input
          const outputPosition = [node.position[0] + node.size[0], node.position[1] + node.size[1] / 2];
          const inputPosition = [targetNode.position[0], targetNode.position[1] + targetNode.size[1] / 2];
          // Create vertex data for the arrow
          const vertexData = this.createArrowVertexData(outputPosition, inputPosition);
          // Bind the vertex data
          gl.bindBuffer(gl.ARRAY_BUFFER, vertexData.buffer);
          // Set the attribute pointers
          gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
          gl.enableVertexAttribArray(positionLocation);
          gl.vertexAttribPointer(colorLocation, 4, gl.FLOAT, false, 0, 0);
          gl.enableVertexAttribArray(colorLocation);
          // Set the uniform values
          gl.uniform4fv(colorLocation, vertexData.color);
          gl.uniformMatrix4fv(modelViewProjectionLocation, false, camera.getViewMatrix());
          // Draw the arrow
          gl.drawArrays(gl.TRIANGLES, 0, 6);
        });
      }
    });
  }

  // Method for creating arrow vertex data
  createArrowVertexData(start, end) {
    // Calculate the direction vector of the arrow
    const direction = [end[0] - start[0], end[1] - start[1]];
    // Normalize the direction vector
    const length = Math.sqrt(direction[0] * direction[0] + direction[1] * direction[1]);
    const normalizedDirection = [direction[0] / length, direction[1] / length];
    // Calculate the perpendicular vector
    const perpendicular = [-normalizedDirection[1], normalizedDirection[0]];
    // Calculate the arrowhead points
    const arrowheadLength = 10;
    const arrowheadWidth = 5;
    const arrowheadPoint1 = [end[0] - arrowheadLength * normalizedDirection[0] - arrowheadWidth * perpendicular[0], end[1] - arrowheadLength * normalizedDirection[1] - arrowheadWidth * perpendicular[1]];
    const arrowheadPoint2 = [end[0] - arrowheadLength * normalizedDirection[0] + arrowheadWidth * perpendicular[0], end[1] - arrowheadLength * normalizedDirection[1] + arrowheadWidth * perpendicular[1]];
    // Create the vertex data
    const vertices = [
      start[0], start[1],
      end[0], end[1],
      arrowheadPoint1[0], arrowheadPoint1[1],
      end[0], end[1],
      arrowheadPoint2[0], arrowheadPoint2[1],
      arrowheadPoint1[0], arrowheadPoint1[1],
    ];
    return new VertexData(vertices, [0, 0, 0, 1]);
  }
}

export default DataFlowRenderer;
