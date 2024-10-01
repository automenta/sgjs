import Renderer from './rendering/Renderer';
import Camera from './camera/Camera';
import InputManager from './input/InputManager';
import Scene from './scene/Scene';
import Node from './scene/Node';
import WidgetNode from './scene/WidgetNode';
import RectangleNodeRenderer from './rendering/RectangleNodeRenderer';

// Create a new scene
const scene = new Scene();

// Create a new renderer
const renderer = new Renderer(document.getElementById('canvas'));

// Create a new camera
const camera = new Camera();

// Create a new input manager
const inputManager = new InputManager(renderer.canvas);

// Create a node
const node1 = new Node('node1', 'node', {
  position: [0, 0],
});

// Create a widget node
const widgetNode = new WidgetNode('widget1', 'widget', {
  position: [100, 100],
  color: '#ff0000',
  size: [50, 50],
});

// Add the nodes to the scene
scene.addNode(node1);
scene.addNode(widgetNode);

// Register the rectangle node renderer
renderer.registerNodeRenderer('widget', new RectangleNodeRenderer());

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

// ... (add other event listeners for different interaction modes)
