import WidgetNode from './WidgetNode';
import TransformMatrix from '../utils/TransformMatrix';

class ButtonNode extends WidgetNode {
  constructor(id, type, options) {
    super(id, type, options);
    this.label = options.label || '';
    this.onClick = options.onClick || (() => {});
  }

  update(dt) {
    super.update(dt);
    // Update button properties if needed
  }

  draw(renderer) {
    const ctx = renderer.ctx;
    ctx.fillStyle = `rgba(${this.color.join(',')})`;
    ctx.strokeStyle = `rgba(${this.strokeStyle.join(',')})`;
    ctx.lineWidth = this.lineWidth;
    const transformMatrix = new TransformMatrix(this.transform);
    const [x, y] = transformMatrix.applyToPoint([0, 0]);
    const [width, height] = this.size;
    ctx.fillRect(x, y, width, height);
    ctx.strokeRect(x, y, width, height);
    ctx.font = '16px Arial';
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(this.label, x + width / 2, y + height / 2);
  }

  handleClick(x, y) {
    const transformMatrix = new TransformMatrix(this.transform);
    const [localX, localY] = transformMatrix.invert().applyToPoint([x, y]);
    if (
      localX >= 0 &&
      localX <= this.size[0] &&
      localY >= 0 &&
      localY <= this.size[1]
    ) {
      this.onClick();
    }
  }
}

export default ButtonNode;
