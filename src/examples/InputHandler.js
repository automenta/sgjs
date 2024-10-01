var InputHandler = function(canvas) {
  this.canvas = canvas;
  this.handlers = {};
};

InputHandler.prototype.addHandler = function(mode, handler) {
  this.handlers[mode] = handler;
};

InputHandler.prototype.handleEvent = function(event) {
  const handler = this.handlers[event.type];
  if (handler) {
    handler(event.x, event.y, event.deltaY);
  }
};

module.exports = InputHandler;
