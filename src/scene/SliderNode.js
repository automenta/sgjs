var Node = require('./Node');
var VertexData = require('../utils/VertexData');

var SliderNode = function(id, type, props) {
  Node.call(this, id, type, props);
  this.value = props.value || 0;
  this.min = props.min || 0;
  this.max = props.max || 100;
  this.color = props.color || '#000000';
  this.size = props.size || [100, 20];
  this.vertexData = VertexData.createRectangle(this.size[0], this.size[1], this.color);
};

SliderNode.prototype = Object.create(Node.prototype);
SliderNode.prototype.constructor = SliderNode;

// Methods for setting and getting value, min, max, color, and size
SliderNode.prototype.setValue = function(value) {
  this.value = value;
};

SliderNode.prototype.getValue = function() {
  return this.value;
};

SliderNode.prototype.setMin = function(min) {
  this.min = min;
};

SliderNode.prototype.getMin = function() {
  return this.min;
};

SliderNode.prototype.setMax = function(max) {
  this.max = max;
};

SliderNode.prototype.getMax = function() {
  return this.max;
};

SliderNode.prototype.setColor = function(color) {
  this.color = color;
  this.vertexData = VertexData.createRectangle(this.size[0], this.size[1], this.color);
};

SliderNode.prototype.getColor = function() {
  return this.color;
};

SliderNode.prototype.setSize = function(width, height) {
  this.size = [width, height];
  this.vertexData = VertexData.createRectangle(this.size[0], this.size[1], this.color);
};

SliderNode.prototype.getSize = function() {
  return this.size;
};

// Methods for rendering the slider node
SliderNode.prototype.render = function(renderer) {
  // Render the slider node based on its value, min, max, color, and size
  renderer.renderNode(this);
};

module.exports = SliderNode;
