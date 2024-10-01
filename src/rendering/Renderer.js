import VertexData from '../utils/VertexData';
import TransformMatrix from '../utils/TransformMatrix';
import DataFlowRenderer from './DataFlowRenderer';

class Renderer {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.nodeRenderers = {};
    this.camera = null;
    this.projectionMatrix = null;
    this.vertexData = new VertexData();
    this.transformMatrix = new TransformMatrix();
    this.dataFlowRenderer = new DataFlowRenderer();
    require('../utils/webgl').initWebGL(canvas);
  }

  // ... (rest of the Renderer class)

  renderScene(scene) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    scene.nodes.forEach((node) => {
      const renderer = this.nodeRenderers[node.type];
      if (renderer) {
        renderer.render(node, this.camera);
      }
    });
    this.dataFlowRenderer.render(scene, this.camera);
  }
}

export default Renderer;
