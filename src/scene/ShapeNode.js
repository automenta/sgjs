import Node from './Node';
import TransformMatrix from '../utils/TransformMatrix';

class ShapeNode extends Node {
  constructor(id, type, options) {
    super(id, type, options);
    this.shape = options.shape || 'rect';
    this.color = options.color || [0, 0, 0, 1];
    this.lineWidth = options.lineWidth || 1;
    this.strokeStyle = options.strokeStyle || [0, 0, 0, 1];
  }

  update(dt) {
    super.update(dt);
    // Update shape properties if needed
  }

  draw(renderer) {
    const ctx = renderer.ctx;
    ctx.fillStyle = `rgba(${this.color.join(',')})`;
    ctx.strokeStyle = `rgba(${this.strokeStyle.join(',')})`;
    ctx.lineWidth = this.lineWidth;
    const transformMatrix = new TransformMatrix(this.transform);
    const [x, y] = transformMatrix.applyToPoint([0, 0]);
    const [width, height] = this.size;
    switch (this.shape) {
      case 'rect':
        ctx.fillRect(x, y, width, height);
        ctx.strokeRect(x, y, width, height);
        break;
      case 'circle':
        ctx.beginPath();
        ctx.arc(x + width / 2, y + height / 2, width / 2, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
        break;
      default:
        console.warn(`Unknown shape: ${this.shape}`);
    }
  }
}

export default ShapeNode;
