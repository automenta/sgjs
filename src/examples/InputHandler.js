class InputHandler {
  constructor(canvas) {
    this.canvas = canvas;
    this.handlers = {};
  }

  addHandler(mode, handler) {
    this.handlers[mode] = handler;
  }

  handleEvent(event) {
    const handler = this.handlers[event.type];
    if (handler) {
      handler(event.x, event.y, event.deltaY);
    }
  }
}

export default InputHandler;
