import { gl } from '../utils/webgl';
import VertexData from '../utils/VertexData';
import NodeRenderer from './NodeRenderer';
import { calculateFrustumPlanes } from '../utils/frustum';

class Renderer {
  constructor() {
    // ... (existing code) ...
  }

  // ... (existing code) ...

  // Method for rendering the scene graph
  renderScene(scene) {
    // Clear the canvas
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Calculate the frustum planes
    const frustumPlanes = calculateFrustumPlanes(this.camera.getViewMatrix(), this.camera.getProjectionMatrix());

    // Render each node in the scene graph
    scene.nodes.forEach(node => {
      // Check if the node is visible within the frustum
      if (this.isNodeVisible(node, frustumPlanes)) {
        node.render(this);
      }
    });
  }

  // Method for checking if a node is visible within the frustum
  isNodeVisible(node, frustumPlanes) {
    // Perform a simple bounding box test for now
    const boundingBox = node.getBoundingBox();
    for (let i = 0; i < frustumPlanes.length; i++) {
      if (this.isPointOutsidePlane(boundingBox[0], frustumPlanes[i]) &&
          this.isPointOutsidePlane(boundingBox[1], frustumPlanes[i]) &&
          this.isPointOutsidePlane(boundingBox[2], frustumPlanes[i]) &&
          this.isPointOutsidePlane(boundingBox[3], frustumPlanes[i])) {
        return false; // Node is outside the frustum
      }
    }
    return true; // Node is inside the frustum
  }

  // Method for checking if a point is outside a plane
  isPointOutsidePlane(point, plane) {
    // ... (implement plane-point intersection test) ...
  }

  // ... (existing code) ...
}

export default Renderer;
