class InputHandler {
  constructor(canvas) {
    this.canvas = canvas;
    this.handlers = {};
  }

  addHandler(type, handler) {
    this.handlers[type] = handler;
  }

  handleEvent(event) {
    const { type, x, y, deltaY } = event;
    if (this.handlers[type]) {
      switch (type) {
        case 'pan':
          this.handlers[type](x, y);
          break;
        case 'zoom':
          this.handlers[type](deltaY);
          break;
        case 'click':
          this.handlers[type](x, y);
          break;
        default:
          console.warn(`Unknown event type: ${type}`);
      }
    }
  }
}

export default InputHandler;
