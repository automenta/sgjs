var WidgetNode = require('./WidgetNode');
var TransformMatrix = require('../utils/TransformMatrix');

var ButtonNode = function(id, type, options) {
  WidgetNode.call(this, id, type, options);
  this.label = options.label || '';
  this.onClick = options.onClick || (() => {});
  this.strokeStyle = options.strokeStyle || [0, 0, 0, 1];
  this.lineWidth = options.lineWidth || 1;
};

ButtonNode.prototype = Object.create(WidgetNode.prototype);
ButtonNode.prototype.constructor = ButtonNode;

ButtonNode.prototype.update = function(dt) {
  WidgetNode.prototype.update.call(this, dt);
};

ButtonNode.prototype.draw = function(renderer) {
  const ctx = renderer.ctx;
  ctx.fillStyle = `rgba(${this.color.join(',')})`;
  ctx.strokeStyle = `rgba(${this.strokeStyle.join(',')})`;
  ctx.lineWidth = this.lineWidth;
  const transformMatrix = new TransformMatrix(this.transform);
  const [x, y] = transformMatrix.applyToPoint([0, 0]);
  const [width, height] = this.size;
  ctx.fillRect(x, y, width, height);
  ctx.strokeRect(x, y, width, height);
  ctx.font = '16px Arial';
  ctx.fillStyle = 'black';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(this.label, x + width / 2, y + height / 2);
};

ButtonNode.prototype.handleClick = function(x, y) {
  const transformMatrix = new TransformMatrix(this.transform);
  const [localX, localY] = transformMatrix.invert().applyToPoint([x, y]);
  if (localX >= 0 && localX <= this.size[0] && localY >= 0 && localY <= this.size[1]) {
    this.onClick();
  }
};

module.exports = ButtonNode;
