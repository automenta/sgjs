import VertexData from '../utils/VertexData';
import TransformMatrix from '../utils/TransformMatrix';
import DataFlowRenderer from './DataFlowRenderer';
import { calculateFrustumPlanes } from '../utils/frustum';

class Renderer {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    this.nodeRenderers = {};
    this.dataFlowRenderer = new DataFlowRenderer();
    this.camera = new Camera();
    this.zoomTarget = 1;
    this.zoomSpeed = 0.1;
    this.isZooming = false;
  }

  registerNodeRenderer(type, renderer) {
    this.nodeRenderers[type] = renderer;
  }

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
  }

  zoomTo(zoomLevel) {
    this.zoomTarget = zoomLevel;
    this.updateZoom();
  }

  updateZoom() {
    if (this.camera.zoom !== this.zoomTarget) {
      const zoomDelta = this.zoomTarget - this.camera.zoom;
      this.camera.zoom += zoomDelta * this.zoomSpeed;
      this.camera.updateProjectionMatrix();
    }
  }

  getZoom() {
    return this.camera.zoom;
  }
}

export default Renderer;
