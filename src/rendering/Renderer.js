import { gl } from '../utils/webgl';
import VertexData from '../utils/VertexData';
import NodeRenderer from './NodeRenderer';

class Renderer {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.gl = gl;
    this.programs = {}; // Store shader programs
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    document.body.appendChild(this.canvas);

    // Create a default shader program for all node types
    this.createDefaultShaderProgram();
  }

  // Method for creating a shader program
  createShaderProgram(vertexShaderSource, fragmentShaderSource) {
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

  // Method for creating the default shader program
  createDefaultShaderProgram() {
    this.programs.default = this.createShaderProgram(
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
    // Get the appropriate node renderer for the node's type
    const nodeRenderer = new NodeRenderer(this.gl, this.programs.default);
    nodeRenderer.render(node);
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
