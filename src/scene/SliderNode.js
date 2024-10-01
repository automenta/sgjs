import Node from './Node';
import VertexData from '../utils/VertexData';

class SliderNode extends Node {
  constructor(id, type, props) {
    super(id, type, props);
    this.value = props.value || 0;
    this.min = props.min || 0;
    this.max = props.max || 100;
    this.color = props.color || '#000000';
    this.size = props.size || [100, 20];
    this.vertexData = VertexData.createRectangle(this.size[0], this.size[1], this.color);
  }

  // Methods for setting and getting value, min, max, color, and size
  setValue(value) {
    this.value = value;
  }

  getValue() {
    return this.value;
  }

  setMin(min) {
    this.min = min;
  }

  getMin() {
    return this.min;
  }

  setMax(max) {
    this.max = max;
  }

  getMax() {
    return this.max;
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

  // Methods for rendering the slider node
  render(renderer) {
    // Render the slider node based on its value, min, max, color, and size
    renderer.renderNode(this);
  }
}

export default SliderNode;
