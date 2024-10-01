import Node from './Node';
import VertexData from '../utils/VertexData';

class ButtonNode extends Node {
  constructor(id, type, props) {
    super(id, type, props);
    this.label = props.label || 'Button';
    this.color = props.color || '#000000';
    this.size = props.size || [100, 50];
    this.vertexData = VertexData.createRectangle(this.size[0], this.size[1], this.color);
  }

  // Methods for setting and getting label, color, and size
  setLabel(label) {
    this.label = label;
  }

  getLabel() {
    return this.label;
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

  // Methods for rendering the button node
  render(renderer) {
    // Render the button node based on its label, color, and size
    renderer.renderNode(this);
  }
}

export default ButtonNode;
