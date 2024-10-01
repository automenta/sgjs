var Node = require('./Node');
var TransformMatrix = require('../utils/TransformMatrix');

var GroupNode = function(id, type, options) {
  Node.call(this, id, type, options);
  this.children = [];
};

GroupNode.prototype = Object.create(Node.prototype);
GroupNode.prototype.constructor = GroupNode;

GroupNode.prototype.addChild = function(child) {
  this.children.push(child);
  child.parent = this;
};

GroupNode.prototype.removeChild = function(child) {
  const index = this.children.indexOf(child);
  if (index !== -1) {
    this.children.splice(index, 1);
    child.parent = null;
  }
};

GroupNode.prototype.update = function(dt) {
  Node.prototype.update.call(this, dt);
  this.children.forEach((child) => child.update(dt));
};

GroupNode.prototype.draw = function(renderer) {
  const transformMatrix = new TransformMatrix(this.transform);
  this.children.forEach((child) => {
    const childTransform = new TransformMatrix(child.transform);
    childTransform.multiply(transformMatrix);
    child.transform = childTransform.toArray();
    child.draw(renderer);
  });
};

module.exports = GroupNode;
