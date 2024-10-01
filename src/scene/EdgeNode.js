var Node = require('./Node');
var VertexData = require('../utils/VertexData');

var EdgeNode = function(id, type, props) {
  Node.call(this, id, type, props);
  this.source = props.source;
  this.target = props.target;
  this.color = props.color || '#000000';
  this.updateVertexData();
};

EdgeNode.prototype = Object.create(Node.prototype);
EdgeNode.prototype.constructor = EdgeNode;

EdgeNode.prototype.updateVertexData = function() {
  this.vertexData = VertexData.createLine(
    [this.source.position[0], this.source.position[1]],
    [this.target.position[0], this.target.position[1]],
    this.color,
  );
};

EdgeNode.prototype.setSource = function(source) {
  this.source = source;
  this.updateVertexData();
};

EdgeNode.prototype.setTarget = function(target) {
  this.target = target;
  this.updateVertexData();
};

EdgeNode.prototype.setColor = function(color) {
  this.color = color;
  this.updateVertexData();
};

EdgeNode.prototype.render = function(renderer) {
  renderer.renderNode(this);
};

module.exports = EdgeNode;
