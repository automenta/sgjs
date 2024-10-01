import Node from './Node';

class ContainerNode extends Node {
  constructor(id, type, props) {
    super(id, type, props);
    this.layout = null;
  }

  addChild(child) {
    super.addChild(child);
    if (this.layout) {
      this.layout.applyLayout(this);
    }
  }

  removeChild(child) {
    super.removeChild(child);
    if (this.layout) {
      this.layout.applyLayout(this);
    }
  }

  setLayout(layout) {
    this.layout = layout;
    this.layout.applyLayout(this);
  }

  // Methods for rendering the container node
  render(renderer) {
    renderer.renderNode(this);
  }
}

export default ContainerNode;
