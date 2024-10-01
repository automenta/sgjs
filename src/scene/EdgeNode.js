import Node from './Node';
import VertexData from '../utils/VertexData';

class EdgeNode extends Node {
  constructor(id, type, props) {
    super(id, type, props);
    this.source = props.source;
    this.target = props.target;
    this.color = props.color || '#000000';
    this.updateVertexData();
  }

  updateVertexData() {
    this.vertexData = VertexData.createLine(
      [this.source.position[0], this.source.position[1]],
      [this.target.position[0], this.target.position[1]],
      this.color,
    );
  }

  setSource(source) {
    this.source = source;
    this.updateVertexData();
  }

  setTarget(target) {
    this.target = target;
    this.updateVertexData();
  }

  setColor(color) {
    this.color = color;
    this.updateVertexData();
  }

  render(renderer) {
    renderer.renderNode(this);
  }
}

export default EdgeNode;
