import TransformMatrix from '../utils/TransformMatrix';

class Node {
  constructor(id, type, props) {
    this.id = id;
    this.type = type;
    this.props = props || {};
    this.position = props.position || [0, 0];
    this.rotation = props.rotation || 0;
    this.scale = props.scale || [1, 1];
    this.parent = null;
    this.children = [];
    this.transformMatrix = new TransformMatrix();
    this.vertexData = null;
    this.boundingBox = null;
  }

  // Method for adding a child node
  addChild(child) {
    child.parent = this;
    this.children.push(child);
  }

  // Method for removing a child node
  removeChild(child) {
    const index = this.children.indexOf(child);
    if (index !== -1) {
      this.children.splice(index, 1);
      child.parent = null;
    }
  }

  // Method for getting the node's bounding box
  getBoundingBox() {
    if (!this.boundingBox) {
      this.boundingBox = this.calculateBoundingBox();
    }
    return this.boundingBox;
  }

  // Method for calculating the node's bounding box
  calculateBoundingBox() {
    // Implement bounding box calculation logic based on node type and vertex data
    // For example, for a rectangle node:
    // return [
    //   [this.position[0] - this.size[0] / 2, this.position[1] - this.size[1] / 2],
    //   [this.position[0] + this.size[0] / 2, this.position[1] - this.size[1] / 2],
    //   [this.position[0] + this.size[0] / 2, this.position[1] + this.size[1] / 2],
    //   [this.position[0] - this.size[0] / 2, this.position[1] + this.size[1] / 2],
    // ];
    return [
      [this.position[0] - this.size[0] / 2, this.position[1] - this.size[1] / 2],
      [this.position[0] + this.size[0] / 2, this.position[1] - this.size[1] / 2],
      [this.position[0] + this.size[0] / 2, this.position[1] + this.size[1] / 2],
      [this.position[0] - this.size[0] / 2, this.position[1] + this.size[1] / 2],
    ];
  }

  // Method for updating the node's transform matrix
  updateTransformMatrix() {
    this.transformMatrix.setPosition(this.position[0], this.position[1]);
    this.transformMatrix.setRotation(this.rotation);
    this.transformMatrix.setScale(this.scale[0], this.scale[1]);
  }

  // Method for rendering the node
  render(renderer) {
    // Render the node based on its type and vertex data
    // For example, for a rectangle node:
    // renderer.renderRectangle(this.vertexData, this.transformMatrix);
  }
}

export default Node;
