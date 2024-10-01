// Import necessary modules
import { gl } from '../utils/webgl';
import Renderer from '../rendering/Renderer';
import Camera from '../camera/Camera';
import InputManager from '../input/InputManager';
import Scene from '../scene/Scene';
import WidgetNode from '../scene/WidgetNode';
import NodeRenderer from '../rendering/NodeRenderer';
import TextNode from '../scene/TextNode';
import ShapeNode from '../scene/ShapeNode';
import GroupNode from '../scene/GroupNode';
import ButtonNode from '../scene/ButtonNode';
import ButtonNodeRenderer from '../rendering/ButtonNodeRenderer';
import SliderNode from '../scene/SliderNode';
import SliderNodeRenderer from '../rendering/SliderNodeRenderer';
import LabelNode from '../scene/LabelNode';
import LabelNodeRenderer from '../rendering/LabelNodeRenderer';
import EdgeNode from '../scene/EdgeNode';
import EdgeRenderer from '../rendering/EdgeRenderer';
import ContainerNode from '../scene/ContainerNode';
import RectangleNodeRenderer from '../rendering/RectangleNodeRenderer';
import DataFlowNode from '../scene/DataFlowNode';
import DataFlowRenderer from '../rendering/DataFlowRenderer';
import SceneController from './SceneController';
import InputHandler from './InputHandler';
import NodeEditorUI from './NodeEditorUI';
import NodeEditor from './NodeEditor';
import defaultTheme from '../themes/default';

// Create a new scene
const scene = new Scene();

// Create a canvas element
const canvas = document.getElementById('canvas');

// Create a renderer
const renderer = new Renderer(canvas);

// Create a camera
const camera = new Camera();

// Create an input manager
const inputManager = new InputManager(canvas);

// Create a scene controller
const sceneController = new SceneController(scene, renderer);

// Create a node editor
const nodeEditor = new NodeEditor(canvas);

// Create a node editor UI
const nodeEditorUI = new NodeEditorUI(nodeEditor);

// Load the theme
const theme = defaultTheme;

// Apply the theme to the canvas
renderer.canvas.style.backgroundColor = theme.backgroundColor;

// Register node renderers
renderer.registerNodeRenderer('widget', new NodeRenderer());
renderer.registerNodeRenderer('text', new NodeRenderer());
renderer.registerNodeRenderer('shape', new NodeRenderer());
renderer.registerNodeRenderer('group', new NodeRenderer());
renderer.registerNodeRenderer('button', new ButtonNodeRenderer());
renderer.registerNodeRenderer('slider', new SliderNodeRenderer());
renderer.registerNodeRenderer('label', new LabelNodeRenderer());
renderer.registerNodeRenderer('edge', new EdgeRenderer());
renderer.registerNodeRenderer('container', new RectangleNodeRenderer());
renderer.registerNodeRenderer('data-flow', new DataFlowRenderer());

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
scene.addNode(groupNode);
scene.addNode(widgetNode);
scene.addNode(textNode);
scene.addNode(shapeNode);
scene.addNode(buttonNode);
scene.addNode(sliderNode);
scene.addNode(labelNode);
scene.addNode(edgeNode);

// Add children to the group node
groupNode.addChild(widgetNode);
groupNode.addChild(textNode);

// Set up the rendering loop
function render() {
  // Update the camera's view matrix
  camera.updateViewMatrix();

  // Render the scene
  renderer.renderScene(scene);

  // Request the next frame
  requestAnimationFrame(render);
}

// Start the rendering loop
render();

// Add event listeners for user input
inputManager.addHandler('pan', (dx, dy) => {
  camera.pan(dx, dy);
});
inputManager.addHandler('zoomIn', (factor) => {
  camera.zoom(factor);
});
inputManager.addHandler('zoomOut', (factor) => {
  camera.zoom(1 / factor);
});

// Add event listeners for node editing
canvas.addEventListener('mousedown', (event) => {
  const node = scene.getNodeAtPoint(event.offsetX, event.offsetY);
  if (node) {
    nodeEditorUI.handleNodeSelection(node);
  } else {
    nodeEditorUI.handleNodeDeselection();
  }
});

// Set up the node editor
nodeEditor.setupEventListeners();
