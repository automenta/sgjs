import { gl } from '../utils/webgl';
import VertexData from '../utils/VertexData';
import NodeRenderer from './NodeRenderer';
import { calculateFrustumPlanes } from '../utils/frustum';

class Renderer {
  constructor(canvas) {
    this.canvas = canvas;
    this.gl = gl;
    this.camera = null;
    this.nodeRenderers = {};
    this.frustumPlanes = null;

    // Initialize WebGL context
    this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.depthFunc(this.gl.LEQUAL);
  }

  // Method for setting the camera
  setCamera(camera) {
    this.camera = camera;
  }

  // Method for registering a node renderer
  registerNodeRenderer(type, renderer) {
    this.nodeRenderers[type] = renderer;
  }

  // Method for rendering the scene graph
  renderScene(scene) {
    // Clear the canvas
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

    // Calculate the frustum planes
    this.frustumPlanes = calculateFrustumPlanes(this.camera.getViewMatrix(), this.camera.getProjectionMatrix());

    // Render each node in the scene graph
    scene.nodes.forEach(node => {
      // Check if the node is visible within the frustum
      if (this.isNodeVisible(node)) {
        // Get the appropriate node renderer
        const nodeRenderer = this.nodeRenderers[node.type];
        if (nodeRenderer) {
          // Render the node
          nodeRenderer.render(node, this.camera);
        }
      }
    });
  }

  // Method for checking if a node is visible within the frustum
  isNodeVisible(node) {
    // Perform a simple bounding box test for now
    const boundingBox = node.getBoundingBox();
    for (let i = 0; i < this.frustumPlanes.length; i++) {
      if (this.isPointOutsidePlane(boundingBox[0], this.frustumPlanes[i]) &&
          this.isPointOutsidePlane(boundingBox[1], this.frustumPlanes[i]) &&
          this.isPointOutsidePlane(boundingBox[2], this.frustumPlanes[i]) &&
          this.isPointOutsidePlane(boundingBox[3], this.frustumPlanes[i])) {
        return false; // Node is outside the frustum
      }
    }
    return true; // Node is inside the frustum
  }

  // Method for checking if a point is outside a plane
  isPointOutsidePlane(point, plane) {
    // ... (implement plane-point intersection test) ...
  }
}

export default Renderer;
