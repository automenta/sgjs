class InputManager {
  constructor(canvas) {
    this.canvas = canvas;
    this.handlers = {}; // Store input handlers
    this.currentMode = 'pan'; // Default interaction mode is panning
    this.isDragging = false;
    this.lastMousePosition = [0, 0];
    this.selectedNode = null;

    // Add event listeners for mouse and touch events
    this.canvas.addEventListener('mousedown', this.handleMouseDown.bind(this));
    this.canvas.addEventListener('mousemove', this.handleMouseMove.bind(this));
    this.canvas.addEventListener('mouseup', this.handleMouseUp.bind(this));
    this.canvas.addEventListener('wheel', this.handleWheel.bind(this));
    this.canvas.addEventListener('touchstart', this.handleTouchStart.bind(this));
    this.canvas.addEventListener('touchmove', this.handleTouchMove.bind(this));
    this.canvas.addEventListener('touchend', this.handleTouchEnd.bind(this));
  }

  // Method for adding an input handler
  addHandler(mode, handler) {
    this.handlers[mode] = handler;
  }

  // Method for setting the current interaction mode
  setMode(mode) {
    this.currentMode = mode;
  }

  // Event handlers for mouse and touch events
  handleMouseDown(event) {
    this.isDragging = true;
    this.lastMousePosition = [event.clientX, event.clientY];

    // Check if a node is clicked
    const clickedNode = this.getNodeAtPoint(event.clientX, event.clientY);
    if (clickedNode) {
      this.selectedNode = clickedNode;
      this.currentMode = 'drag'; // Switch to drag mode if a node is selected
    }
  }

  handleMouseMove(event) {
    if (this.isDragging) {
      const dx = event.clientX - this.lastMousePosition[0];
      const dy = event.clientY - this.lastMousePosition[1];

      if (this.currentMode === 'pan') {
        this.handlers[this.currentMode](dx, dy);
      } else if (this.currentMode === 'drag') {
        this.selectedNode.position = [
          this.selectedNode.position[0] + dx,
          this.selectedNode.position[1] + dy,
        ];
      }

      this.lastMousePosition = [event.clientX, event.clientY];
    }
  }

  handleMouseUp(event) {
    this.isDragging = false;
    this.selectedNode = null;
    this.currentMode = 'pan'; // Switch back to pan mode
  }

  handleWheel(event) {
    const factor = event.deltaY > 0 ? 1.1 : 0.9;
    this.handlers[this.currentMode](factor);
  }

  handleTouchStart(event) {
    // ... (handle touch start event)
  }

  handleTouchMove(event) {
    // ... (handle touch move event)
  }

  handleTouchEnd(event) {
    // ... (handle touch end event)
  }

  // Method for getting the node at a given point
  getNodeAtPoint(x, y) {
    // ... (implement logic to find the node at the given point)
  }
}

export default InputManager;
