import { gl } from '../utils/webgl';

class Renderer {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.gl = gl;
    this.programs = {}; // Store shader programs
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    document.body.appendChild(this.canvas);
  }

  // Method for creating a shader program
  createProgram(vertexShaderSource, fragmentShaderSource) {
    const vertexShader = this.loadShader(gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = this.loadShader(gl.FRAGMENT_SHADER, fragmentShaderSource);

    const shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
      console.error('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
      return null;
    }

    return shaderProgram;
  }

  loadShader(type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }

    return shader;
  }

  // Method for rendering a node
  renderNode(node) {
    // Get the appropriate shader program for the node's type
    const program = this.programs[node.type];
    if (!program) {
      // Create the shader program if it doesn't exist
      program = this.createProgram(
        `
        attribute vec2 aVertexPosition;
        attribute vec4 aVertexColor;

        uniform mat4 uModelViewMatrix;
        uniform mat4 uProjectionMatrix;

        varying lowp vec4 vColor;

        void main(void) {
          gl_Position = uProjectionMatrix * uModelViewMatrix * vec4(aVertexPosition, 0.0, 1.0);
          vColor = aVertexColor;
        }
        `,
        `
        varying lowp vec4 vColor;

        void main(void) {
          gl_FragColor = vColor;
        }
        `,
      );
      this.programs[node.type] = program;
    }

    // Set up the shader program and uniforms
    gl.useProgram(program);

    const positionLocation = gl.getAttribLocation(program, 'aVertexPosition');
    const colorLocation = gl.getAttribLocation(program, 'aVertexColor');

    const modelViewMatrixLocation = gl.getUniformLocation(program, 'uModelViewMatrix');
    const projectionMatrixLocation = gl.getUniformLocation(program, 'uProjectionMatrix');

    // Create a buffer for the node's vertices
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    const vertices = [
      -0.5, -0.5,
      0.5, -0.5,
      0.5, 0.5,
      -0.5, 0.5,
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    // Create a buffer for the node's colors
    const colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    const colors = [
      1.0, 0.0, 0.0, 1.0,
      0.0, 1.0, 0.0, 1.0,
      0.0, 0.0, 1.0, 1.0,
      1.0, 1.0, 0.0, 1.0,
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

    // Set up the vertex attributes
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(positionLocation);

    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.vertexAttribPointer(colorLocation, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(colorLocation);

    // Set up the model-view and projection matrices
    gl.uniformMatrix4fv(modelViewMatrixLocation, false, node.transform.matrix);
    gl.uniformMatrix4fv(projectionMatrixLocation, false, node.transform.matrix);

    // Draw the node
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
  }

  // Method for rendering the scene graph
  renderScene(scene) {
    // Clear the canvas
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Render each node in the scene graph
    scene.nodes.forEach(node => node.render(this));
  }
}

export default Renderer;
