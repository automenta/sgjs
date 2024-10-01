import Renderer from '../rendering/Renderer';
import Scene from '../scene/Scene';
import SceneController from './SceneController';
import InputHandler from './InputHandler';
import NodeEditorUI from './NodeEditorUI';

class NodeEditor {
  constructor(canvas) {
    this.canvas = canvas;
    this.renderer = new Renderer(canvas);
    this.scene = new Scene();
    this.sceneController = new SceneController(this.scene, this.renderer);
    this.inputHandler = new InputHandler(this.canvas);
    this.nodeEditorUI = new NodeEditorUI(this);
    this.setupEventListeners();
  }

  setupEventListeners() {
    this.nodeEditorUI.setupEventListeners();

    // Panning
    this.inputHandler.addHandler('pan', (dx, dy) => {
      this.renderer.camera.pan(dx, dy);
    });

    // Zooming
    this.inputHandler.addHandler('zoom', (factor) => {
      this.renderer.camera.zoom(factor);
      this.nodeEditorUI.zoomSlider.value = this.renderer.getZoom();
      this.nodeEditorUI.zoomIndicator.textContent = `${Math.round(this.renderer.getZoom() * 100)}%`;
    });

    // Click to select node
    this.inputHandler.addHandler('click', (x, y) => {
      const node = this.scene.getNodeAtPoint(x, y);
      if (node) {
        this.nodeEditorUI.handleNodeSelection(node);
      } else {
        this.nodeEditorUI.handleNodeDeselection();
      }
    });

    // Zoom to selection
    this.inputHandler.addHandler('zoomToSelection', () => {
      const selectedNode = this.nodeEditorUI.selectedNode;
      if (selectedNode) {
        this.renderer.zoomTo(1); // Adjust zoom level as needed
      }
    });

    // Start the rendering loop
    function render() {
      this.sceneController.update();
      requestAnimationFrame(render);
    }
    render();
  }
}

export default NodeEditor;
