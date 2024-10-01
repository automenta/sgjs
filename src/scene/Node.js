class Node {
  constructor(id, type, options) {
    this.id = id;
    this.type = type;
    this.position = options.position || [0, 0];
    this.size = options.size || [100, 50];
    this.color = options.color || [0, 0, 0, 1];
    this.transform = options.transform || [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
    this.parent = null;
    this.children = [];
  }

  containsPoint(x, y) {
    const transformMatrix = new TransformMatrix(this.transform);
    const [localX, localY] = transformMatrix.invert().applyToPoint([x, y]);
    return (
      localX >= 0 && localX <= this.size[0] && localY >= 0 && localY <= this.size[1]
    );
  }

  update(dt) {
    this.transform = [
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      this.position[0], this.position[1], 0, 1,
    ];
    if (this.parent) {
      const parentTransform = new TransformMatrix(this.parent.transform);
      parentTransform.multiply(new TransformMatrix(this.transform));
      this.transform = parentTransform.toArray();
    }
  }

  draw(renderer) {
    // Placeholder for drawing logic
  }
}
