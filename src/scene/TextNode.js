import Node from './Node';
import TransformMatrix from '../utils/TransformMatrix';

class TextNode extends Node {
  constructor(id, type, options) {
    super(id, type, options);
    this.text = options.text || '';
    this.font = options.font || '16px Arial';
    this.color = options.color || [0, 0, 0, 1];
    this.textAlign = options.textAlign || 'left';
    this.textBaseline = options.textBaseline || 'alphabetic';
  }

  update(dt) {
    super.update(dt);
    // Update text properties if needed
  }

  draw(renderer) {
    const ctx = renderer.ctx;
    ctx.font = this.font;
    ctx.fillStyle = `rgba(${this.color.join(',')})`;
    ctx.textAlign = this.textAlign;
    ctx.textBaseline = this.textBaseline;
    const transformMatrix = new TransformMatrix(this.transform);
    const [x, y] = transformMatrix.applyToPoint([0, 0]);
    ctx.fillText(this.text, x, y);
  }
}

export default TextNode;
