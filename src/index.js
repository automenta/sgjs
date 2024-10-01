import Renderer from './rendering/Renderer';
import Camera from './camera/Camera';
import InputManager from './input/InputManager';
import Scene from './scene/Scene';
import WidgetNode from './scene/WidgetNode';
import NodeRenderer from './rendering/NodeRenderer';
import EdgeNode from './scene/EdgeNode';
import EdgeRenderer from './rendering/EdgeRenderer';

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

// Create an edge node
const edgeNode = new EdgeNode('edge1', 'edge', {
  source: widgetNode1,
  target: widgetNode2,
  color: [0.0, 0.0, 1.0, 1.0],
});

// Add the nodes to the scene
scene.addNode(widgetNode1);
scene.addNode(widgetNode2);
scene.addNode(edgeNode);

// Register the rectangle node renderer
renderer.registerNodeRenderer('widget', new NodeRenderer());

// Register the edge node renderer
renderer.registerNodeRenderer('edge', new EdgeRenderer());

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
