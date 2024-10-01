var Node = require('./Node');
var VertexData = require('../utils/VertexData');

var WidgetNode = function(id, type, props) {
  Node.call(this, id, type, props);
  this.shape = props.shape || 'rect'; // Default shape is rectangle
  this.color = props.color || '#000000'; // Default color is black
  this.size = props.size || [100, 50]; // Default size is 100x50
  this.vertexData = VertexData.createRectangle(this.size[0], this.size[1], this.color);
};

WidgetNode.prototype = Object.create(Node.prototype);
WidgetNode.prototype.constructor = WidgetNode;

// Methods for setting and getting shape, color, and size
WidgetNode.prototype.setShape = function(shape) {
  this.shape = shape;
};

WidgetNode.prototype.getShape = function() {
  return this.shape;
};

WidgetNode.prototype.setColor = function(color) {
  this.color = color;
  this.vertexData = VertexData.createRectangle(this.size[0], this.size[1], this.color);
};

WidgetNode.prototype.getColor = function() {
  return this.color;
};

WidgetNode.prototype.setSize = function(width, height) {
  this.size = [width, height];
  this.vertexData = VertexData.createRectangle(this.size[0], this.size[1], this.color);
};

WidgetNode.prototype.getSize = function() {
  return this.size;
};

// Methods for rendering the widget node
WidgetNode.prototype.render = function(renderer) {
  // Render the widget node based on its shape, color, and size
  renderer.renderNode(this);
};

module.exports = WidgetNode;
