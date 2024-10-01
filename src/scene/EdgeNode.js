import Node from './Node';

class EdgeNode extends Node {
  constructor(id, type, props) {
    super(id, type, props);
    this.source = props.source; // Reference to the source node
    this.target = props.target; // Reference to the target node
    this.color = props.color || '#000000'; // Default color is black
    this.lineWidth = props.lineWidth || 2; // Default line width is 2
  }

  // Methods for setting and getting source, target, color, and lineWidth
  setSource(source) {
    this.source = source;
  }

  getSource() {
    return this.source;
  }

  setTarget(target) {
    this.target = target;
  }

  getTarget() {
    return this.target;
  }

  setColor(color) {
    this.color = color;
  }

  getColor() {
    return this.color;
  }

  setLineWidth(width) {
    this.lineWidth = width;
  }

  getLineWidth() {
    return this.lineWidth;
  }

  // Methods for rendering the edge node
  render(renderer) {
    // Render the edge node as a line connecting the source and target nodes
    renderer.renderNode(this);
  }
}

export default EdgeNode;
