var Renderer = require('../rendering/Renderer');
var Camera = require('../camera/Camera');
var InputManager = require('../input/InputManager');
var Scene = require('../scene/Scene');
var WidgetNode = require('../scene/WidgetNode');
var NodeRenderer = require('../rendering/NodeRenderer');
var TextNode = require('../scene/TextNode');
var ShapeNode = require('../scene/ShapeNode');
var GroupNode = require('../scene/GroupNode');
var ButtonNode = require('../scene/ButtonNode');
var ButtonNodeRenderer = require('../rendering/ButtonNodeRenderer');
var SliderNode = require('../scene/SliderNode');
var SliderNodeRenderer = require('../rendering/SliderNodeRenderer');
var LabelNode = require('../scene/LabelNode');
var LabelNodeRenderer = require('../rendering/LabelNodeRenderer');
var EdgeNode = require('../scene/EdgeNode');
var EdgeRenderer = require('../rendering/EdgeRenderer');
var ContainerNode = require('../scene/ContainerNode');
var RectangleNodeRenderer = require('../rendering/RectangleNodeRenderer');
 
 // Create a new scene
 var scene = new Scene();
 
 // Create a new renderer
 var renderer = new Renderer(document.getElementById('canvas'));
 
 // Create a new camera
 var camera = new Camera();
 
 // Create a new input manager
 var inputManager = new InputManager(renderer.canvas);
 
 // Create a group node
 var groupNode = new GroupNode('group1', 'group', {
   position: [100, 100],
 });
 
 // Create a widget node
 var widgetNode1 = new WidgetNode('widget1', 'widget', {
   position: [0, 0],
   color: [1.0, 0.0, 0.0, 1.0],
   size: [50, 50],
 });
 
 // Create a text node
 var textNode = new TextNode('text1', 'text', {
   position: [75, 75],
   text: 'Hello, world!',
   font: '20px Arial',
   color: [0, 0, 0, 1],
 });
 
 // Create a shape node
 var shapeNode = new ShapeNode('shape1', 'shape', {
   position: [150, 150],
   shape: 'circle',
   color: [0.0, 1.0, 0.0, 1.0],
   size: [50, 50],
 });
 
 // Create a button node
 var buttonNode = new ButtonNode('button1', 'button', {
   position: [250, 250],
   size: [100, 50],
   color: [0.0, 0.0, 1.0, 1.0],
   label: 'Click Me',
   onClick: () => {
     console.log('Button clicked!');
   },
 });
 
 // Create a slider node
 var sliderNode = new SliderNode('slider1', 'slider', {
   position: [400, 400],
   color: [0.5, 0.5, 0.5, 1.0],
   value: 50,
   min: 0,
   max: 100,
 });
 
 // Create a label node
 var labelNode = new LabelNode('label1', 'label', {
   position: [500, 500],
   color: [0.0, 0.0, 0.0, 1.0],
   text: 'Hello World',
 });
 
 // Create an edge node
 var edgeNode = new EdgeNode('edge1', 'edge', {
   source: widgetNode1,
   target: widgetNode2,
   color: [0.0, 0.0, 0.0, 1.0],
 });
 
 // Add the nodes to the scene
 groupNode.addChild(widgetNode1);
 groupNode.addChild(textNode);
 groupNode.addChild(shapeNode);
 groupNode.addChild(buttonNode);
 groupNode.addChild(sliderNode);
 groupNode.addChild(labelNode);
 groupNode.addChild(edgeNode);
 scene.addNode(groupNode);
 
 // Register the node renderers
 renderer.registerNodeRenderer('widget', new NodeRenderer());
 renderer.registerNodeRenderer('text', new NodeRenderer());
 renderer.registerNodeRenderer('shape', new NodeRenderer());
 renderer.registerNodeRenderer('button', new ButtonNodeRenderer());
 renderer.registerNodeRenderer('slider', new SliderNodeRenderer());
 renderer.registerNodeRenderer('label', new LabelNodeRenderer());
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
 
 // Add event listeners for node editing
 inputManager.addHandler('click', (x, y) => {
   const node = scene.getNodeAtPoint(x, y);
   if (node) {
     console.log('Selected node:', node);
     // Show the node editing UI
     const nodeEditorUI = document.getElementById('node-editor-ui');
     nodeEditorUI.style.display = 'block';
     // Update the UI with the node's properties
     document.getElementById('node-id').textContent = node.id;
     document.getElementById('node-type').textContent = node.type;
     document.getElementById('node-position-x').value = node.position[0];
     document.getElementById('node-position-y').value = node.position[1];
     document.getElementById('node-size-width').value = node.size[0];
     document.getElementById('node-size-height').value = node.size[1];
     document.getElementById('node-color').value = node.color;
     // Add event listeners to the UI elements to update the node's properties
     document.getElementById('node-position-x').addEventListener('change', (event) => {
       node.position[0] = parseFloat(event.target.value);
     });
     document.getElementById('node-position-y').addEventListener('change', (event) => {
       node.position[1] = parseFloat(event.target.value);
     });
     document.getElementById('node-size-width').addEventListener('change', (event) => {
       node.size[0] = parseFloat(event.target.value);
     });
     document.getElementById('node-size-height').addEventListener('change', (event) => {
       node.size[1] = parseFloat(event.target.value);
     });
     document.getElementById('node-color').addEventListener('change', (event) => {
       node.color = event.target.value;
     });
   }
 });
