import Node from './Node';
import TransformMatrix from '../utils/TransformMatrix';

class GroupNode extends Node {
  constructor(id, type, options) {
    super(id, type, options);
    this.children = [];
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

  update(dt) {
    super.update(dt);
    this.children.forEach((child) => child.update(dt));
  }

  draw(renderer) {
    const transformMatrix = new TransformMatrix(this.transform);
    this.children.forEach((child) => {
      const childTransform = new TransformMatrix(child.transform);
      childTransform.multiply(transformMatrix);
      child.transform = childTransform.toArray();
      child.draw(renderer);
    });
  }
}

export default GroupNode;
