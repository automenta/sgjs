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
  }

  setup() {
    this.setupEventListeners();
    this.setupScene();
    this.startRenderingLoop();
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
  }

  setupScene() {
    // Create a group node
    const groupNode = new GroupNode('group1', 'group', {
      position: [100, 100],
    });
  
    // Create a widget node
    const widgetNode = new WidgetNode('widget1', 'widget', {
      position: [150, 150],
      size: [100, 50],
      color: [0, 0, 0, 1],
    });
  
    // Create a text node
    const textNode = new TextNode('text1', 'text', {
      position: [250, 250],
      text: 'Hello, World!',
      font: '24px Arial',
      color: [0, 0, 0, 1],
    });
  
    // Create a shape node
    const shapeNode = new ShapeNode('shape1', 'shape', {
      position: [350, 350],
      size: [50, 50],
      shape: 'circle',
      color: [1, 0, 0, 1],
    });
  
    // Create a button node
    const buttonNode = new ButtonNode('button1', 'button', {
      position: [450, 450],
      size: [100, 50],
      label: 'Click Me',
      color: [0, 0, 1, 1],
      onClick: () => {
        alert('Button clicked!');
      },
    });
  
    // Create a slider node
    const sliderNode = new SliderNode('slider1', 'slider', {
      position: [550, 550],
      size: [150, 20],
      value: 50,
      min: 0,
      max: 100,
      color: [0, 1, 0, 1],
    });
  
    // Create a label node
    const labelNode = new LabelNode('label1', 'label', {
      position: [650, 650],
      size: [100, 50],
      text: 'Slider Value',
      color: [0, 0, 0, 1],
    });
  
    // Create an edge node
    const edgeNode = new EdgeNode('edge1', 'edge', {
      source: sliderNode,
      target: labelNode,
      color: [0, 0, 0, 1],
    });
  
    // Add nodes to the scene
    this.scene.addNode(groupNode);
    this.scene.addNode(widgetNode);
    this.scene.addNode(textNode);
    this.scene.addNode(shapeNode);
    this.scene.addNode(buttonNode);
    this.scene.addNode(sliderNode);
    this.scene.addNode(labelNode);
    this.scene.addNode(edgeNode);
  
    // Add children to the group node
    groupNode.addChild(widgetNode);
    groupNode.addChild(textNode);
  }

  startRenderingLoop() {
    function render() {
      this.sceneController.update();
      requestAnimationFrame(render);
    }
    render();
  }
}

export default NodeEditor;
