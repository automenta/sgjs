class Scene {
  constructor() {
    this.nodes = [];
  }

  addNode(node) {
    this.nodes.push(node);
  }

  removeNode(node) {
    const index = this.nodes.indexOf(node);
    if (index !== -1) {
      this.nodes.splice(index, 1);
    }
  }

  // Method to find a node by its ID
  findNode(id) {
    return this.nodes.find(node => node.id === id);
  }
}

export default Scene;
