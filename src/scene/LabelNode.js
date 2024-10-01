import Node from './Node';
import VertexData from '../utils/VertexData';

class LabelNode extends Node {
  constructor(id, type, props) {
    super(id, type, props);
    this.text = props.text || 'Label';
    this.color = props.color || '#000000';
    this.size = props.size || [100, 50];
    this.vertexData = VertexData.createRectangle(this.size[0], this.size[1], this.color);
  }

  // Methods for setting and getting text, color, and size
  setText(text) {
    this.text = text;
  }

  getText() {
    return this.text;
  }

  setColor(color) {
    this.color = color;
    this.vertexData = VertexData.createRectangle(this.size[0], this.size[1], this.color);
  }

  getColor() {
    return this.color;
  }

  setSize(width, height) {
    this.size = [width, height];
    this.vertexData = VertexData.createRectangle(this.size[0], this.size[1], this.color);
  }

  getSize() {
    return this.size;
  }

  // Methods for rendering the label node
  render(renderer) {
    // Render the label node based on its text, color, and size
    renderer.renderNode(this);
  }
}

export default LabelNode;
