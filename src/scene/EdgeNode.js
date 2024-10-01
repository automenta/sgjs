import Node from './Node';
import VertexData from '../utils/VertexData';

class EdgeNode extends Node {
  constructor(id, type, props) {
    super(id, type, props);
    this.source = props.source; // Reference to the source node
    this.target = props.target; // Reference to the target node
    this.color = props.color || '#000000';
    this.vertexData = VertexData.createLine(
      [this.source.position[0], this.source.position[1]],
      [this.target.position[0], this.target.position[1]],
      this.color,
    );
  }

  // Methods for setting and getting source, target, and color
  setSource(source) {
    this.source = source;
    this.vertexData = VertexData.createLine(
      [this.source.position[0], this.source.position[1]],
      [this.target.position[0], this.target.position[1]],
      this.color,
    );
  }

  getSource() {
    return this.source;
  }

  setTarget(target) {
    this.target = target;
    this.vertexData = VertexData.createLine(
      [this.source.position[0], this.source.position[1]],
      [this.target.position[0], this.target.position[1]],
      this.color,
    );
  }

  getTarget() {
    return this.target;
  }

  setColor(color) {
    this.color = color;
    this.vertexData = VertexData.createLine(
      [this.source.position[0], this.source.position[1]],
      [this.target.position[0], this.target.position[1]],
      this.color,
    );
  }

  getColor() {
    return this.color;
  }

  // Methods for rendering the edge node
  render(renderer) {
    // Render the edge node based on its source, target, and color
    renderer.renderNode(this);
  }
}

export default EdgeNode;
