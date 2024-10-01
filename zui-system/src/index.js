import Renderer from './rendering/Renderer';
import Camera from './camera/Camera';
import InputManager from './input/InputManager';
import Scene from './scene/Scene';

// Create a new scene
const scene = new Scene();

// Create a new renderer
const renderer = new Renderer();

// Create a new camera
const camera = new Camera();

// Create a new input manager
const inputManager = new InputManager(renderer.canvas);

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
