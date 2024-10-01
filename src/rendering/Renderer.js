import { createProgram, createShader } from '../utils/webgl';
import VertexData from '../utils/VertexData';
import TransformMatrix from '../utils/TransformMatrix';
import { getProjectionMatrix } from '../utils/frustum';

class Renderer {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.nodeRenderers = {};
    this.camera = null;
    this.projectionMatrix = null;
    this.vertexData = new VertexData();
    this.transformMatrix = new TransformMatrix();
  }

  registerNodeRenderer(type, renderer) {
    this.nodeRenderers[type] = renderer;
  }

  setCamera(camera) {
    this.camera = camera;
    this.projectionMatrix = getProjectionMatrix(
      this.canvas.width,
      this.canvas.height,
      camera.zoom,
    );
  }

  renderScene(scene) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    scene.nodes.forEach((node) => {
      const renderer = this.nodeRenderers[node.type];
      if (renderer) {
        renderer.draw(this, node);
      }
    });
  }
}

export default Renderer;
