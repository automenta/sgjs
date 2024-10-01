import Renderer from '../rendering/Renderer';
import Scene from '../scene/Scene';
import SceneController from './SceneController';
import InputHandler from './InputHandler';

class NodeEditor {
  constructor(canvas) {
    this.canvas = canvas;
    this.renderer = new Renderer(canvas);
    this.scene = new Scene();
    this.sceneController = new SceneController(this.scene, this.renderer);
    this.inputHandler = new InputHandler(canvas);

    // Register node renderers
    this.renderer.registerNodeRenderer('widget', new NodeRenderer());
    this.renderer.registerNodeRenderer('text', new NodeRenderer());
    this.renderer.registerNodeRenderer('shape', new NodeRenderer());

    // Add event listeners for user input
    this.inputHandler.addHandler('pan', (dx, dy) => {
      this.sceneController.camera.pan(dx, dy);
    });

    this.inputHandler.addHandler('zoom', (factor) => {
      this.sceneController.camera.zoomIn(factor);
    });

    // Add event listeners for node editing
    this.inputHandler.addHandler('click', (x, y) => {
      const node = this.scene.getNodeAtPoint(x, y);
      if (node) {
        console.log('Selected node:', node);
        // TODO: Implement node editing UI
      }
    });

    // Handle input events
    this.canvas.addEventListener('mousemove', (event) => {
      this.inputHandler.handleEvent({
        type: 'pan',
        x: event.offsetX,
        y: event.offsetY,
      });
    });

    this.canvas.addEventListener('wheel', (event) => {
      this.inputHandler.handleEvent({
        type: 'zoom',
        deltaY: event.deltaY,
      });
    });

    this.canvas.addEventListener('click', (event) => {
      this.inputHandler.handleEvent({
        type: 'click',
        x: event.offsetX,
        y: event.offsetY,
      });
    });
  }

  addNode(node) {
    this.scene.addNode(node);
  }
}

export default NodeEditor;
