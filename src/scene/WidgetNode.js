import Node from './Node';

class WidgetNode extends Node {
  constructor(id, type, props) {
    super(id, type, props);
    this.shape = props.shape || 'rect'; // Default shape is rectangle
    this.color = props.color || '#000000'; // Default color is black
    this.size = props.size || [100, 50]; // Default size is 100x50
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
  }

  getColor() {
    return this.color;
  }

  setSize(width, height) {
    this.size = [width, height];
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
