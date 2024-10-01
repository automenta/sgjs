import Renderer from './rendering/Renderer';
import Camera from './camera/Camera';
import InputManager from './input/InputManager';
import Scene from './scene/Scene';
import WidgetNode from './scene/WidgetNode';
import NodeRenderer from './rendering/NodeRenderer';
import EdgeNode from './scene/EdgeNode';
import EdgeRenderer from './rendering/EdgeRenderer';
import ButtonNode from './scene/ButtonNode';
import ButtonNodeRenderer from './rendering/ButtonNodeRenderer';
import SliderNode from './scene/SliderNode';
import SliderNodeRenderer from './rendering/SliderNodeRenderer';
import LabelNode from './scene/LabelNode';
import LabelNodeRenderer from './rendering/LabelNodeRenderer';

// Create a new scene
const scene = new Scene();

// Create a new renderer
const renderer = new Renderer(document.getElementById('canvas'));

// Create a new camera
const camera = new Camera();

// Create a new input manager
const inputManager = new InputManager(renderer.canvas);

// Create a widget node
const widgetNode1 = new WidgetNode('widget1', 'widget', {
  position: [100, 100],
  color: [1.0, 0.0, 0.0, 1.0],
  size: [50, 50],
});

// Create another widget node
const widgetNode2 = new WidgetNode('widget2', 'widget', {
  position: [200, 200],
  color: [0.0, 1.0, 0.0, 1.0],
  size: [75, 75],
});

// Create a button node
const buttonNode = new ButtonNode('button1', 'button', {
  position: [300, 300],
  color: [0.0, 0.0, 1.0, 1.0],
  label: 'Click Me',
});

// Create a slider node
const sliderNode = new SliderNode('slider1', 'slider', {
  position: [400, 400],
  color: [0.5, 0.5, 0.5, 1.0],
  value: 50,
  min: 0,
  max: 100,
});

// Create a label node
const labelNode = new LabelNode('label1', 'label', {
  position: [500, 500],
  color: [0.0, 0.0, 0.0, 1.0],
  text: 'Hello World',
});

// Create an edge node
const edgeNode = new EdgeNode('edge1', 'edge', {
  source: widgetNode1,
  target: widgetNode2,
  color: [0.0, 0.0, 1.0, 1.0],
});

// Add the nodes to the scene
scene.addNode(widgetNode1);
scene.addNode(widgetNode2);
scene.addNode(buttonNode);
scene.addNode(sliderNode);
scene.addNode(labelNode);
scene.addNode(edgeNode);

// Register the rectangle node renderer
renderer.registerNodeRenderer('widget', new NodeRenderer());

// Register the edge node renderer
renderer.registerNodeRenderer('edge', new EdgeRenderer());

// Register the button node renderer
renderer.registerNodeRenderer('button', new ButtonNodeRenderer());

// Register the slider node renderer
renderer.registerNodeRenderer('slider', new SliderNodeRenderer());

// Register the label node renderer
renderer.registerNodeRenderer('label', new LabelNodeRenderer());

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

// Set the camera for the renderer
renderer.setCamera(camera);

// Add event listeners for user input
inputManager.addHandler('pan', (dx, dy) => {
  camera.pan(dx, dy);
});

inputManager.addHandler('zoom', (factor) => {
  camera.zoomIn(factor);
});
