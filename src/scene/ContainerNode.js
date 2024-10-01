import Node from './Node';

class ContainerNode extends Node {
  constructor(id, type, props) {
    super(id, type, props);
    this.layout = null; // Optional layout manager
  }

  // Methods for adding and removing child nodes
  addChild(child) {
    super.addChild(child);
    // Apply layout if a layout manager is set
    if (this.layout) {
      this.layout.applyLayout(this);
    }
  }

  removeChild(child) {
    super.removeChild(child);
    // Apply layout if a layout manager is set
    if (this.layout) {
      this.layout.applyLayout(this);
    }
  }

  // Methods for setting and applying a layout manager
  setLayout(layout) {
    this.layout = layout;
    this.layout.applyLayout(this);
  }

  // Methods for rendering the container node
  render(renderer) {
    // Render the container node and its children
    renderer.renderNode(this);
    this.children.forEach((child) => child.render(renderer));
  }
}

export default ContainerNode;
