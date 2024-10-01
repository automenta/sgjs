import Renderer from '../rendering/Renderer';
import Camera from '../camera/Camera';
import InputManager from '../input/InputManager';
import Scene from '../scene/Scene';
import WidgetNode from '../scene/WidgetNode';
import NodeRenderer from '../rendering/NodeRenderer';
import TextNode from '../scene/TextNode';
import ShapeNode from '../scene/ShapeNode';
import GroupNode from '../scene/GroupNode';

class NodeEditor {
  constructor(canvas) {
    this.canvas = canvas;
    this.renderer = new Renderer(canvas);
    this.camera = new Camera();
    this.inputManager = new InputManager(canvas);
    this.scene = new Scene();

    // Register node renderers
    this.renderer.registerNodeRenderer('widget', new NodeRenderer());
    this.renderer.registerNodeRenderer('text', new NodeRenderer());
    this.renderer.registerNodeRenderer('shape', new NodeRenderer());

    // Set up the rendering loop
    this.render = this.render.bind(this);
    requestAnimationFrame(this.render);

    // Set the camera for the renderer
    this.renderer.setCamera(this.camera);

    // Add event listeners for user input
    this.inputManager.addHandler('pan', (dx, dy) => {
      this.camera.pan(dx, dy);
    });

    this.inputManager.addHandler('zoom', (factor) => {
      this.camera.zoomIn(factor);
    });

    // Add event listeners for node editing
    this.inputManager.addHandler('click', (x, y) => {
      const node = this.scene.getNodeAtPoint(x, y);
      if (node) {
        console.log('Selected node:', node);
        // TODO: Implement node editing UI
      }
    });
  }

  render() {
    // Update the camera's view matrix
    this.camera.updateViewMatrix();

    // Render the scene
    this.renderer.renderScene(this.scene);

    // Request the next frame
    requestAnimationFrame(this.render);
  }

  addNode(node) {
    this.scene.addNode(node);
  }
}

export default NodeEditor;
