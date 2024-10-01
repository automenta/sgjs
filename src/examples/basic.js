import NodeEditor from './NodeEditor';

// Create a new node editor
const nodeEditor = new NodeEditor(document.getElementById('canvas'));

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

// Add the nodes to the scene
groupNode.addChild(widgetNode1);
groupNode.addChild(textNode);
groupNode.addChild(shapeNode);
nodeEditor.addNode(groupNode);
