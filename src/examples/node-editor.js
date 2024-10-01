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

// Create a new scene
const scene = new Scene();

// Create a new renderer
const renderer = new Renderer(document.getElementById('canvas'));

// Create a new camera
const camera = new Camera();

// Create a new input manager
const inputManager = new InputManager(renderer.canvas);

// Create a group node
const groupNode = new GroupNode('group1', 'group', {
  position: [100, 100],
});

// Create a widget node
const widgetNode1 = new WidgetNode('widget1', 'widget', {
  position: [0, 0],
  color: [1.0, 0.0, 0.0, 1.0],
  size: [50, 50],
});

// Create a text node
const textNode = new TextNode('text1', 'text', {
  position: [75, 75],
  text: 'Hello, world!',
  font: '20px Arial',
  color: [0, 0, 0, 1],
});

// Create a shape node
const shapeNode = new ShapeNode('shape1', 'shape', {
  position: [150, 150],
  shape: 'circle',
  color: [0.0, 1.0, 0.0, 1.0],
  size: [50, 50],
});

// Create a button node
const buttonNode = new ButtonNode('button1', 'button', {
  position: [250, 250],
  size: [100, 50],
  color: [0.0, 0.0, 1.0, 1.0],
  label: 'Click Me',
  onClick: () => {
    console.log('Button clicked!');
  },
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

// Add the nodes to the scene
groupNode.addChild(widgetNode1);
groupNode.addChild(textNode);
groupNode.addChild(shapeNode);
groupNode.addChild(buttonNode);
groupNode.addChild(sliderNode);
groupNode.addChild(labelNode);
scene.addNode(groupNode);

// Register the node renderers
renderer.registerNodeRenderer('widget', new NodeRenderer());
renderer.registerNodeRenderer('text', new NodeRenderer());
renderer.registerNodeRenderer('shape', new NodeRenderer());
renderer.registerNodeRenderer('button', new ButtonNodeRenderer());
renderer.registerNodeRenderer('slider', new SliderNodeRenderer());
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

// Add event listeners for node editing
inputManager.addHandler('click', (x, y) => {
  const node = scene.getNodeAtPoint(x, y);
  if (node) {
    console.log('Selected node:', node);
    // TODO: Implement node editing UI
  }
});
