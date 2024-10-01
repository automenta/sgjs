// ... other code ...

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

// Add the button to the scene
groupNode.addChild(buttonNode);

// ... other code ...
