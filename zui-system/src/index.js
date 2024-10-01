import Renderer from './rendering/Renderer';
import Camera from './camera/Camera';
import InputManager from './input/InputManager';
import Scene from './scene/Scene';
import Node from './scene/Node';

// Create a new scene
const scene = new Scene();

// Create a new renderer
const renderer = new Renderer();

// Create a new camera
const camera = new Camera();

// Create a new input manager
const inputManager = new InputManager(renderer.canvas);

// Create a node
const node = new Node('node1', 'node', {
  position: [0, 0],
});

// Add the node to the scene
scene.addNode(node);

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

inputManager.addHandler('zoom', (factor) => {
  camera.zoomIn(factor);
});

// ... (add other event listeners for different interaction modes)
