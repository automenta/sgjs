import VertexData from '../utils/VertexData';
import TransformMatrix from '../utils/TransformMatrix';
import DataFlowRenderer from './DataFlowRenderer';
import { calculateFrustumPlanes } from '../utils/frustum';

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
    this.zoomTarget = 1;
    this.zoomSpeed = 0.1;
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

  setCamera(camera) {
    this.camera = camera;
    this.camera.updateViewMatrix();
    this.camera.updateProjectionMatrix();
  }

  zoomTo(zoomLevel) {
    this.zoomTarget = zoomLevel;
  }

  updateZoom() {
    if (this.camera.zoom !== this.zoomTarget) {
      const zoomDelta = this.zoomTarget - this.camera.zoom;
      this.camera.zoom += zoomDelta * this.zoomSpeed;
      this.camera.updateProjectionMatrix();
    }
  }
}

export default Renderer;
