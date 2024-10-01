class Node {
  constructor(id, type, props) {
    this.id = id;
    this.type = type;
    this.props = props || {};
    this.parent = null;
    this.children = [];
    this.transform = new TransformMatrix();
  }

  addChild(child) {
    this.children.push(child);
    child.parent = this;
  }

  removeChild(child) {
    const index = this.children.indexOf(child);
    if (index !== -1) {
      this.children.splice(index, 1);
      child.parent = null;
    }
  }

  // Getters and setters for position, rotation, scale, etc.
  get position() {
    return this.transform.position;
  }

  set position(value) {
    this.transform.position = value;
  }

  // ... other getters and setters

  // Methods for updating the node's transform matrix
  updateTransform() {
    // Update the transform matrix based on the node's position, rotation, scale, etc.
  }

  // Methods for rendering the node
  render(renderer) {
    // Render the node using the provided renderer
  }
}

export default Node;
