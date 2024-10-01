import Node from './Node';

class Scene {
  constructor() {
    this.nodes = [];
  }

  addNode(node) {
    this.nodes.push(node);
  }

  getNodeAtPoint(x, y) { // Find the node at a given point (for selection)
    return this.nodes.find(node => node.containsPoint(x, y));
  }
}

export default Scene;
