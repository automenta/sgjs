const canvas = document.getElementById('canvas');
const renderer = new Renderer(canvas);
const camera = new Camera();
const scene = new Scene();

// Create a widget node
const widgetNode1 = new Node('widget1', 'widget', {
  position: [100, 100],
  color: [1.0, 0.0, 0.0, 1.0],
  size: [50, 50],
});

// Create another widget node
const widgetNode2 = new Node('widget2', 'widget', {
  position: [200, 200],
  color: [0.0, 1.0, 0.0, 1.0],
  size: [75, 75],
});

// Add the nodes to the scene
scene.addNode(widgetNode1);
scene.addNode(widgetNode2);

// Register the rectangle node renderer
renderer.registerNodeRenderer('widget', new NodeRenderer());

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
canvas.addEventListener('mousemove', (event) => {
  camera.pan(event.movementX, event.movementY);
});

canvas.addEventListener('wheel', (event) => {
  const factor = event.deltaY > 0 ? 1.1 : 0.9;
  camera.zoomIn(factor);
});
