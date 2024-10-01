import Node from './Node';
import VertexData from '../utils/VertexData';

class WidgetNode extends Node {
  constructor(id, type, props) {
    super(id, type, props);
    this.shape = props.shape || 'rect'; // Default shape is rectangle
    this.color = props.color || '#000000'; // Default color is black
    this.size = props.size || [100, 50]; // Default size is 100x50
    this.vertexData = VertexData.createRectangle(this.size[0], this.size[1], this.color);
  }

  // Methods for setting and getting shape, color, and size
  setShape(shape) {
    this.shape = shape;
  }

  getShape() {
    return this.shape;
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

  // Methods for rendering the widget node
  render(renderer) {
    // Render the widget node based on its shape, color, and size
    renderer.renderNode(this);
  }
}

export default WidgetNode;
